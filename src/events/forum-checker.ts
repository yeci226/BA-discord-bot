import { EmbedBuilder, TextChannel } from 'discord.js';
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
  lastModifyDate?: number; // 記錄最後的修改時間
  lastMessageId?: string; // 記錄最後發送的消息ID
  lastContentHash?: string; // 記錄最後的內容哈希值
}

// 臨時介面，用於兼容 sendNotification 函數
interface NotificationSettings {
  guildId: string;
  channelId: string;
  channelName: string;
  guildName: string;
  setupBy: string;
  setupAt: number;
  lastCheck: number;
  lastThreadId: string | null;
  type: string;
  boardId: string;
  boardName: string;
  boardEmoji: string;
}

// 板塊配置
const FORUM_BOARDS = {
  announcement: {
    id: '3359',
    name: '公告',
    emoji: '📢',
    color: '#FF6B6B', // 紅色 - 重要公告
    url: 'https://forum.nexon.com/api/v1/board/3359/stickyThreads?alias=bluearchivetw&pageSize=20',
  },
  update: {
    id: '3352',
    name: '更新日誌',
    emoji: '📝',
    color: '#4ECDC4', // 青色 - 更新信息
    url: 'https://forum.nexon.com/api/v1/board/3352/stickyThreads?alias=bluearchivetw&pageSize=20',
  },
  event: {
    id: '3353',
    name: '最新活動',
    emoji: '🎉',
    color: '#FFE66D', // 黃色 - 活動信息
    url: 'https://forum.nexon.com/api/v1/board/3353/stickyThreads?alias=bluearchivetw&pageSize=20',
  },
} as const;

// 檢查間隔（每5分鐘檢查一次）
const CHECK_INTERVAL = 5 * 60 * 1000;

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

// 計算內容哈希值
function calculateContentHash(content: string): string {
  // 移除所有空白字符後計算簡單哈希
  const cleanContent = content.replace(/\s+/g, '').toLowerCase();
  let hash = 0;
  for (let i = 0; i < cleanContent.length; i++) {
    const char = cleanContent.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 轉換為32位整數
  }
  return hash.toString();
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
    new Logger('論壇檢查').error(`獲取線程詳細數據失敗 (${threadId}): ${error}`);
    return null;
  }
}

// 從HTML內容中提取圖片URL，使用pictureCount限制
function extractImagesFromContent(content: string, pictureCount: number = 0): string[] {
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  const images: string[] = [];
  let match;

  while ((match = imgRegex.exec(content)) !== null) {
    if (match[1] && !match[1].includes('data:image')) {
      images.push(match[1]);
    }
  }

  // 使用pictureCount和實際提取的圖片數量中的較小值，最多4張
  const maxImages = Math.min(pictureCount, images.length, 4);
  return images.slice(0, maxImages);
}

// 格式化HTML內容為Discord Embed支持的Markdown
function formatContentToText(content: string): string {
  let text = content
    // 移除圖片標籤
    .replace(/<img[^>]*>/gi, '')
    // 處理表格結構 - 先處理複雜的表格
    .replace(/<table[^>]*>(.*?)<\/table>/gi, '\n$1\n')
    .replace(/<tbody[^>]*>(.*?)<\/tbody>/gi, '$1')
    .replace(/<thead[^>]*>(.*?)<\/thead>/gi, '$1')
    .replace(/<tfoot[^>]*>(.*?)<\/tfoot>/gi, '$1')
    // 處理表格行和單元格
    .replace(/<tr[^>]*>(.*?)<\/tr>/gi, '$1\n')
    .replace(/<th[^>]*>(.*?)<\/th>/gi, '**$1** | ')
    .replace(/<td[^>]*>(.*?)<\/td>/gi, '$1 | ')
    // 處理粗體標籤 <b> 和 <strong> - 優先處理，避免被其他標籤影響
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    // 處理斜體標籤 <i> 和 <em>
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    // 處理刪除線標籤 <s> 和 <strike>
    .replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~')
    .replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~')
    // 處理下劃線標籤 <u>
    .replace(/<u[^>]*>(.*?)<\/u>/gi, '__$1__')
    // 處理代碼標籤 <code>
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    // 處理代碼塊標籤 <pre>
    .replace(/<pre[^>]*>(.*?)<\/pre>/gi, '```\n$1\n```')
    // 處理列表標籤
    .replace(/<ul[^>]*>(.*?)<\/ul>/gi, '$1')
    .replace(/<ol[^>]*>(.*?)<\/ol>/gi, '$1')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '• $1\n')
    // 處理標題標籤
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '**$1**\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '**$1**\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '**$1**\n')
    // 處理引用標籤 <blockquote>
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1')
    // 處理水平線標籤 <hr>
    .replace(/<hr[^>]*>/gi, '---\n')
    // 處理 span 標籤（移除但保留內容）
    .replace(/<span[^>]*>(.*?)<\/span>/gi, '$1')
    // 處理 div 標籤（移除但保留內容）
    .replace(/<div[^>]*>(.*?)<\/div>/gi, '$1')
    // 將 <br> 和 </p> 轉換為換行
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    // 將 <p> 轉換成空字串
    .replace(/<p[^>]*>/gi, '')
    // 移除其他HTML標籤 - 但保留已經轉換的Markdown格式
    .replace(/<[^>]*>/g, '')
    // 解碼HTML實體
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // 清理表格格式
    .replace(/\| \n/g, '\n')
    .replace(/\n\s*\|\s*\n/g, '\n')
    .replace(/\|\s*$/gm, '') // 移除行尾的多餘分隔符
    // 清理多餘的空白和換行
    .replace(/\n\s*\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // 限制長度
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
    new Logger('論壇檢查').error(`獲取論壇數據失敗: ${error}`);
    throw error;
  }
}

// 檢查新公告
async function checkForNewAnnouncements() {
  try {
    // 獲取所有通知設置
    const allKeys = await database.all();
    const notificationKeys = allKeys.filter((item: any) => item.id && item.id.startsWith('forum_notification_')).map((item: any) => item.id);
    if (notificationKeys.length === 0) return;

    // 為每個板塊檢查更新
    for (const key of notificationKeys) {
      try {
        const boardData = (await database.get(key)) as NotificationBoardData;
        if (!boardData || !boardData.boardId) continue;

        // 找到對應的板塊配置
        const boardConfig = Object.values(FORUM_BOARDS).find((board) => board.id === boardData.boardId);
        if (!boardConfig) continue;

        // 獲取該板塊的最新數據
        const forumThreads = await fetchForumData(boardConfig.url);
        if (forumThreads.length === 0) continue;
        const latestThread = forumThreads[0];

        // 檢查是否有新公告或編輯
        if (!boardData.lastThreadId) {
          // 如果是新設置的通知，更新最後檢查的線程ID
          boardData.lastCheck = Date.now();
          boardData.lastThreadId = latestThread.threadId;
          await database.set(key, boardData);
          continue;
        }

        // 獲取最新公告的詳細數據
        const latestThreadDetail = await fetchThreadDetail(latestThread.threadId);
        if (!latestThreadDetail) continue;

        // 檢查是否有新公告
        const hasNewAnnouncement = latestThread.threadId !== boardData.lastThreadId;

        // 計算當前內容哈希值
        const currentContentHash = calculateContentHash(latestThreadDetail.content);

        // 檢查是否有編輯（比較內容哈希值）
        // 只有當最新文章的內容發生變化時才認為有編輯
        const hasEdit = !hasNewAnnouncement && !!boardData.lastContentHash && currentContentHash !== boardData.lastContentHash;

        // 調試信息
        if (hasEdit) {
          new Logger('論壇檢查').info(`檢測到編輯: ${boardData.boardName}, 上次內容哈希: ${boardData.lastContentHash}, 當前內容哈希: ${currentContentHash}`);
        }

        if (hasNewAnnouncement || hasEdit) {
          // 為每個伺服器發送或編輯通知
          const guildsToRemove: string[] = [];

          for (const [guildId, guildSettings] of Object.entries(boardData.guilds)) {
            try {
              const messageId = await sendDetailedNotification(
                {
                  guildId,
                  channelId: guildSettings.channelId,
                  channelName: guildSettings.channelName,
                  guildName: guildSettings.guildName,
                  setupBy: guildSettings.setupBy,
                  setupAt: guildSettings.setupAt,
                  lastCheck: boardData.lastCheck,
                  lastThreadId: boardData.lastThreadId,
                  type: key.replace('forum_notification_', ''),
                  boardId: boardData.boardId,
                  boardName: boardData.boardName,
                  boardEmoji: boardData.boardEmoji,
                },
                latestThreadDetail,
                boardConfig,
                hasEdit,
                boardData.lastMessageId,
              );

              // 檢查是否伺服器、頻道不存在或權限不足
              if (messageId === 'GUILD_NOT_FOUND' || messageId === 'CHANNEL_NOT_FOUND' || messageId === 'NO_PERMISSION') {
                guildsToRemove.push(guildId);
                let reason: string;
                switch (messageId) {
                  case 'GUILD_NOT_FOUND':
                    reason = '伺服器不存在';
                    break;
                  case 'CHANNEL_NOT_FOUND':
                    reason = '頻道不存在';
                    break;
                  case 'NO_PERMISSION':
                    reason = '權限不足';
                    break;
                  default:
                    reason = '未知原因';
                }
                new Logger('論壇檢查').info(`將刪除伺服器 ${guildId} 的 ${boardData.boardName} 通知（${reason}）`);
                continue;
              }

              // 記錄消息ID
              if (messageId) {
                // 如果是新貼文，或者編輯但沒有記錄過消息ID，則更新lastMessageId
                if (hasNewAnnouncement || !boardData.lastMessageId) {
                  boardData.lastMessageId = messageId;
                }
                // 注意：如果是編輯且已有lastMessageId，保持原ID不變，這樣才能編輯現有消息
              }
            } catch (error) {
              new Logger('論壇檢查').error(`處理伺服器 ${guildId} 的 ${boardData.boardName} 通知時發生錯誤: ${error}`);
            }
          }

          // 刪除找不到頻道的伺服器通知
          if (guildsToRemove.length > 0) {
            for (const guildId of guildsToRemove) {
              delete boardData.guilds[guildId];
            }
          }

          // 更新最後檢查時間、線程ID和內容哈希值
          boardData.lastCheck = Date.now();
          boardData.lastThreadId = latestThread.threadId;
          boardData.lastContentHash = currentContentHash; // 記錄最新文章的內容哈希值
          await database.set(key, boardData);
        } else {
          // 更新最後檢查時間（即使沒有變化也要記錄）
          boardData.lastCheck = Date.now();
          // 只有在沒有記錄過內容哈希值時才記錄，避免頻繁更新
          if (!boardData.lastContentHash) {
            boardData.lastContentHash = currentContentHash;
            await database.set(key, boardData);
          }
        }
      } catch (error) {
        new Logger('論壇檢查').error(`檢查板塊 ${key} 更新時發生錯誤: ${error}`);
      }
    }
  } catch (error) {
    new Logger('論壇檢查').error(`檢查論壇更新時發生錯誤: ${error}`);
  }
}

// 發送詳細通知（使用新的API數據）
async function sendDetailedNotification(
  notification: NotificationSettings,
  threadDetail: ForumThreadDetail,
  boardConfig: any,
  isEdit: boolean = false,
  lastMessageId?: string,
): Promise<string | null> {
  try {
    const guild = client.guilds.cache.get(notification.guildId);
    if (!guild) {
      new Logger('論壇檢查').warn(`找不到伺服器: ${notification.guildId}，將刪除該伺服器的通知`);
      return 'GUILD_NOT_FOUND'; // 特殊返回值表示伺服器不存在
    }

    const channel = guild.channels.cache.get(notification.channelId) as TextChannel;
    if (!channel) {
      new Logger('論壇檢查').warn(`找不到頻道: ${notification.channelId} 在伺服器 ${notification.guildId}，將刪除該伺服器的通知`);
      return 'CHANNEL_NOT_FOUND'; // 特殊返回值表示頻道不存在
    }

    // 檢查機器人是否有發送訊息的權限
    if (!channel.permissionsFor(client.user!)?.has('SendMessages')) {
      new Logger('論壇檢查').warn(`機器人沒有發送訊息權限: ${channel.name} (${notification.channelId}) 在伺服器 ${notification.guildId}，將刪除該伺服器的通知`);
      return 'NO_PERMISSION'; // 特殊返回值表示權限不足
    }

    // 從內容中提取圖片，使用pictureCount
    const images = extractImagesFromContent(threadDetail.content, threadDetail.pictureCount);

    // 創建主嵌入（包含所有信息）
    const mainEmbed = new EmbedBuilder()
      .setColor(boardConfig.color || '#FF6B6B')
      .setTitle(threadDetail.title)
      .setAuthor({
        name: 'Blue Archive TW',
        url: 'https://forum.nexon.com/bluearchiveTW/main',
        iconURL: 'https://dszw1qtcnsa5e.cloudfront.net/community/20230510/dda02f80-d073-4eca-bfcd-fe9e757c1fc4/00%EC%95%84%EB%A1%9C%EB%82%98SD.gif',
      })
      .setURL(`https://forum.nexon.com/bluearchiveTW/board_view?board=${boardConfig.id}&thread=${threadDetail.threadId}`)
      .setDescription(formatContentToText(threadDetail.content))
      .setFooter({
        text: `${threadDetail.user.nickname} • ${formatTimestamp(isEdit ? threadDetail.modifyDate : threadDetail.createDate)}${isEdit ? ' [已編輯]' : ''}`,
        iconURL: threadDetail.user.profileImageUrl || 'https://forum.nexon.com/favicon.ico',
      });

    // 如果有圖片，設置第一張圖片到主嵌入
    if (images.length > 0) {
      mainEmbed.setImage(images[0]);
    }

    // 創建額外的圖片嵌入（只包含圖片和URL）
    const imageEmbeds: EmbedBuilder[] = [];
    for (let i = 1; i < images.length; i++) {
      const imageEmbed = new EmbedBuilder()
        .setColor(boardConfig.color || '#FF6B6B')
        .setImage(images[i])
        .setURL(`https://forum.nexon.com/bluearchiveTW/board_view?board=${boardConfig.id}&thread=${threadDetail.threadId}`);
      imageEmbeds.push(imageEmbed);
    }

    if (isEdit && lastMessageId) {
      // 嘗試編輯現有的消息
      try {
        const existingMessage = await channel.messages.fetch(lastMessageId);
        await existingMessage.edit({ embeds: [mainEmbed, ...imageEmbeds] });
        new Logger('論壇檢查').info(`已編輯${notification.boardName}通知到伺服器 ${notification.guildName} (${notification.guildId}) 的頻道 ${notification.channelName} (${notification.channelId})`);
        return lastMessageId; // 保持相同的消息ID
      } catch (fetchError) {
        // 如果無法找到原消息，發送新消息
        new Logger('論壇檢查').warn(`無法找到原消息 ${lastMessageId}，發送新消息`);
        const message = await channel.send({ embeds: [mainEmbed, ...imageEmbeds] });
        new Logger('論壇檢查').info(`已發送${notification.boardName}通知到伺服器 ${notification.guildName} (${notification.guildId}) 的頻道 ${notification.channelName} (${notification.channelId})`);
        return message.id;
      }
    } else {
      // 發送新消息（新貼文或編輯但沒有發送過通知）
      const message = await channel.send({ embeds: [mainEmbed, ...imageEmbeds] });
      const actionType = isEdit ? '發送編輯通知' : '發送';
      new Logger('論壇檢查').info(
        `已${actionType}${notification.boardName}通知到伺服器 ${notification.guildName} (${notification.guildId}) 的頻道 ${notification.channelName} (${notification.channelId})`,
      );
      return message.id;
    }
  } catch (error) {
    new Logger('論壇檢查').error(`發送詳細通知時發生錯誤: ${error}`);
    return null;
  }
}

// 啟動定時檢查
let checkInterval: NodeJS.Timeout | null = null;

function startForumChecker() {
  if (checkInterval) clearInterval(checkInterval);
  // 立即執行一次檢查
  checkForNewAnnouncements();

  // 設置定時檢查
  checkInterval = setInterval(checkForNewAnnouncements, CHECK_INTERVAL);

  new Logger('論壇檢查').info(`論壇檢查器已啟動，檢查間隔: ${CHECK_INTERVAL / 1000 / 60} 分鐘`);
}

function stopForumChecker() {
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
    new Logger('論壇檢查').info('論壇檢查器已停止');
  }
}

// 導出函數供其他地方使用
export { startForumChecker, stopForumChecker };
