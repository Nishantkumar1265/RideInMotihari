const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/db');

const User = require('../user/user');
const ServiceProvider = require('../service_provider/serviceProvider');
const ServiceType = require('../servicetype/serviceType');

const Booking = sequelize.define('Booking', {
  booking_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  provider_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ServiceProvider,
      key: 'provider_id'
    }
  },
  service_type: {
    type: DataTypes.ENUM('bike', 'auto', 'car (4-seater)'),
    allowNull: false,
  },
  pickup_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  drop_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  booked_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'bookings',
  timestamps: false
});

// Set up associations
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

ServiceProvider.hasMany(Booking, { foreignKey: 'provider_id' });
Booking.belongsTo(ServiceProvider, { foreignKey: 'provider_id' });



module.exports = Booking;
