const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/db');
const User = require('../user/user.js');
const ServiceProvider = require('../service_provider/serviceProvider.js');

const Auth = sequelize.define("auth", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  provider_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
    token: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  tableName: 'auth'
});

// ✅ Relationship with User
Auth.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  User.hasMany(Auth, {
    foreignKey: 'user_id'
  });

// ✅ Relationship with provider
Auth.belongsTo(ServiceProvider, {
    foreignKey: 'provider_id',
    onDelete: 'CASCADE'
  });
  User.hasMany(Auth, {
    foreignKey: 'provider_id'
  });

module.exports= Auth;

