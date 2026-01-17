const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Pelanggan = require('./Pelanggan');
const Paket = require('./Paket');

/**
 * Model Reservasi
 */
const Reservasi = sequelize.define('Reservasi', {
    id_reservasi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pelanggan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pelanggan',
            key: 'id_pelanggan'
        }
    },
    id_paket: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'paket',
            key: 'id_paket'
        }
    },
    nama_pelanggan: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tanggal: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    jam: {
        type: DataTypes.TIME,
        allowNull: false
    },
    jumlah_orang: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pilihan_background: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    no_whatsapp: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    metode_pembayaran: {
        type: DataTypes.ENUM('Cash', 'QRIS'),
        allowNull: false
    },
    status_reservasi: {
        type: DataTypes.ENUM('Menunggu', 'Dikonfirmasi', 'Selesai', 'Dibatalkan'),
        defaultValue: 'Menunggu'
    }
}, {
    tableName: 'reservasi',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define associations
Reservasi.belongsTo(Pelanggan, { foreignKey: 'id_pelanggan' });
Reservasi.belongsTo(Paket, { foreignKey: 'id_paket' });

module.exports = Reservasi;
