const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Paket
 */
const Paket = sequelize.define('Paket', {
    id_paket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_paket: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    harga: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    durasi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Durasi dalam menit'
    }
}, {
    tableName: 'paket',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Paket;
