const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYDATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: { rejectUnauthorized: true }  // optional (only if Railway enforces SSL)
  }
});

module.exports = sequelize;
