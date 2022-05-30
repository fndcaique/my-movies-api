import { Client } from 'pg';

class PostgreClient extends Client {
  static createPostgreClient() {
    const client = new PostgreClient({
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
    return client;
  }

  beginTransaction() {
    return this.query('BEGIN');
  }

  commit() {
    return this.query('COMMIT');
  }

  rollback() {
    return this.query('ROLLBACK');
  }
}

export default PostgreClient;
