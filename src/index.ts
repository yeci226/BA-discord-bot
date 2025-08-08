import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

import { Client, GatewayIntentBits, Partials, Collection, ApplicationCommandType } from 'discord.js';
import { ClusterClient, getInfo } from 'discord-hybrid-sharding';
import { QuickDB } from 'quick.db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Types
import type { MessageCommand, SlashCommand } from '@/types';

// Utilities
import { getAllFiles } from '@/utilities/index.js';
import Logger from '@/utilities/core/logger.js';
import { preloadCommonData } from '@/utilities/ba/index.js';

/**
 * @description Discord 客戶端
 */
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
  allowedMentions: {
    parse: ['users'],
    repliedUser: false,
  },
  shards: getInfo().SHARD_LIST,
  shardCount: getInfo().TOTAL_SHARDS,
});

/**
 * @description 集群客戶端
 */
const cluster = new ClusterClient(client);

/**
 * @description 資料庫
 */
const database = new QuickDB();

/**
 * @description 指令集合
 */
const commands = {
  slash: new Collection<string, SlashCommand>(),
  message: new Collection<string, MessageCommand>(),
};

/**
 * @description 獲取訊息指令
 * @param paths - 訊息指令檔案路徑
 * @returns 訊息指令
 */
async function getMessageCommands(paths: string[]) {
  const result: any[] = [];

  for (let path of paths) {
    const fileUrl = `file://${path}`;
    const file = (await import(fileUrl))?.default;
    const splitted = path.split('/');
    const folder = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { folder, ...file };
      commands.message.set(file.name, properties);
      result.push(file);
    }
  }

  return result;
}

/**
 * @description 獲取斜線指令
 * @param paths - 斜線指令檔案路徑
 * @returns 斜線指令
 */
async function getSlashCommands(paths: string[]) {
  const result: any[] = [];

  for (let path of paths) {
    const fileUrl = `file://${path}`;
    const file = (await import(fileUrl))?.default;

    if (file.data && file.execute) {
      commands.slash.set(file.data.name, file);
    } else {
      new Logger('系統').error(`${path} 處的指令缺少必要的「資料」或「執行」屬性`);
      continue;
    }

    if (file.type === ApplicationCommandType.Message || file.type === ApplicationCommandType.User) {
      delete file.description;
    }

    result.push(file.data);
  }

  return result;
}

/**
 * @description 綁定事件
 * @param paths - 事件檔案路徑
 */
async function bindEvents(paths: string[]) {
  for (let path of paths) {
    const fileUrl = `file://${path}`;
    await import(fileUrl);
  }
}

/**
 * @description 載入指令
 */
export async function load() {
  // 初始化數據庫
  try {
    await database.init();
    new Logger('系統').success('數據庫初始化完成');
  } catch (error) {
    new Logger('系統').error(`數據庫初始化失敗: ${error}`);
  }

  // 斜線指令
  const slashCommandPaths = await getAllFiles(`${__dirname}/commands/slash`, ['.js']);
  const slashCommands = await getSlashCommands(slashCommandPaths);

  // 事件
  const eventPaths = await getAllFiles(`${__dirname}/events`, ['.js']);
  await bindEvents(eventPaths);

  new Logger('系統').success(`已載入 ${eventPaths.length} 事件、${slashCommands.length} 斜線指令`);

  client.on('ready', async () => {
    await client.application?.commands.set(slashCommands);

    // 預加載常用數據
    try {
      await preloadCommonData();
      new Logger('系統').success('常用數據預加載完成');
    } catch (error) {
      new Logger('系統').error(`預加載數據失敗: ${error}`);
    }
  });
}

client.login(process.env.NODE_ENV === 'dev' ? process.env.TEST_TOKEN : process.env.TOKEN);

load();

export { client, database, cluster, commands };
