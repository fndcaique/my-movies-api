import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const PORT = process.env.API_PORT || 4000;

const HOSTNAME = process.env.API_HOSTNAME || 'http://localhost';

const app = express();

app.all('/', (req, res) => {
  res.json({ message: 'Welcome to the fnd-store-api' });
});

app.listen(
  PORT,
  () => console.log(`API rodando com sucesso em ${HOSTNAME}:${PORT}`),
);
