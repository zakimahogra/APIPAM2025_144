const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Pelanggan
 */
const Pelanggan = sequelize.define('Pelanggan', {
    id_pelanggan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    no_whatsapp: {
        type: DataTypes.STRING(15),
        allowNull: true
    }
}, {
    tableName: 'pelanggan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Pelanggan;
