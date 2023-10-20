import { config as readEnv } from 'dotenv';
import { join } from 'path';

export class Config {
  private static env: any = null;
  public static db() {
    if (!this.env) {
      Config.readEnv();
    }
    return {
      dialect: this.env.DB_DIALECT,
      host: this.env.DB_HOST,
      logging: this.env.DB_LOGGING,
    };
  }

  private static readEnv() {
    const envFilePath = join(
      __dirname,
      `../../../../envs/.env.${process.env.NODE_ENV}`,
    );
    Config.env = readEnv({ path: envFilePath }).parsed;
  }
}
