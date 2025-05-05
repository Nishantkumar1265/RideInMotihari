const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ride_in_motihari_db', 'root', '1265', {
  host: 'localhost',
  dialect: 'mysql',
 
});

module.exports = sequelize;