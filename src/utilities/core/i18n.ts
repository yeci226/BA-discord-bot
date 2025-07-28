import tw from '@/languages/tw.js';

const langs: { [key: string]: Record<string, string> } = {
  tw: tw,
};

/**
 * @description 創建翻譯器
 * @param lang - 語言
 * @returns 翻譯器
 */
export function createTranslator(lang: string) {
  if (!Object.keys(langs).includes(lang)) {
    lang = 'tw';
    // throw new Error('No lang specified found!');
  }

  return function i18n(string: string, options?: Record<string, string>, ...args: any[]): string {
    let str = langs[lang][string] ?? langs['tw'][string];
    if (!str) return string;
    if (options) for (let [key, value] of Object.entries(options)) str = str.replace(`<${key}>`, `${value}`);
    if (args) for (let [index, value] of Object.entries(args)) str = str.replace(`%${index}%`, `${value}`);
    return str;
  };
}
