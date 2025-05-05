const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/db');
const { hashPassword } = require('../../utils/password');
const isStrongPassword = require('../../utils/validatePassword');

const ServiceProvider = sequelize.define('ServiceProvider', {
    provider_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isStrong(value) {
                if (!isStrongPassword(value)) {
                    throw new Error('Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 2 digits, and 1 special character.');
                }
            }
        }
    },
    mobile_no: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]{10}$/  // Validates 10-digit mobile numbers
        }
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
        allowNull: false
    },
    registered_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'service_providers',
    timestamps: false,
    hooks: {
        beforeCreate: async (provider) => {
            if (provider.password) {
                provider.password = await hashPassword(provider.password);
            }
        },
        beforeUpdate: async (provider) => {
            if (provider.changed('password')) {
                provider.password = await hashPassword(provider.password);
            }
        }
    }
});

module.exports = ServiceProvider;
