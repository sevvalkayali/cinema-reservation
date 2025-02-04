// backend/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MSSQL_DATABASE || 'cinema_reservation',
  process.env.MSSQL_USERNAME || 'SEVVAL\Victus',
  process.env.MSSQL_PASSWORD || '',
  {
    host: process.env.MSSQL_HOST || 'SEVVAL', // Sunucu adınız, instance adını içermez
    dialect: 'mssql',
    dialectOptions: {
      options: {
        instanceName: 'SQLEXPRESS', // Named instance kullanıyorsanız belirtin
        encrypt: false,
        trustServerCertificate: true
      }
    },
    logging: false
  }
);

module.exports = sequelize;
