import { join, extname } from 'path';
import { readdir } from 'fs/promises';
import { EmbedBuilder, MessageFlags, ChatInputCommandInteraction, InteractionReplyOptions, ColorResolvable, Interaction, AutocompleteInteraction, Locale } from 'discord.js';

/**
 * @description 獲取指定目錄下的所有 .js 文件
 * @param dir - 目錄路徑
 * @param exts - 可接受的文件擴展名
 * @returns 所有 .js 文件的路徑
 */
export async function getAllFiles(dir: string, exts: string[]) {
  let files: string[] = [];

  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await getAllFiles(fullPath, exts));
    } else if (exts.includes(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * @description 獲取用戶的語言
 * @param userId - 用戶 ID
 * @param database - 資料庫實例
 * @returns 用戶的語言 (Hoyolab)
 */
export async function getUserLang(userId: string, database: any) {
  const locale = await database.get(`${userId}.locale`);
  return locale ?? null;
}

/**
 * @description 獲取一個隨機顏色
 * @returns 隨機顏色
 */
export function getRandomColor(): ColorResolvable {
  const letters = '0123456789ABCDEF';

  let color = '#';
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * letters.length) % letters.length;
    color += letters[index];
  }

  const isValidHex = /^#[0-9A-F]{6}$/i.test(color);
  if (!isValidHex) return '#000000';

  return color as ColorResolvable;
}

/**
 * @description 繪製在隊列中的回復
 * @param interaction - 交互
 * @param title - 標題
 */
export async function drawInQueueReply(interaction: Interaction, title = '') {
  if (interaction instanceof ChatInputCommandInteraction) {
    interaction.editReply({
      embeds: [new EmbedBuilder().setTitle(title).setThumbnail('https://media.tenor.com/ChVfzwizTxQAAAAj/arona-kururu.gif')],
      // fetchReply: true,
    });
  }
}

/**
 * @description 繪製失敗的回復
 * @param interaction - 交互
 * @param title - 標題
 * @param description - 描述
 */
export async function failedReply(interaction: Interaction, title: string, description?: string, footer?: string) {
  const embed = new EmbedBuilder().setTitle(title).setColor('#E76161');
  if (description) embed.setDescription(description);
  if (footer) embed.setFooter({ text: footer });

  return replyOrfollowUp(interaction, {
    embeds: [embed],
    flags: MessageFlags.Ephemeral,
    withResponse: true,
  });
}

/**
 * @description 獲取用戶的語言
 * @param userId - 用戶 ID
 * @param userDiscordLocale - 用戶 Discord 語言
 */
// export function discordToHoyolabLang(discordLocale: Locale) {
//   const convertSheet: Record<Locale, LanguageEnum> = {
//     [Locale.ChineseTW]: LanguageEnum.TRADIIONAL_CHINESE,
//     [Locale.ChineseCN]: LanguageEnum.SIMPLIFIED_CHINESE,
//     [Locale.Vietnamese]: LanguageEnum.VIETNAMESE,
//     [Locale.Japanese]: LanguageEnum.JAPANESE,
//     [Locale.Korean]: LanguageEnum.KOREAN,
//     [Locale.French]: LanguageEnum.FRENCH,
//     [Locale.EnglishUS]: LanguageEnum.ENGLISH,
//     [Locale.EnglishGB]: LanguageEnum.ENGLISH,
//     [Locale.Bulgarian]: LanguageEnum.ENGLISH,
//     [Locale.Czech]: LanguageEnum.ENGLISH,
//     [Locale.Danish]: LanguageEnum.ENGLISH,
//     [Locale.Dutch]: LanguageEnum.ENGLISH,
//     [Locale.Finnish]: LanguageEnum.ENGLISH,
//     [Locale.Croatian]: LanguageEnum.ENGLISH,
//     [Locale.German]: LanguageEnum.GERMAN,
//     [Locale.Greek]: LanguageEnum.ENGLISH,
//     [Locale.Hindi]: LanguageEnum.ENGLISH,
//     [Locale.Hungarian]: LanguageEnum.ENGLISH,
//     [Locale.Italian]: LanguageEnum.ITALIAN,
//     [Locale.Lithuanian]: LanguageEnum.ENGLISH,
//     [Locale.Norwegian]: LanguageEnum.ENGLISH,
//     [Locale.Polish]: LanguageEnum.ENGLISH,
//     [Locale.PortugueseBR]: LanguageEnum.PORTUGUESE,
//     [Locale.Romanian]: LanguageEnum.ENGLISH,
//     [Locale.Russian]: LanguageEnum.RUSSIAN,
//     [Locale.SpanishES]: LanguageEnum.SPANISH,
//     [Locale.SpanishLATAM]: LanguageEnum.SPANISH,
//     [Locale.Swedish]: LanguageEnum.ENGLISH,
//     [Locale.Thai]: LanguageEnum.THAI,
//     [Locale.Turkish]: LanguageEnum.TURKISH,
//     [Locale.Ukrainian]: LanguageEnum.ENGLISH,
//     [Locale.Indonesian]: LanguageEnum.INDONESIAN,
//   };

//   return convertSheet[discordLocale];
// }

/**
 * @description 設置用戶的默認語言
 * @param userId - 用戶 ID
 * @param locale - 用戶語言 (Hoyolab)
 */
// export async function setupDefaultLang(userId: string, locale: LanguageEnum) {
//   await database.set(`${userId}.locale`, locale);
//   return locale;
// }

/**
 * @description 回復或追隨交互
 * @param interaction - 交互
 * @param options - 選項
 * @returns 回復或追隨
 */
const replyOrfollowUp = async (interaction: Interaction, options: InteractionReplyOptions) => {
  if (interaction instanceof AutocompleteInteraction) return;
  if (interaction.replied) {
    return interaction.editReply({
      embeds: options.embeds,
      components: options.components,
    });
  }
  if (interaction.deferred) {
    return interaction.followUp(options);
  }
  return interaction.reply(options);
};
