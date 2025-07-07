export class Logger {
  static info(message: string, ...meta: any[]) {
    console.log(`[INFO] ${new Date().toISOString()} -`, message, ...meta);
  }

  static warn(message: string, ...meta: any[]) {
    console.warn(`[WARN] ${new Date().toISOString()} -`, message, ...meta);
  }

  static error(message: string, ...meta: any[]) {
    console.error(`[ERROR] ${new Date().toISOString()} -`, message, ...meta);
  }
}