const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Pelanggan = require('../models/Pelanggan');

/**
 * POST /api/pelanggan/login
 * Login untuk Pelanggan
 */
router.post('/pelanggan/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const pelanggan = await Pelanggan.findOne({
            where: { username, password }
        });

        if (pelanggan) {
            res.json({
                success: true,
                message: 'Login berhasil',
                data: {
                    id_pelanggan: pelanggan.id_pelanggan,
                    username: pelanggan.username,
                    password: pelanggan.password,
                    no_whatsapp: pelanggan.no_whatsapp
                }
            });
        } else {
            res.json({
                success: false,
                message: 'Username atau password salah',
                data: null
            });
        }
    } catch (error) {
        console.error('Error login pelanggan:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            data: null
        });
    }
});

/**
 * POST /api/admin/login
 * Login untuk Admin
 */
router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({
            where: { username, password }
        });

        if (admin) {
            res.json({
                success: true,
                message: 'Login berhasil',
                data: {
                    admin_id: admin.admin_id,
                    username: admin.username,
                    password: admin.password
                }
            });
        } else {
            res.json({
                success: false,
                message: 'Username atau password salah',
                data: null
            });
        }
    } catch (error) {
        console.error('Error login admin:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            data: null
        });
    }
});

/**
 * POST /api/pelanggan/register
 * Registrasi Pelanggan baru
 */
router.post('/pelanggan/register', async (req, res) => {
    try {
        const { username, password, no_whatsapp } = req.body;

        // Cek apakah username sudah ada
        const existing = await Pelanggan.findOne({ where: { username } });

        if (existing) {
            return res.json({
                success: false,
                message: 'Username sudah terdaftar'
            });
        }

        // Buat pelanggan baru (no_whatsapp optional, default null)
        const newPelanggan = await Pelanggan.create({
            username,
            password,
            no_whatsapp: no_whatsapp || ""
        });

        res.json({
            success: true,
            message: 'Registrasi berhasil'
        });
    } catch (error) {
        console.error('ROUTE ERROR registrasi:', error);
        res.status(500).json({
            success: false,
            message: 'DEBUG: Terjadi kesalahan server di ROUTE: ' + error.message,
            error: error
        });
    }
});

module.exports = router;
