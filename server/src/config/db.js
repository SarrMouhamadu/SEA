const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'sea_user',
  password: process.env.DB_PASSWORD || 'sea_secret_password',
  database: process.env.DB_NAME || 'sea_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(conn => {
    console.log('Connecté avec succès à la base MariaDB/MySQL (sea_db)');
    conn.release();
  })
  .catch(err => {
    console.warn('Avertissement Base de données :', err.message);
    console.warn('L\'API utilisera le fallback des données locales si la base n\'est pas encore active.');
  });

module.exports = pool;
