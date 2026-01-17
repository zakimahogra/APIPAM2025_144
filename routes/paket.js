const express = require('express');
const router = express.Router();
const Paket = require('../models/Paket');

/**
 * GET /api/paket
 * Get semua paket yang tersedia
 */
router.get('/', async (req, res) => {
    try {
        const paketList = await Paket.findAll({
            order: [['id_paket', 'ASC']]
        });

        res.json({
            success: true,
            message: 'Data paket berhasil diambil',
            data: paketList
        });
    } catch (error) {
        console.error('Error get paket:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            data: []
        });
    }
});

module.exports = router;
