import chalk from 'chalk';

class Logger {
  origin: string;

  constructor(origin: string) {
    this.origin = origin;
  }

  /**
   * @description 輸出資訊
   * @param {string} message - 訊息
   */
  info(message: string) {
    console.log(`${chalk.gray(new Date().toLocaleString())} ${chalk.cyan(`[${this.origin}]`)} ${message}`);
  }

  /**
   * @description 輸出指令
   * @param {string} message - 訊息
   */
  command(message: string) {
    console.log(`${chalk.gray(new Date().toLocaleString())} ${chalk.hex('#F3CCF3')(`[${this.origin}]`)} ${message}`);
  }

  /**
   * @description 輸出成功
   * @param {string} message - 訊息
   */
  success(message: string) {
    console.log(`${chalk.gray(new Date().toLocaleString())} ${chalk.green(`[${this.origin}]`)} ${message}`);
  }

  /**
   * @description 輸出警告
   * @param {string} message - 訊息
   */
  warn(message: string) {
    console.warn(`${chalk.gray(new Date().toLocaleString())} ${chalk.yellow(`[${this.origin}]`)} ${message}`);
  }

  /**
   * @description 輸出錯誤
   * @param {string} message - 訊息
   */
  error(message: string) {
    console.error(`${chalk.gray(new Date().toLocaleString())} ${chalk.red(`[${this.origin}]`)} ${message}`);
  }
}

export default Logger;
