const { Sequelize } = require('sequelize');

/**
 * Konfigurasi koneksi ke MySQL Database
 * Sesuai dengan kredensial yang diberikan
 */
const sequelize = new Sequelize('booking_studio', 'root', 'kikaho86', {
    host: 'localhost',
    port: 3309,
    dialect: 'mysql',
    logging: false, // Set true untuk melihat SQL queries
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

/**
 * Test koneksi database
 */
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Koneksi ke MySQL berhasil!');
        console.log('   Database: booking_studio');
        console.log('   Host: localhost:3309');
    } catch (error) {
        console.error('❌ Tidak bisa connect ke MySQL:', error.message);
        console.error('   Pastikan MySQL Server running di port 3309');
        console.error('   Username: root, Password: kikaho86');
        process.exit(1);
    }
};

module.exports = { sequelize, testConnection };
