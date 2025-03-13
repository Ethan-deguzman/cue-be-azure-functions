// config/db.js
const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST, // e.g. 'localhost' or 'ETHAN\\SQLEXPRESS'
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false, // Set to true if you're using Azure
    trustServerCertificate: true,
  },
};

// Connect once at startup
sql.connect(config)
  .then(() => {
    console.log('Connected to SQL Server!');
  })
  .catch((err) => {
    console.error('Database connection failed', err);
  });

// Export the same sql instance for queries
module.exports = sql;
