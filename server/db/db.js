require('dotenv').config();
const mysql = require('mysql2');

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
};

module.exports = {
  getConnection: () => mysql.createConnection(config)
};
