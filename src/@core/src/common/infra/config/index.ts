import { config as readEnv } from 'dotenv';
import { join } from 'path';

type Config = {
  db: {
    dialect: any;
    host: string;
    logging: boolean;
  };
};

function makeConfig(envFilePath: string): Config {
  const output = readEnv({ path: envFilePath });

  return {
    db: {
      dialect: output.parsed.DB_DIALECT as any,
      host: output.parsed.DB_HOST,
      logging: output.parsed.DB_LOGGING === 'true'
    }
  };
}

const envTestingFilePath = join(__dirname, '../../../../.env.testing');
export const configTest = makeConfig(envTestingFilePath);
