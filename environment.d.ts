declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: number;
      API_HOSTNAME?: string;
      API_PORT?: number;
      DB_HOST?: string;
      DB_PORT?: number;
      DB_DATABASE?: string;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }