const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYDATABASE_URL);

module.exports = sequelize;
