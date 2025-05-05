const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/db');
const ServiceProvider = require('../service_provider/serviceProvider');

const ServiceType = sequelize.define('ServiceType', {
  service_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  provider_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ServiceProvider,
      key: 'provider_id'
    },
    onDelete: 'CASCADE'
  },
  service_type: {
    type: DataTypes.ENUM('bike', 'auto', 'car (4-seater)'),
    allowNull: false
  },
  company_name: { // Fixed typo here
    type: DataTypes.STRING,
    allowNull: false
  },
  model_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'service_types',
  timestamps: false
});

// Define relationships
ServiceProvider.hasMany(ServiceType, { foreignKey: 'provider_id' });
ServiceType.belongsTo(ServiceProvider, { foreignKey: 'provider_id' });

module.exports = ServiceType;
