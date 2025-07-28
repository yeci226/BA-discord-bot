import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

export type Account = {
  uid: number;
  cookie: string;
  nickname: string;
};

export type MessageCommand = {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  category?: string;
  cooldown?: number;
  args?: boolean;
  guildOnly?: boolean;

  /**
   * @param message - 消息
   * @param _args - 參數
   * @returns
   */
  execute: (message: Message, ..._args: string[]) => Promise<any>;
};

export type SlashCommand = {
  data: SlashCommandBuilder;

  /**
   * @param interaction - 互動實例
   * @param _args - 參數
   * @returns
   */
  execute: (interaction: ChatInputCommandInteraction, ..._args: string[]) => Promise<any>;
};
