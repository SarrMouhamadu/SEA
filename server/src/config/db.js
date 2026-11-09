require('dotenv').config();

let pool = null;

function getPool() {
  if (pool) return pool;
  if (process.env.DB_ACTIVE === 'true') {
    try {
      const mysql = require('mysql2/promise');
      pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        user: process.env.DB_USER || 'sea_user',
        password: process.env.DB_PASSWORD || 'sea_secret_password',
        database: process.env.DB_NAME || 'sea_db',
        waitForConnections: false,
        connectionLimit: 5,
        connectTimeout: 1000
      });
      return pool;
    } catch (err) {
      console.warn('[DB] MySQL non disponible:', err.message);
    }
  }
  return null;
}

const safePool = {
  async query(...args) {
    const p = getPool();
    if (!p) throw new Error('MySQL non actif');
    return p.query(...args);
  },
  async getConnection() {
    const p = getPool();
    if (!p) throw new Error('MySQL non actif');
    return p.getConnection();
  }
};

module.exports = safePool;
