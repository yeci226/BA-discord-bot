import { WebhookClient, EmbedBuilder } from 'discord.js';
import { client } from '@/index.js';

import Logger from '@/utilities/core/logger.js';

const webhook = process.env.ERR_WEBHOOK ? new WebhookClient({ url: process.env.ERR_WEBHOOK }) : null;

client.on('error', (error: any) => {
  new Logger('系統').error(`錯誤訊息：${error.message}`);
  if (webhook) {
    webhook.send({
      embeds: [new EmbedBuilder().setTimestamp().setDescription(`${error.message}`)],
    });
  }
});

client.on('warn', (error: any) => {
  new Logger('系統').warn(`警告訊息：${error.message}`);
});

process.on('unhandledRejection', (error: any) => {
  new Logger('系統').error(`錯誤訊息：${error.message}`);
  if (webhook) {
    webhook.send({
      embeds: [new EmbedBuilder().setTimestamp().setDescription(`${error.message}`)],
    });
  }
});

process.on('uncaughtException', console.error);
