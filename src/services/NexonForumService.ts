import {
  TextChannel,
  NewsChannel,
  ContainerBuilder,
  SectionBuilder,
  TextDisplayBuilder,
  ThumbnailBuilder,
  SeparatorBuilder,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  MessageFlags,
  Client,
  Message,
} from 'discord.js';
import axios from 'axios';
import crypto from 'crypto';
import { database } from '@/index.js';
import Logger from '@/utilities/core/logger.js';
import * as cheerio from 'cheerio';

// 板塊配置
export const FORUM_BOARDS = {
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

const CHECK_INTERVAL = 5 * 60 * 1000;

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

interface NotificationBoardData {
  guilds: {
    [guildId: string]: {
      channelId: string;
      channelName: string;
      guildName: string;
      setupBy: string;
      setupAt: number;
      lastMessageId?: string;
    };
  };
  boardId: string;
  boardName: string;
  boardEmoji: string;
  lastCheck: number;
  lastThreadId: string | null;
  lastModifyDate?: number;
  lastContentHash?: string;
}

export class NexonForumService {
  private client: Client;
  private interval: NodeJS.Timeout | null = null;
  private logger: Logger;

  constructor(client: Client) {
    this.client = client;
    this.logger = new Logger('NexonForum');
  }

  public start() {
    this.logger.info('Nexon Forum Service Started');
    this.manualCheckNews();
    this.interval = setInterval(() => this.manualCheckNews(), CHECK_INTERVAL);
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  public async manualCheckNews() {
    try {
      const allKeys = await database.all();
      const notificationKeys = allKeys.filter((item: any) => item.id && item.id.startsWith('forum_notification_')).map((item: any) => item.id);

      if (notificationKeys.length === 0) return;

      for (const key of notificationKeys) {
        await this.checkBoard(key);
      }
    } catch (error: any) {
      this.logger.error(`Error checking forum news: ${error.message}`);
    }
  }

  private async checkBoard(key: string) {
    try {
      const boardData = (await database.get(key)) as NotificationBoardData;
      if (!boardData || !boardData.boardId) return;

      const boardConfig = Object.values(FORUM_BOARDS).find((board) => board.id === boardData.boardId);
      if (!boardConfig) return;

      const forumThreads = await this.fetchForumData(boardConfig.url);
      if (forumThreads.length === 0) return;

      const latestThread = forumThreads[0];

      if (!boardData.lastThreadId) {
        boardData.lastCheck = Date.now();
        boardData.lastThreadId = latestThread.threadId;
        await database.set(key, boardData);
        return;
      }

      const latestThreadDetail = await this.fetchThreadDetail(latestThread.threadId);
      if (!latestThreadDetail) return;

      const currentContentHash = this.calculateContentHash(latestThreadDetail.content);
      const isNew = latestThread.threadId !== boardData.lastThreadId;
      const isEdit = !isNew && !!boardData.lastContentHash && currentContentHash !== boardData.lastContentHash;

      if (isNew || isEdit) {
        if (isEdit) {
          this.logger.info(`Detected edit: ${boardData.boardName} (${latestThread.threadId})`);
        } else {
          this.logger.info(`Detected new post: ${boardData.boardName} (${latestThread.threadId})`);
        }

        for (const [guildId, guildSettings] of Object.entries(boardData.guilds)) {
          try {
            const result = await this.dispatch(guildId, guildSettings.channelId, latestThreadDetail, boardConfig, isEdit, guildSettings.lastMessageId);

            if (result.success && result.messageId) {
              guildSettings.lastMessageId = result.messageId;
            }
          } catch (e) {
            this.logger.error(`Dispatch failed for guild ${guildId}: ${e}`);
          }
        }

        boardData.lastCheck = Date.now();
        boardData.lastThreadId = latestThread.threadId;
        boardData.lastContentHash = currentContentHash;
        await database.set(key, boardData);
      } else {
        boardData.lastCheck = Date.now();
        if (!boardData.lastContentHash) {
          boardData.lastContentHash = currentContentHash;
        }
        await database.set(key, boardData);
      }
    } catch (error) {
      this.logger.error(`Failed to check board ${key}: ${error}`);
    }
  }

  private async dispatch(guildId: string, channelId: string, thread: ForumThreadDetail, boardConfig: any, isEdit: boolean, lastMessageId?: string): Promise<{ success: boolean; messageId?: string }> {
    try {
      const channel = (await this.client.channels.fetch(channelId)) as TextChannel | NewsChannel;
      if (!channel) return { success: false };

      const payload = this.buildPayload(thread, boardConfig);
      let message: Message | null = null;

      if (isEdit && lastMessageId) {
        try {
          message = await channel.messages.fetch(lastMessageId);
          if (message) {
            await message.edit(payload);
            this.logger.success(`Updated ${boardConfig.name} in ${channel.name}`);
          }
        } catch (e) {
          this.logger.warn(`Could not edit message in ${channel.name}, sending new one.`);
        }
      }

      if (!message) {
        message = await channel.send(payload);
        this.logger.success(`Sent ${boardConfig.name} to ${channel.name}`);
      }

      return { success: true, messageId: message?.id };
    } catch (e) {
      this.logger.error(`Failed to send/edit in channel ${channelId}: ${e}`);
      return { success: false };
    }
  }

  private buildPayload(thread: ForumThreadDetail, boardConfig: any): any {
    const container = new ContainerBuilder();

    const date = `<t:${thread.createDate}:f>`;
    const link = `https://forum.nexon.com/bluearchiveTW/board_view?board=${boardConfig.id}&thread=${thread.threadId}`;

    const $ = cheerio.load(thread.title);
    const decodedTitle = $.text();

    const headerContent = `### [${decodedTitle}](${link})\n-# ${thread.user.nickname} • ${date}`;
    const textDisplayHelper = new TextDisplayBuilder().setContent(headerContent);

    if (thread.user.profileImageUrl) {
      const headerSection = new SectionBuilder().addTextDisplayComponents(textDisplayHelper).setThumbnailAccessory(new ThumbnailBuilder({ media: { url: thread.user.profileImageUrl } }));
      container.addSectionComponents(headerSection);
    } else {
      container.addTextDisplayComponents(textDisplayHelper);
    }

    container.addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(2));

    const elements = this.parseContent(thread.content);

    let currentLength = 0;
    const MAX_LENGTH = 3900;
    let isTruncated = false;

    let textBuffer = '';
    let imageBuffer: string[] = [];

    const flushText = () => {
      if (textBuffer.trim()) {
        if (currentLength >= MAX_LENGTH) {
          textBuffer = '';
          return;
        }

        let toAdd = textBuffer;
        if (currentLength + toAdd.length > MAX_LENGTH) {
          toAdd = toAdd.substring(0, MAX_LENGTH - currentLength);
          isTruncated = true;
        }

        if (toAdd.trim()) {
          container.addTextDisplayComponents(new TextDisplayBuilder().setContent(toAdd));
          currentLength += toAdd.length;
        }
        textBuffer = '';
      }
    };

    const flushImages = () => {
      if (imageBuffer.length > 0) {
        while (imageBuffer.length > 0) {
          if (isTruncated) break; // Don't add images if text already truncated? Or allow?
          // Usually if text is truncated we might still want images if space allows?
          // But simpler to stop.

          const batch = imageBuffer.splice(0, 4);
          const mediaGallery = new MediaGalleryBuilder();
          batch.forEach((url) => mediaGallery.addItems(new MediaGalleryItemBuilder({ media: { url } })));
          container.addMediaGalleryComponents(mediaGallery);
        }
      }
    };

    for (const el of elements) {
      if (isTruncated || currentLength >= MAX_LENGTH) {
        isTruncated = true;
        break;
      }

      if (el.type === 'text') {
        flushImages();
        textBuffer += el.content;
      } else if (el.type === 'image') {
        flushText();
        if (isTruncated) break;
        imageBuffer.push(el.content);
      }
    }
    flushText();
    flushImages();

    if (isTruncated) {
      const remaining = MAX_LENGTH - currentLength;
      const footer = `\n... [Read Full Article](${link})`;
      if (remaining >= footer.length) {
        container.addTextDisplayComponents(new TextDisplayBuilder().setContent(footer));
      }
    }

    return {
      content: '',
      flags: MessageFlags.IsComponentsV2,
      components: [container],
    };
  }

  private parseContent(html: string): Array<{ type: 'text' | 'image'; content: string }> {
    const $ = cheerio.load(html);
    const elements: Array<{ type: 'text' | 'image'; content: string }> = [];

    const processNode = (node: any) => {
      if (node.type === 'text') {
        const text = node.data;
        if (text) elements.push({ type: 'text', content: text });
      } else if (node.type === 'tag') {
        const tagName = node.name;

        if (tagName === 'img') {
          const src = node.attribs.src;
          if (src && !src.startsWith('data:')) {
            elements.push({ type: 'image', content: src });
          }
          return;
        }

        if (tagName === 'br') {
          elements.push({ type: 'text', content: '\n' });
          return;
        }

        // Handle containers that need specific wrapping logic
        if (['b', 'strong', 'i', 'em', 'u', 's', 'strike', 'code'].includes(tagName)) {
          // Flatten children first to get text content
          const childElements: Array<{ type: 'text' | 'image'; content: string }> = [];

          // Helper to collect children
          const collectChildren = (parentNode: any, targetArray: any[]) => {
            parentNode.children.forEach((child: any) => {
              if (child.type === 'text') {
                if (child.data) targetArray.push({ type: 'text', content: child.data });
              } else if (child.type === 'tag') {
                // Recurse for nested tags inside formatting?
                // For simplicity, we process them but we might lose nested formatting if we are not careful.
                // Let's just recursively call processNode but capture output?
                // No, current processNode pushes to global 'elements'.
                // We need a way to capture output of children.

                // NOTE: To fix " ** text ** " -> " **text** ", we need to know the bounds of the text content.
                // If we have mixed content (text + image), it complicates things.
                // If we have "<b>bold <img /> text</b>", we probably shouldn't trim across the image.

                // Simplified strategy:
                // 1. Just push the opening tag (maybe with a marker?)
                // 2. Process children
                // 3. Push closing tag
                // BUT the requirement is to handle the spaces.

                // Alternative: Post-process the elements array?
                // No, let's treat formatting tags as text wrappers only if they contain text.

                // Let's go back to a simpler "streaming" approach but be smarter about spaces.
                // It is hard to "trim" in a stream without buffering.

                processNode(child);
              }
            });
          };

          // If we stick to the original "streaming" approach but just fix the "prefix/suffix":
          // The issue is `<b> text </b>` -> `** text **`.
          // We want `**text**` or ` **text** `.
          // Discord doesn't like `** text **`. It likes `**text**`.

          // Let's try attempting to trim the immediate text children if simple?
          // Or just outputting without spaces?

          // Let's change the strategy:
          // 1. Capture text content of this node.
          // 2. Trim it.
          // 3. If empty, ignore.
          // 4. If not empty, wrap in `**`.
          // PROBLEM: This ignores images or nested formatting inside.

          // Better Strategy (Buffer):
          // 1. Temporarily swap `elements` array.
          // 2. Process children into temp array.
          // 3. Check temp array content.
          // 4. If meaningful content exists, wrap and push to main.

          const tempElements: Array<{ type: 'text' | 'image'; content: string }> = [];
          const originalElements = elements; // ref to current global valid
          // We can't easily swap the captured 'elements' closure var.
          // Refactor to pass array?
        }

        // --- REFACTORING TO PASS LIST ---
        // Since I can't easily change the recursive structure inline without major rewrite,
        // I will do a slightly different approach:
        // Use a "Context" object or just pass the array.
      }
    };

    // --- ACTUAL IMPLEMENTATION ---
    const collect = (node: any, target: Array<{ type: 'text' | 'image'; content: string }>) => {
      if (node.type === 'text') {
        const text = node.data;
        if (text) target.push({ type: 'text', content: text });
      } else if (node.type === 'tag') {
        const tagName = node.name;

        if (tagName === 'img') {
          const src = node.attribs.src;
          if (src && !src.startsWith('data:')) {
            target.push({ type: 'image', content: src });
          }
          return;
        }
        if (tagName === 'br') {
          target.push({ type: 'text', content: '\n' });
          return;
        }

        // Formatting wrappers
        const formatMap: { [key: string]: string } = {
          b: '**',
          strong: '**',
          i: '*',
          em: '*',
          u: '__',
          s: '~~',
          strike: '~~',
          code: '`',
        };

        if (formatMap[tagName]) {
          const wrapper = formatMap[tagName];
          const childContent: Array<{ type: 'text' | 'image'; content: string }> = []; // Buffer

          node.children.forEach((c: any) => collect(c, childContent));

          // Analyze childContent to determine how to wrap
          // We want to effectively trim the *text* at the edges of the buffer.
          // e.g. [ "  foo  ", IMG, "  bar  " ] -> [ "**foo**", "  ", IMG, "  ", "**bar**" ] ?? No that's too complex.
          // Simple case: [ "  foo  " ] -> [ "  ", "**foo**", "  " ] ?
          // Discord Markdown: `** foo **` is invalid. `foo **bar** baz` is valid.
          // We want to move whitespace OUTSIDE the wrapper.

          if (childContent.length === 0) return; // Empty tag -> drop

          // Helper to trim text nodes at edges
          let startWs = '';
          let endWs = '';

          if (childContent.length > 0 && childContent[0].type === 'text') {
            const first = childContent[0];
            const trimmedStart = first.content.trimStart();
            if (trimmedStart.length < first.content.length) {
              startWs = first.content.substring(0, first.content.length - trimmedStart.length);
              first.content = trimmedStart;
            }
          }

          if (childContent.length > 0 && childContent[childContent.length - 1].type === 'text') {
            const last = childContent[childContent.length - 1];
            const trimmedEnd = last.content.trimEnd();
            if (trimmedEnd.length < last.content.length) {
              endWs = last.content.substring(trimmedEnd.length);
              last.content = trimmedEnd;
            }
          }

          // Check if purely empty after trimming?
          const isEmpty = childContent.every((c) => c.type === 'text' && !c.content);
          if (isEmpty) return; // Drop empty formatting

          if (startWs) target.push({ type: 'text', content: startWs });
          target.push({ type: 'text', content: wrapper });
          childContent.forEach((c) => target.push(c));
          target.push({ type: 'text', content: wrapper });
          if (endWs) target.push({ type: 'text', content: endWs });

          return;
        }

        // Block Elements
        let prefix = '';
        let suffix = '';

        if (tagName === 'p') {
          suffix = '\n\n';
        } else if (tagName === 'div') {
          suffix = '\n';
        } else if (['h1', 'h2', 'h3'].includes(tagName)) {
          prefix = '### ';
          suffix = '\n';
        } else if (tagName === 'li') {
          prefix = '• ';
          suffix = '\n';
        } else if (tagName === 'blockquote') {
          prefix = '> ';
          suffix = '\n';
        } else if (tagName === 'hr') {
          target.push({ type: 'text', content: '\n---\n' });
          return;
        } else if (tagName === 'tr') {
          suffix = '\n';
        } else if (tagName === 'th' || tagName === 'td') {
          suffix = ' '; // Spacer for table cells
        }

        if (prefix) target.push({ type: 'text', content: prefix });

        if (tagName === 'a') {
          const href = node.attribs.href;
          target.push({ type: 'text', content: '[' });
          node.children.forEach((child: any) => collect(child, target));
          target.push({ type: 'text', content: `](${href})` });
          return;
        }

        node.children.forEach((child: any) => collect(child, target));
        if (suffix) target.push({ type: 'text', content: suffix });
      }
    };

    $('body')
      .contents()
      .each((i, el) => collect(el, elements));

    const merged: Array<{ type: 'text' | 'image'; content: string }> = [];
    let currentText = '';

    for (const el of elements) {
      if (el.type === 'text') {
        currentText += el.content;
      } else {
        if (currentText) {
          merged.push({ type: 'text', content: currentText });
          currentText = '';
        }
        merged.push(el);
      }
    }
    if (currentText) merged.push({ type: 'text', content: currentText });

    return merged
      .map((item) => {
        if (item.type === 'text') {
          let t = item.content.replace(/&nbsp;/g, ' ').replace(/\n{3,}/g, '\n\n');

          // Don't fully trim as it removes intentional spaces
          if (!t.trim()) return null; // Remove empty blocks
          return { ...item, content: t };
        }
        return item;
      })
      .filter(Boolean) as any;
  }

  private async fetchForumData(boardUrl: string): Promise<ForumThread[]> {
    try {
      const response = await axios.get<{ stickyThreads: ForumThread[] }>(boardUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        },
      });
      return response.data.stickyThreads || [];
    } catch (error) {
      return [];
    }
  }

  private async fetchThreadDetail(threadId: string): Promise<ForumThreadDetail | null> {
    try {
      const response = await axios.get<ForumThreadDetail>(`https://forum.nexon.com/api/v1/thread/${threadId}?alias=bluearchivetw`, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        },
      });
      return response.data;
    } catch (e) {
      return null;
    }
  }

  private calculateContentHash(content: string): string {
    const cleanContent = content.replace(/\s+/g, '').toLowerCase();
    return crypto.createHash('md5').update(cleanContent).digest('hex');
  }
}
