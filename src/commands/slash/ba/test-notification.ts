import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField, MessageFlags, TextChannel } from 'discord.js';
import { client, database } from '@/index.js';
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

interface ForumThreadDetail {
  threadId: string;
  title: string;
  content: string;
  summary: string;
  thumbnailImageUrl?: string;
  createDate: number;
  modifyDate: number;
  pictureCount: number;
  user: {
    nickname: string;
    profileImageUrl?: string;
    isAdmin: boolean;
  };
}

interface ForumResponse {
  stickyThreads: ForumThread[];
}

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
  lastModifyDate?: number;
  lastMessageId?: string;
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

// 格式化時間戳
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Taipei',
  });
}

// 獲取線程詳細數據
async function fetchThreadDetail(threadId: string): Promise<ForumThreadDetail | null> {
  try {
    const response = await axios.get<ForumThreadDetail>(`https://forum.nexon.com/api/v1/thread/${threadId}?alias=bluearchivetw`, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });

    return response.data;
  } catch (error) {
    new Logger('測試通知').error(`獲取線程詳細數據失敗 (${threadId}): ${error}`);
    return null;
  }
}

// 從HTML內容中提取圖片URL
function extractImagesFromContent(content: string, pictureCount: number = 0): string[] {
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  const images: string[] = [];
  let match;

  while ((match = imgRegex.exec(content)) !== null) {
    if (match[1] && !match[1].includes('data:image')) {
      images.push(match[1]);
    }
  }

  const maxImages = Math.min(pictureCount, images.length, 4);
  return images.slice(0, maxImages);
}

// 格式化HTML內容為純文字
function formatContentToText(content: string): string {
  let text = content
    .replace(/<img[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  if (text.length > 1024) {
    text = text.substring(0, 1021) + '...';
  }

  return text;
}

// 獲取論壇數據
async function fetchForumData(boardUrl: string): Promise<ForumThread[]> {
  try {
    const response = await axios.get<ForumResponse>(boardUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });

    if (!response.data.stickyThreads) throw new Error('API 回應格式不正確');

    return response.data.stickyThreads;
  } catch (error) {
    new Logger('測試通知').error(`獲取論壇數據失敗: ${error}`);
    throw error;
  }
}

// 發送測試通知
async function sendTestNotification(notification: any, threadDetail: ForumThreadDetail, boardConfig: any, isTest: boolean = true): Promise<string | null> {
  try {
    const guild = client.guilds.cache.get(notification.guildId);
    if (!guild) {
      new Logger('測試通知').warn(`找不到伺服器: ${notification.guildId}`);
      return null;
    }

    const channel = guild.channels.cache.get(notification.channelId) as TextChannel;
    if (!channel) {
      new Logger('測試通知').warn(`找不到頻道: ${notification.channelId} 在伺服器 ${notification.guildId}`);
      return null;
    }

    if (!channel.permissionsFor(client.user!)?.has('SendMessages')) {
      new Logger('測試通知').info(`跳過頻道 ${channel.name} (${notification.channelId}) - 機器人沒有發送訊息權限`);
      return null;
    }

    const images = extractImagesFromContent(threadDetail.content, threadDetail.pictureCount);

    const mainEmbed = new EmbedBuilder()
      .setColor('#FF6B6B')
      .setTitle(`${isTest ? '[測試] ' : ''}${threadDetail.title}`)
      .setAuthor({
        name: 'Blue Archive TW',
        url: 'https://forum.nexon.com/bluearchiveTW/main',
        iconURL: 'https://dszw1qtcnsa5e.cloudfront.net/community/20230510/dda02f80-d073-4eca-bfcd-fe9e757c1fc4/00%EC%95%84%EB%A1%9C%EB%82%98SD.gif',
      })
      .setURL(`https://forum.nexon.com/bluearchiveTW/board_view?board=${boardConfig.id}&thread=${threadDetail.threadId}`)
      .setDescription(formatContentToText(threadDetail.content))
      .setFooter({
        text: `${threadDetail.user.nickname} • ${formatTimestamp(threadDetail.createDate)}${isTest ? ' [測試通知]' : ''}`,
        iconURL: threadDetail.user.profileImageUrl || 'https://forum.nexon.com/favicon.ico',
      });

    if (images.length > 0) {
      mainEmbed.setImage(images[0]);
    }

    const imageEmbeds: EmbedBuilder[] = [];
    for (let i = 1; i < images.length; i++) {
      const imageEmbed = new EmbedBuilder().setImage(images[i]).setURL(`https://forum.nexon.com/bluearchiveTW/board_view?board=${boardConfig.id}&thread=${threadDetail.threadId}`);
      imageEmbeds.push(imageEmbed);
    }

    const message = await channel.send({ embeds: [mainEmbed, ...imageEmbeds] });
    const actionType = isTest ? '測試' : '發送';
    new Logger('測試通知').info(
      `已${actionType}${notification.boardName}通知到伺服器 ${notification.guildName} (${notification.guildId}) 的頻道 ${notification.channelName} (${notification.channelId})`,
    );
    return message.id;
  } catch (error) {
    new Logger('測試通知').error(`發送測試通知時發生錯誤: ${error}`);
    return null;
  }
}

export default {
  data: new SlashCommandBuilder()
    .setName('test-notification')
    .setDescription('Test the notification system with real forum data')
    .setNameLocalizations({
      'zh-TW': '測試通知',
    })
    .setDescriptionLocalizations({
      'zh-TW': '使用真實論壇數據測試通知系統',
    })
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('Select the type of content to test')
        .setNameLocalizations({
          'zh-TW': '類型',
        })
        .setDescriptionLocalizations({
          'zh-TW': '選擇要測試的內容類型',
        })
        .setRequired(true)
        .addChoices(
          { name: '📢 Announcement', name_localizations: { 'zh-TW': '📢 公告' }, value: 'announcement' },
          { name: '📝 Update', name_localizations: { 'zh-TW': '📝 更新日誌' }, value: 'update' },
          { name: '🎉 Event', name_localizations: { 'zh-TW': '🎉 最新活動' }, value: 'event' },
          { name: '🔔 All', name_localizations: { 'zh-TW': '🔔 全部類型' }, value: 'all' },
        ),
    )
    .addBooleanOption((option) =>
      option
        .setName('force')
        .setDescription('Force test even if no notification is set up')
        .setNameLocalizations({
          'zh-TW': '強制',
        })
        .setDescriptionLocalizations({
          'zh-TW': '即使沒有設定通知也強制測試',
        })
        .setRequired(false),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    // 檢查權限
    if (!interaction.memberPermissions?.has(PermissionsBitField.Flags.ManageGuild)) {
      return interaction.reply({
        content: '❌ 老師您需要「管理伺服器」權限才能測試夏萊事務所通知',
        flags: MessageFlags.Ephemeral,
      });
    }

    if (!interaction.guild) {
      return interaction.reply({
        content: '❌ 該指令只能在伺服器內使用',
        flags: MessageFlags.Ephemeral,
      });
    }

    const type = interaction.options.getString('type')!;
    const force = interaction.options.getBoolean('force') || false;

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    try {
      if (type === 'all') {
        await this.handleTestAll(interaction, force);
        return;
      }

      await this.handleTestSingle(interaction, type, force);
    } catch (error) {
      new Logger('測試通知').error(`測試通知時發生錯誤: ${error}`);
      await interaction.editReply({
        content: '❌ 測試通知時發生錯誤，請老師稍後再試',
      });
    }
  },

  async handleTestSingle(interaction: ChatInputCommandInteraction, type: string, force: boolean) {
    const boardConfig = FORUM_BOARDS[type as keyof typeof FORUM_BOARDS];
    const boardData = (await database.get(`forum_notification_${type}`)) as NotificationBoardData | null;

    if (!boardData || !boardData.guilds[interaction.guild!.id]) {
      if (!force) {
        await interaction.editReply({
          content: `❌ 此伺服器尚未設定夏萊事務所的 ${boardConfig.name} 通知\n老師可以使用 \`/notification setup type:${type}\` 來設定通知，或使用 \`force:true\` 參數強制測試`,
        });
        return;
      }
    }

    try {
      // 獲取論壇數據
      const forumThreads = await fetchForumData(boardConfig.url);
      if (forumThreads.length === 0) {
        await interaction.editReply({
          content: `❌ 無法獲取 ${boardConfig.name} 的論壇數據`,
        });
        return;
      }

      const latestThread = forumThreads[0];
      const threadDetail = await fetchThreadDetail(latestThread.threadId);

      if (!threadDetail) {
        await interaction.editReply({
          content: `❌ 無法獲取 ${boardConfig.name} 的最新貼文詳細內容`,
        });
        return;
      }

      // 創建測試通知設定
      const testNotification = {
        guildId: interaction.guild!.id,
        channelId: interaction.channel!.id,
        channelName: (interaction.channel as TextChannel).name,
        guildName: interaction.guild!.name,
        setupBy: interaction.user.id,
        setupAt: Date.now(),
        lastCheck: Date.now(),
        lastThreadId: latestThread.threadId,
        type: type,
        boardId: boardConfig.id,
        boardName: boardConfig.name,
        boardEmoji: boardConfig.emoji,
      };

      // 發送測試通知
      const messageId = await sendTestNotification(testNotification, threadDetail, boardConfig, true);

      if (messageId) {
        const embed = new EmbedBuilder()
          .setColor('#4CAF50')
          .setTitle('✅ 測試通知發送成功')
          .addFields(
            { name: '測試類型', value: `${boardConfig.emoji} ${boardConfig.name}`, inline: true },
            { name: '測試者', value: `<@${interaction.user.id}>`, inline: true },
            { name: '測試頻道', value: `<#${interaction.channel!.id}>`, inline: true },
            { name: '貼文標題', value: threadDetail.title, inline: false },
            { name: '貼文作者', value: threadDetail.user.nickname, inline: true },
            { name: '發布時間', value: formatTimestamp(threadDetail.createDate), inline: true },
          )
          .setTimestamp()
          .setFooter({ text: '這是一個測試通知，用於驗證通知系統是否正常工作' });

        await interaction.editReply({ embeds: [embed] });
        new Logger('測試通知').info(`用戶 ${interaction.user.tag} (${interaction.user.id}) 在伺服器 ${interaction.guild!.name} (${interaction.guild!.id}) 測試了${boardConfig.name}通知`);
      } else {
        await interaction.editReply({
          content: `❌ 測試通知發送失敗，請檢查機器人權限和頻道設定`,
        });
      }
    } catch (error) {
      new Logger('測試通知').error(`測試${boardConfig.name}通知時發生錯誤: ${error}`);
      await interaction.editReply({
        content: `❌ 測試 ${boardConfig.name} 通知時發生錯誤：${(error as Error).message}`,
      });
    }
  },

  async handleTestAll(interaction: ChatInputCommandInteraction, force: boolean) {
    const results = [];
    const errors = [];
    const skipped = [];

    for (const [type, boardConfig] of Object.entries(FORUM_BOARDS)) {
      try {
        const boardData = (await database.get(`forum_notification_${type}`)) as NotificationBoardData | null;

        if (!boardData || !boardData.guilds[interaction.guild!.id]) {
          if (!force) {
            skipped.push(`${boardConfig.emoji} ${boardConfig.name} (未設定)`);
            continue;
          }
        }

        // 獲取論壇數據
        const forumThreads = await fetchForumData(boardConfig.url);
        if (forumThreads.length === 0) {
          errors.push(`${boardConfig.emoji} ${boardConfig.name}: 無法獲取論壇數據`);
          continue;
        }

        const latestThread = forumThreads[0];
        const threadDetail = await fetchThreadDetail(latestThread.threadId);

        if (!threadDetail) {
          errors.push(`${boardConfig.emoji} ${boardConfig.name}: 無法獲取貼文詳細內容`);
          continue;
        }

        // 創建測試通知設定
        const testNotification = {
          guildId: interaction.guild!.id,
          channelId: interaction.channel!.id,
          channelName: (interaction.channel as TextChannel).name,
          guildName: interaction.guild!.name,
          setupBy: interaction.user.id,
          setupAt: Date.now(),
          lastCheck: Date.now(),
          lastThreadId: latestThread.threadId,
          type: type,
          boardId: boardConfig.id,
          boardName: boardConfig.name,
          boardEmoji: boardConfig.emoji,
        };

        // 發送測試通知
        const messageId = await sendTestNotification(testNotification, threadDetail, boardConfig, true);

        if (messageId) {
          results.push(`${boardConfig.emoji} ${boardConfig.name}`);
        } else {
          errors.push(`${boardConfig.emoji} ${boardConfig.name}: 發送失敗`);
        }
      } catch (error) {
        errors.push(`${boardConfig.emoji} ${boardConfig.name}: ${(error as Error).message}`);
        new Logger('測試通知').error(`測試${boardConfig.name}通知時發生錯誤: ${error}`);
      }
    }

    // 創建結果嵌入訊息
    const embed = new EmbedBuilder()
      .setColor(errors.length === 0 && results.length > 0 ? '#4CAF50' : errors.length > 0 ? '#FF9800' : '#2196F3')
      .setTitle(errors.length === 0 && results.length > 0 ? '✅ 測試通知完成' : errors.length > 0 ? '⚠️ 部分測試通知失敗' : 'ℹ️ 測試通知狀態')
      .addFields({ name: '測試者', value: `<@${interaction.user.id}>`, inline: true }, { name: '測試頻道', value: `<#${interaction.channel!.id}>`, inline: true })
      .setTimestamp();

    if (results.length > 0) {
      embed.addFields({
        name: '✅ 測試成功',
        value: results.join('\n'),
        inline: false,
      });
    }

    if (skipped.length > 0) {
      embed.addFields({
        name: '⏭️ 已跳過',
        value: skipped.join('\n'),
        inline: false,
      });
    }

    if (errors.length > 0) {
      embed.addFields({
        name: '❌ 測試失敗',
        value: errors.join('\n'),
        inline: false,
      });
    }

    embed.setFooter({ text: '這些是測試通知，用於驗證通知系統是否正常工作' });

    await interaction.editReply({ embeds: [embed] });
    new Logger('測試通知').info(`用戶 ${interaction.user.tag} (${interaction.user.id}) 在伺服器 ${interaction.guild!.name} (${interaction.guild!.id}) 測試了全部通知類型`);
  },
};
