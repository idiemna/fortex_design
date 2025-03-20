const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME || "database";
const DB_USER = process.env.DB_USER || "user";
const DB_PASS = process.env.DB_PASS || "password";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;

module.exports = {
  CLIENT_URL,
  PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
};
