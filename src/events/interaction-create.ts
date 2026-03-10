import {
  ChannelType,
  EmbedBuilder,
  Events,
  MessageFlags,
  WebhookClient,
  Interaction,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder,
  PermissionsBitField,
} from 'discord.js';
import { client, commands } from '@/index.js';
import { getCommandAckPlan, ensureDeferredReply, replyOrFollowUp } from '@bot/shared';

import { failedReply } from '@/utilities/index.js';
import Logger from '@/utilities/core/logger.js';
import { getVideoPaths } from '@/utilities/ba/video.js';
import { getTWStudentsData } from '@/utilities/ba/index.js';
import { handleStudentActionMenu } from '@/commands/slash/ba/student.js';
import {
  GachaSimulator,
  drawPullResultImage,
  getDefaultPUCharacter,
  getUserRecruitmentPoints,
  updateUserRecruitmentPoints,
  resetUserRecruitmentPoints,
  manualResetUserRecruitmentPoints,
} from '@/commands/slash/ba/pull.js';
import emoji from '@/emoji.js';

const webhook = process.env.CMD_WEBHOOK ? new WebhookClient({ url: process.env.CMD_WEBHOOK }) : null;

// 權限檢查函數
async function checkBotPermissions(interaction: Interaction): Promise<boolean> {
  if (!interaction.guild || !interaction.channel || interaction.channel.type === ChannelType.DM) return false;

  const botMember = interaction.guild.members.cache.get(client.user!.id);
  if (!botMember) return false;

  const requiredPermissions = [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel];

  try {
    const hasPermissions = botMember.permissionsIn(interaction.channel as any).has(requiredPermissions);

    if (!hasPermissions) {
      try {
        await replyOrFollowUp(interaction, {
          content: '❌ 彩奈需要以下權限才能正常運作：\n• 查看頻道\n• 發送訊息\n\n請聯繫伺服器管理員開啟這些權限',
          flags: MessageFlags.Ephemeral,
        });
      } catch (error) {
        new Logger('權限').error(`無法發送權限不足訊息：${error}`);
      }
    }

    return hasPermissions;
  } catch (error) {
    // 如果權限檢查失敗，記錄錯誤並返回 false
    new Logger('權限').error(`權限檢查失敗：${error}`);
    return false;
  }
}

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  const interactionUser = interaction.user;
  const interactionGuild = interaction.guild;
  const interactionChannel = interaction.channel;

  if (interactionChannel?.type == ChannelType.DM) return;

  if (interaction.isButton()) {
    await interaction.deferUpdate().catch(() => {});

    // 處理"再來一次"按鈕
    if (interaction.customId.startsWith('pull_again_')) {
      try {
        // 檢查權限
        if (!(await checkBotPermissions(interaction))) {
          return;
        }

        // 從customId中獲取角色ID
        const targetStudentId = interaction.customId.replace('pull_again_', '');

        // 重新執行抽卡邏輯
        const studentsData = await getTWStudentsData();

        // 如果沒有指定目標角色，使用當前PU角色
        let finalTargetStudentId = targetStudentId;
        if (!finalTargetStudentId) {
          const puCharacter = await getDefaultPUCharacter('Jp');
          if (puCharacter) {
            finalTargetStudentId = puCharacter.id;
          }
        }

        if (!finalTargetStudentId || !studentsData[finalTargetStudentId]) {
          return interaction.followUp({
            content: '無法找到目標角色，請老師重新執行抽卡指令',
            flags: MessageFlags.Ephemeral,
          });
        }

        // 檢查是否更換了目標角色，如果是則重置招募點數
        const userId = interaction.user.id;
        const previousTarget = getUserRecruitmentPoints(userId, finalTargetStudentId);

        // 如果之前沒有對這個目標的記錄，或者這是新的目標，則重置點數
        if (previousTarget.points === 0) {
          resetUserRecruitmentPoints(userId, finalTargetStudentId);
        }

        // 創建抽卡模擬器並執行抽卡
        const gachaSimulator = new GachaSimulator(studentsData, finalTargetStudentId);
        const pullResult = gachaSimulator.pull10();

        // 獲取抽卡前的已獲得角色列表
        const previousPoints = getUserRecruitmentPoints(userId, finalTargetStudentId);

        // 更新招募點數
        const updatedPoints = updateUserRecruitmentPoints(userId, finalTargetStudentId, 10, pullResult.results);

        // 獲取影片路徑
        const videoPaths = getVideoPaths();

        // 根據是否抽到三星選擇動畫
        const hasThreeStar = pullResult.hasThreeStar;
        const animationType = hasThreeStar ? 'special' : 'normal';
        const videoUrl = videoPaths[animationType as keyof typeof videoPaths];

        // 播放抽卡動畫，顯示目標角色頭像
        const animationEmbed = new EmbedBuilder().setImage(videoUrl);

        const animationMessage = await interaction.followUp({
          content: `-# 招募目標: ${studentsData[finalTargetStudentId].Name} | 已使用 ${previousPoints.stones}${emoji.stone}`,
          embeds: [animationEmbed],
        });

        // 創建動態更新的角色列表，用於"新"標籤判斷
        const dynamicObtainedCharacters = new Set(previousPoints.obtainedCharacters);
        const newCharactersInThisPull = new Set<string>();

        // 遍歷本次抽卡結果，動態更新已獲得角色列表
        pullResult.results.forEach((student: any) => {
          const studentId = student.Id.toString();
          if (!dynamicObtainedCharacters.has(studentId)) {
            // 如果這個角色之前沒抽到過，標記為本次新獲得
            newCharactersInThisPull.add(studentId);
            dynamicObtainedCharacters.add(studentId);
          }
        });

        // 創建混合數據：使用抽卡後的招募點數，但使用動態更新的角色列表
        const mixedPoints = {
          points: updatedPoints.points,
          stones: updatedPoints.stones,
          stats: updatedPoints.stats,
          obtainedCharacters: dynamicObtainedCharacters,
          newCharactersInThisPull: newCharactersInThisPull,
        };

        // 同時開始繪製圖片和等待動畫，確保圖片繪製完成後再顯示結果
        const [imageBuffer] = await Promise.all([
          drawPullResultImage(pullResult, mixedPoints),
          new Promise((resolve) => setTimeout(resolve, 7400)), // 等待時間改為7.4秒
        ]);

        if (!imageBuffer) {
          return interaction.followUp({
            content: '繪製圖片時發生錯誤，請重試',
            flags: MessageFlags.Ephemeral,
          });
        }

        const attachment = new AttachmentBuilder(imageBuffer, { name: 'pullresult.png' });

        // 創建包含"再來一次"和"重製抽數"按鈕的回覆
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder().setCustomId(`pull_again_${finalTargetStudentId}`).setLabel('再抽十抽').setStyle(ButtonStyle.Primary).setEmoji(emoji.gacha10),
          new ButtonBuilder().setCustomId(`reset_pull_${finalTargetStudentId}`).setLabel('重製抽數').setStyle(ButtonStyle.Secondary).setEmoji('🔄'),
        );

        const targetStudent = studentsData[finalTargetStudentId];

        // 構建統計顯示文字
        let statsDisplay = '';
        if (updatedPoints.stats.threeStar > 0) {
          const totalPulls = updatedPoints.points; // 總抽數
          const avgPullsPerThreeStar = totalPulls / updatedPoints.stats.threeStar; // 平均幾抽一位3星
          const threeStarRate = ((updatedPoints.stats.threeStar / totalPulls) * 100).toFixed(1); // 3星機率百分比

          statsDisplay = ` | 已抽取 ${updatedPoints.stats.threeStar} 位3星角色 平均 ${avgPullsPerThreeStar.toFixed(1)}/${threeStarRate}% 抽到3星角色 `;
        }

        // 編輯動畫消息來顯示結果
        await animationMessage.edit({
          content: `-# ${interaction.user.username} 的招募目標: ${targetStudent.Name} | 已使用 ${updatedPoints.stones}${emoji.stone}${statsDisplay}`,
          embeds: [],
          files: [attachment],
          components: [row],
        });

        // 發送webhook消息
        if (webhook) {
          webhook.send({
            embeds: [
              new EmbedBuilder()
                .setTimestamp()
                .setAuthor({
                  iconURL: interaction.user.displayAvatarURL({ size: 4096 }),
                  name: `${interaction.user.username} - ${interaction.user.id}`,
                })
                .setThumbnail(interaction.guild?.iconURL() ?? null)
                .setDescription(`\`\`\`${interaction.guild?.name} - ${interaction.guild?.id}\`\`\``)
                .addFields({ name: '再抽十抽', value: '\u200b', inline: true }),
            ],
          });
        }
      } catch (error: any) {
        new Logger('按鈕').error(`再來一次按鈕錯誤：${error.message}`);
        await interaction.followUp({
          content: '再來一次時發生錯誤，請老師重新執行抽卡指令',
          flags: MessageFlags.Ephemeral,
        });
      }
    }

    // 處理"重製抽數"按鈕
    if (interaction.customId.startsWith('reset_pull_')) {
      try {
        // 檢查權限
        if (!(await checkBotPermissions(interaction))) {
          return;
        }

        // 從customId中獲取角色ID
        const targetStudentId = interaction.customId.replace('reset_pull_', '');

        // 重置該用戶對該目標的招募點數
        const userId = interaction.user.id;
        manualResetUserRecruitmentPoints(userId, targetStudentId);

        await interaction.followUp({
          content: '已重製抽數！招募點數、已使用石頭及角色統計已歸零',
          flags: MessageFlags.Ephemeral,
        });
      } catch (error: any) {
        new Logger('按鈕').error(`重製抽數按鈕錯誤：${error.message}`);
        await interaction.followUp({
          content: '重製抽數時發生錯誤，請老師稍後再試',
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }

  if (interaction.isStringSelectMenu()) {
    await interaction.deferUpdate().catch(() => {});
    try {
      // 檢查權限
      if (!(await checkBotPermissions(interaction))) {
        return;
      }

      await handleStudentActionMenu(interaction);
    } catch (error: any) {
      new Logger('SelectMenu').error(`SelectMenu 錯誤：${error.message}`);
      await interaction.followUp({
        content: '處理選單時發生錯誤，請老師稍後再試',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  if (interaction.isCommand()) {
    const command = commands.slash.get(interaction.commandName);
    if (!command)
      return replyOrFollowUp(interaction, {
        content: '哎呀，好像出了一點小問題，請老師稍後再試',
        flags: MessageFlags.Ephemeral,
      });

    const args: string[] = [];

    // for (let option of interaction.options.data) {
    //   if (option.type === ApplicationCommandOptionType.Subcommand) {
    //     if (option.name) args.push(option.name);
    //     option.options?.forEach((x) => {
    //       if (x.value) args.push(x.value.toString());
    //     });
    //   } else if (option.value) args.push(option.value.toString());
    // }

    try {
      // 檢查權限
      if (!(await checkBotPermissions(interaction))) {
        return;
      }

      const ackPlan = getCommandAckPlan(command, { defaultEphemeral: true });
      if (ackPlan.shouldDefer) {
        await ensureDeferredReply(interaction, ackPlan.ephemeral);
      }

      await command.execute(interaction as ChatInputCommandInteraction, ...args);
      const time = `花費 ${((Date.now() - interaction.createdTimestamp) / 1000).toFixed(2)} 秒`;

      new Logger('指令').command(`${interactionUser.displayName}(${interactionUser.id}) 執行 ${command.data.name} - ${time}`);
      if (webhook) {
        webhook.send({
          embeds: [
            new EmbedBuilder()
              .setTimestamp()
              .setAuthor({
                iconURL: interactionUser.displayAvatarURL({ size: 4096 }),
                name: `${interactionUser.username} - ${interactionUser.id}`,
              })
              .setThumbnail(interactionGuild?.iconURL() ?? null)
              .setDescription(`\`\`\`${interactionGuild?.name} - ${interactionGuild?.id}\`\`\``)
              .addFields({ name: command.data.name, value: '\u200b', inline: true }),
          ],
        });
      }
    } catch (error: any) {
      new Logger('指令').error(`${interactionUser.displayName}(${interactionUser.id}) 執行 ${command.data.name} - 錯誤訊息：${error.message}`);
      await failedReply(interaction, '哦喲', '好像出了一點小問題，請重試，若問題持續發生，可以截圖下方錯誤訊息並附上錯誤碼 <errorCode> 聯絡開發者，我們會盡快處理', `[${error.code}] ${error.message}`);
    }
  }
  // else if (interaction.isContextMenuCommand()) {
  //   const command = commands.slash.get(interaction.commandName);
  //   if (!command) return;
  //   try {
  //     await command.execute(interaction, userLocale);
  //   } catch (e: any) {
  //     new Logger('指令').error(`錯誤訊息：${e.message}`);
  //     await interaction.reply({
  //       content: '哦喲，好像出了一點小問題，請重試',
  //       flags: MessageFlags.Ephemeral,
  //     });
  //   }
  // }
});
