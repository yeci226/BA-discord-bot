import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField, ChannelType, MessageFlags } from 'discord.js';
import { database } from '@/index.js';
import axios from 'axios';
import Logger from '@/utilities/core/logger.js';

interface ForumThread {
  threadId: string;
  title: string;
  createDate: number;
  user: {
    nickname: string;
  };
}

interface ForumResponse {
  stickyThreads: ForumThread[];
}

// 新的資料結構介面
interface GuildNotificationSettings {
  channelId: string;
  channelName: string;
  guildName: string;
  setupBy: string;
  setupAt: number;
}

interface NotificationBoardData {
  guilds: {
    [guildId: string]: GuildNotificationSettings;
  };
  boardId: string;
  boardName: string;
  boardEmoji: string;
  lastCheck: number;
  lastThreadId: string | null;
}

// 板塊配置
const FORUM_BOARDS = {
  announcement: {
    id: '3359',
    name: '公告',
    emoji: '📢',
    url: 'https://forum.nexon.com/api/v1/board/3359/stickyThreads?alias=bluearchivetw&pageSize=20',
  },
  update: {
    id: '3352',
    name: '更新日誌',
    emoji: '📝',
    url: 'https://forum.nexon.com/api/v1/board/3352/stickyThreads?alias=bluearchivetw&pageSize=20',
  },
  event: {
    id: '3353',
    name: '最新活動',
    emoji: '🎉',
    url: 'https://forum.nexon.com/api/v1/board/3353/stickyThreads?alias=bluearchivetw&pageSize=20',
  },
} as const;

export default {
  data: new SlashCommandBuilder()
    .setName('notification')
    .setDescription('Set up the notification channel for the Blue Archive official forum')
    .setNameLocalizations({
      'zh-TW': '通知設定',
    })
    .setDescriptionLocalizations({
      'zh-TW': '設定蔚藍檔案官方論壇通知',
    })
    .addSubcommand((subcommand) =>
      subcommand
        .setName('setup')
        .setDescription('Set up notification')
        .setNameLocalizations({
          'zh-TW': '設定',
        })
        .setDescriptionLocalizations({
          'zh-TW': '設定通知',
        })
        .addStringOption((option) =>
          option
            .setName('type')
            .setDescription('Select the type of content to automatically notify')
            .setNameLocalizations({
              'zh-TW': '類型',
            })
            .setDescriptionLocalizations({
              'zh-TW': '選擇要自動通知的類型',
            })
            .setRequired(true)
            .addChoices(
              { name: '📢 Announcement', name_localizations: { 'zh-TW': '📢 公告' }, value: 'announcement' },
              { name: '📝 Update', name_localizations: { 'zh-TW': '📝 更新日誌' }, value: 'update' },
              { name: '🎉 Event', name_localizations: { 'zh-TW': '🎉 最新活動' }, value: 'event' },
              { name: '🔔 All', name_localizations: { 'zh-TW': '🔔 全部類型' }, value: 'all' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('channel')
            .setDescription('Select the channel to set up')
            .setNameLocalizations({
              'zh-TW': '頻道',
            })
            .setDescriptionLocalizations({
              'zh-TW': '選擇要設定的頻道',
            }),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('remove')
        .setDescription('Remove notification settings')
        .setNameLocalizations({
          'zh-TW': '移除',
        })
        .setDescriptionLocalizations({
          'zh-TW': '移除通知設定',
        })
        .addStringOption((option) =>
          option
            .setName('type')
            .setDescription('Select the type of notification to remove')
            .setNameLocalizations({
              'zh-TW': '類型',
            })
            .setDescriptionLocalizations({
              'zh-TW': '選擇要移除的通知類型',
            })
            .setRequired(true)
            .addChoices(
              { name: '📢 Announcement', name_localizations: { 'zh-TW': '📢 公告' }, value: 'announcement' },
              { name: '📝 Update', name_localizations: { 'zh-TW': '📝 更新日誌' }, value: 'update' },
              { name: '🎉 Event', name_localizations: { 'zh-TW': '🎉 最新活動' }, value: 'event' },
              { name: '🗑️ All', name_localizations: { 'zh-TW': '🗑️ 全部類型' }, value: 'all' },
            ),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('status')
        .setDescription('Check the status of the notification')
        .setNameLocalizations({
          'zh-TW': '狀態',
        })
        .setDescriptionLocalizations({
          'zh-TW': '查看通知設定狀態',
        }),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    // 檢查權限
    if (!interaction.memberPermissions?.has(PermissionsBitField.Flags.ManageGuild)) {
      return interaction.reply({
        content: '❌ 老師您需要「管理伺服器」權限才能設定夏萊事務所即時通知',
        flags: MessageFlags.Ephemeral,
      });
    }

    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'setup':
        await this.handleSetup(interaction);
        break;
      case 'remove':
        await this.handleRemove(interaction);
        break;
      case 'status':
        await this.handleStatus(interaction);
        break;
    }
  },

  async handleSetup(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild || !interaction.channel) {
      return interaction.reply({
        content: '❌ 該指令只能在伺服器內使用',
        flags: MessageFlags.Ephemeral,
      });
    }

    if (interaction.channel.type !== ChannelType.GuildText) {
      return interaction.reply({
        content: '❌ 夏萊事務所的通知只能在文字頻道中設定',
        flags: MessageFlags.Ephemeral,
      });
    }

    // 檢查機器人是否有必要的權限
    const botPermissions = interaction.channel.permissionsFor(interaction.client.user!);
    const requiredPermissions = [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles];

    const missingPermissions = requiredPermissions.filter((permission) => !botPermissions?.has(permission));

    if (missingPermissions.length > 0) {
      const permissionNames: { [key: string]: string } = {
        [PermissionsBitField.Flags.SendMessages.toString()]: '發送訊息',
        [PermissionsBitField.Flags.EmbedLinks.toString()]: '嵌入連結',
        [PermissionsBitField.Flags.AttachFiles.toString()]: '附加檔案',
      };

      const missingPermissionNames = missingPermissions.map((perm) => permissionNames[perm.toString()]).join('\n- ');

      return interaction.reply({
        content: `❌ 無法設定夏萊事務所的通知，彩奈需要以下權限：\n- ${missingPermissionNames}`,
        flags: MessageFlags.Ephemeral,
      });
    }

    const type = interaction.options.getString('type');

    if (type === 'all') {
      await this.handleSetupAll(interaction);
      return;
    }

    const boardConfig = FORUM_BOARDS[type as keyof typeof FORUM_BOARDS];

    try {
      // 檢查是否已經設定過此類型的通知
      const existingBoardData = (await database.get(`forum_notification_${type}`)) as NotificationBoardData | null;

      if (existingBoardData && existingBoardData.guilds[interaction.guild.id]) {
        return interaction.reply({
          content: `❌ 伺服器已經設定過夏萊事務所的 ${boardConfig.name} 通知了\n如果老師想要更改設定，請先使用 \`/notification remove type:${type}\` 移除現有設定`,
          flags: MessageFlags.Ephemeral,
        });
      }

      // 測試API連接
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });

      try {
        const response = await axios.get<ForumResponse>(boardConfig.url, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
          },
        });

        if (!response.data.stickyThreads) {
          throw new Error('API 回應格式不正確');
        }

        // 獲取或創建板塊資料
        const boardData: NotificationBoardData = existingBoardData || {
          guilds: {},
          boardId: boardConfig.id,
          boardName: boardConfig.name,
          boardEmoji: boardConfig.emoji,
          lastCheck: Date.now(),
          lastThreadId: response.data.stickyThreads[0]?.threadId || null,
        };

        // 添加伺服器設定
        boardData.guilds[interaction.guild.id] = {
          channelId: interaction.channel.id,
          channelName: interaction.channel.name,
          guildName: interaction.guild.name,
          setupBy: interaction.user.id,
          setupAt: Date.now(),
        };

        // 保存通知設定
        await database.set(`forum_notification_${type}`, boardData);

        const embed = new EmbedBuilder()
          .setColor('#4CAF50')
          .setTitle('✅ 成功設定夏萊事務所的通知')
          .addFields(
            { name: '頻道', value: `#${interaction.channel.name}`, inline: true },
            { name: '設定者', value: `<@${interaction.user.id}>`, inline: true },
            { name: '通知類型', value: `${boardConfig.emoji} ${boardConfig.name}`, inline: true },
          )
          .setTimestamp()
          .setFooter({ text: `當夏萊事務所的 ${boardConfig.name} 有新內容時，彩奈會在這裡發送通知` });

        await interaction.editReply({ embeds: [embed] });

        new Logger('通知設定').info(`伺服器 ${interaction.guild.name} (${interaction.guild.id}) 設定了${boardConfig.name}通知，頻道: ${interaction.channel.name} (${interaction.channel.id})`);
      } catch (error) {
        new Logger('通知設定').error(`API 測試失敗: ${error}`);
        await interaction.editReply({
          content: '❌ 無法連接到夏萊事務所，請老師稍後再試\n\n錯誤詳情：' + (error as Error).message,
        });
        return;
      }
    } catch (error) {
      new Logger('通知設定').error(`設定通知時發生錯誤: ${error}`);
      await interaction.editReply({
        content: '❌ 設定通知時發生錯誤，請老師稍後再試',
      });
    }
  },

  async handleSetupAll(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild || !interaction.channel) {
      return interaction.reply({
        content: '❌ 該指令只能在伺服器內使用',
        flags: MessageFlags.Ephemeral,
      });
    }

    if (interaction.channel.type !== ChannelType.GuildText) {
      return interaction.reply({
        content: '❌ 夏萊事務所的通知只能在文字頻道中設定',
        flags: MessageFlags.Ephemeral,
      });
    }

    // 檢查機器人是否有必要的權限
    const botPermissions = interaction.channel.permissionsFor(interaction.client.user!);
    const requiredPermissions = [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles];

    const missingPermissions = requiredPermissions.filter((permission) => !botPermissions?.has(permission));

    if (missingPermissions.length > 0) {
      const permissionNames: { [key: string]: string } = {
        [PermissionsBitField.Flags.SendMessages.toString()]: '發送訊息',
        [PermissionsBitField.Flags.EmbedLinks.toString()]: '嵌入連結',
        [PermissionsBitField.Flags.AttachFiles.toString()]: '附加檔案',
      };

      const missingPermissionNames = missingPermissions.map((perm) => permissionNames[perm.toString()]).join('\n- ');

      return interaction.reply({
        content: `❌ 無法設定夏萊事務所的通知，彩奈需要以下權限：\n- ${missingPermissionNames}`,
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    try {
      // 檢查是否已經設定過任何類型的通知
      const allKeys = await database.all();
      const existingKeys = allKeys.filter((item: any) => item.id && item.id.startsWith('forum_notification_')).map((item: any) => item.id);

      // 檢查每個板塊是否已經包含此伺服器
      const existingSettings = new Set<string>();
      for (const key of existingKeys) {
        const boardData = (await database.get(key)) as NotificationBoardData;
        if (boardData && boardData.guilds[interaction.guild!.id]) {
          // 從 key 中提取類型名稱
          const type = key.replace('forum_notification_', '');
          existingSettings.add(type);
        }
      }

      const results = [];
      const errors = [];
      const skipped = [];

      // 為每種類型設定通知
      for (const [type, boardConfig] of Object.entries(FORUM_BOARDS)) {
        // 跳過已經設定的類型
        if (existingSettings.has(type)) {
          skipped.push(`${boardConfig.emoji} ${boardConfig.name}`);
          continue;
        }

        try {
          // 測試API連接
          const response = await axios.get<ForumResponse>(boardConfig.url, {
            timeout: 10000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            },
          });

          if (!response.data.stickyThreads) {
            throw new Error('API 回應格式不正確');
          }

          // 獲取或創建板塊資料
          const existingBoardData = (await database.get(`forum_notification_${type}`)) as NotificationBoardData | null;
          const boardData: NotificationBoardData = existingBoardData || {
            guilds: {},
            boardId: boardConfig.id,
            boardName: boardConfig.name,
            boardEmoji: boardConfig.emoji,
            lastCheck: Date.now(),
            lastThreadId: response.data.stickyThreads[0]?.threadId || null,
          };

          // 添加伺服器設定
          boardData.guilds[interaction.guild.id] = {
            channelId: interaction.channel.id,
            channelName: interaction.channel.name,
            guildName: interaction.guild.name,
            setupBy: interaction.user.id,
            setupAt: Date.now(),
          };

          // 保存通知設定
          await database.set(`forum_notification_${type}`, boardData);

          results.push(`${boardConfig.emoji} ${boardConfig.name}`);
          new Logger('通知設定').info(`伺服器 ${interaction.guild.name} (${interaction.guild.id}) 設定了${boardConfig.name}通知，頻道: ${interaction.channel.name} (${interaction.channel.id})`);
        } catch (error) {
          errors.push(`${boardConfig.emoji} ${boardConfig.name}: ${(error as Error).message}`);
          new Logger('通知設定').error(`設定${boardConfig.name}通知失敗: ${error}`);
        }
      }

      // 創建結果嵌入訊息
      const embed = new EmbedBuilder()
        .setColor(errors.length === 0 && results.length > 0 ? '#4CAF50' : errors.length > 0 ? '#FF9800' : '#2196F3')
        .setTitle(errors.length === 0 && results.length > 0 ? '✅ 成功設定夏萊事務所的通知' : errors.length > 0 ? '⚠️ 夏萊事務所的部分通知設定失敗' : 'ℹ️ 夏萊事務所的通知設定狀態')
        .addFields({ name: '頻道', value: `<#${interaction.channel.id}>`, inline: true }, { name: '設定者', value: `<@${interaction.user.id}>`, inline: true })
        .setTimestamp();

      if (results.length > 0) {
        embed.addFields({
          name: '✅ 成功設定',
          value: results.join(' • '),
          inline: false,
        });
      }

      if (skipped.length > 0) {
        embed.addFields({
          name: '⏭️ 已跳過（已設定）',
          value: skipped.join(' • '),
          inline: false,
        });
      }

      if (errors.length > 0) {
        embed.addFields({
          name: '❌ 設定失敗',
          value: errors.join(' • '),
          inline: false,
        });
      }

      embed.setFooter({ text: `當夏萊事務所有新內容時，彩奈會在這裡發送通知` });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      new Logger('通知設定').error(`批量設定通知時發生錯誤: ${error}`);
      await interaction.editReply({
        content: '❌ 批量設定通知時發生錯誤，請老師稍後再試',
      });
    }
  },

  async handleRemove(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) {
      return interaction.reply({
        content: '❌ 該指令只能在伺服器內使用',
        flags: MessageFlags.Ephemeral,
      });
    }

    const type = interaction.options.getString('type');

    if (type === 'all') {
      await this.handleRemoveAll(interaction);
      return;
    }

    const boardConfig = FORUM_BOARDS[type as keyof typeof FORUM_BOARDS];

    try {
      const boardData = (await database.get(`forum_notification_${type}`)) as NotificationBoardData | null;

      if (!boardData || !boardData.guilds[interaction.guild.id]) {
        return interaction.reply({
          content: `❌ 此伺服器尚未設定夏萊事務所的 ${boardConfig.name} 通知`,
          flags: MessageFlags.Ephemeral,
        });
      }

      // 移除伺服器的通知設定
      delete boardData.guilds[interaction.guild.id];

      // 如果沒有其他伺服器使用此板塊，則刪除整個板塊資料
      if (Object.keys(boardData.guilds).length === 0) {
        await database.delete(`forum_notification_${type}`);
      } else {
        // 否則更新板塊資料
        await database.set(`forum_notification_${type}`, boardData);
      }

      const embed = new EmbedBuilder()
        .setColor('#F44336')
        .setTitle('✅ 已移除通知設定')
        .addFields({ name: '移除通知類型', value: `${boardConfig.emoji} ${boardConfig.name}`, inline: true })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

      new Logger('通知設定').info(`伺服器 ${interaction.guild.name} (${interaction.guild.id}) 移除了${boardConfig.name}通知設定`);
    } catch (error) {
      new Logger('通知設定').error(`移除通知時發生錯誤: ${error}`);
      await interaction.reply({
        content: '❌ 移除通知時發生錯誤，請老師稍後再試',
        flags: MessageFlags.Ephemeral,
      });
    }
  },

  async handleRemoveAll(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) {
      return interaction.reply({
        content: '❌ 該指令只能在伺服器內使用',
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      // 獲取所有通知設定
      const allKeys = await database.all();
      const notificationKeys = allKeys.filter((item: any) => item.id && item.id.startsWith('forum_notification_')).map((item: any) => item.id);

      const removedTypes = [];
      const errors = [];
      let hasRemovedAny = false;

      // 移除所有通知設定
      for (const key of notificationKeys) {
        try {
          const boardData = (await database.get(key)) as NotificationBoardData;
          if (!boardData || !boardData.guilds[interaction.guild!.id]) continue;

          const type = key.replace('forum_notification_', '');
          const boardConfig = FORUM_BOARDS[type as keyof typeof FORUM_BOARDS];

          // 移除伺服器的通知設定
          delete boardData.guilds[interaction.guild!.id];

          // 如果沒有其他伺服器使用此板塊，則刪除整個板塊資料
          if (Object.keys(boardData.guilds).length === 0) {
            await database.delete(key);
          } else {
            // 否則更新板塊資料
            await database.set(key, boardData);
          }

          removedTypes.push(`${boardConfig.emoji} ${boardConfig.name}`);
          hasRemovedAny = true;
          new Logger('通知設定').info(`伺服器 ${interaction.guild.name} (${interaction.guild.id}) 移除了${boardConfig.name}通知設定`);
        } catch (error) {
          errors.push(`移除通知失敗: ${(error as Error).message}`);
          new Logger('通知設定').error(`移除通知時發生錯誤: ${error}`);
        }
      }

      if (!hasRemovedAny) {
        return interaction.reply({
          content: '❌ 此伺服器尚未設定任何夏萊事務所的通知',
          flags: MessageFlags.Ephemeral,
        });
      }

      // 創建結果嵌入訊息
      const embed = new EmbedBuilder()
        .setColor(errors.length === 0 ? '#F44336' : '#FF9800')
        .setTitle(errors.length === 0 ? '✅ 已移除全部通知設定' : '⚠️ 部分通知設定已移除')
        .setTimestamp();

      if (removedTypes.length > 0) {
        embed.addFields({
          name: '✅ 已移除',
          value: removedTypes.join(' • '),
          inline: false,
        });
      }

      if (errors.length > 0) {
        embed.addFields({
          name: '❌ 移除失敗',
          value: errors.join(' • '),
          inline: false,
        });
      }

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      new Logger('通知設定').error(`批量移除通知時發生錯誤: ${error}`);
      await interaction.reply({
        content: '❌ 批量移除通知時發生錯誤，請老師稍後再試',
        flags: MessageFlags.Ephemeral,
      });
    }
  },

  async handleStatus(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) {
      return interaction.reply({
        content: '❌ 該指令只能在伺服器內使用',
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      // 獲取所有通知設定
      const allKeys = await database.all();

      // 正確處理 QuickDB 返回的數據格式
      const notificationKeys = allKeys.filter((item: any) => item.id && item.id.startsWith('forum_notification_')).map((item: any) => item.id);

      const embed = new EmbedBuilder().setColor('#2196F3').setTitle('📊 夏萊事務所的通知設定狀態');
      let hasAnyNotifications = false;

      // 顯示每個類型的通知狀態
      for (const key of notificationKeys) {
        const boardData = (await database.get(key)) as NotificationBoardData;
        if (!boardData || !boardData.guilds[interaction.guild!.id]) continue;

        const type = key.replace('forum_notification_', '');
        const boardConfig = FORUM_BOARDS[type as keyof typeof FORUM_BOARDS];
        const guildSettings = boardData.guilds[interaction.guild!.id];

        embed.addFields({
          name: `${boardConfig.emoji} ${boardConfig.name}`,
          value: `頻道: <#${guildSettings.channelId}>\n設定者: <@${guildSettings.setupBy}>\n設定時間: <t:${Math.floor(guildSettings.setupAt / 1000)}:F>\n上次檢查: <t:${Math.floor(boardData.lastCheck / 1000)}:R>`,
          inline: false,
        });
        hasAnyNotifications = true;
      }

      if (!hasAnyNotifications) {
        return interaction.reply({
          content: '❌ 此伺服器尚未設定任何夏萊事務所的通知\n老師可以使用 `/notification setup` 來設定通知',
          flags: MessageFlags.Ephemeral,
        });
      }

      embed.setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      new Logger('通知設定').error(`查看狀態時發生錯誤: ${error}`);
      await interaction.reply({
        content: '❌ 查看狀態時發生錯誤，請老師稍後再試',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
