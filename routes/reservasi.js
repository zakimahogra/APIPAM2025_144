const express = require('express');
const router = express.Router();
const Reservasi = require('../models/Reservasi');
const Paket = require('../models/Paket');
const Pelanggan = require('../models/Pelanggan');

/**
 * POST /api/reservasi
 * Buat booking baru
 */
router.post('/', async (req, res) => {
    try {
        const {
            id_pelanggan,
            id_paket,
            nama_pelanggan,
            tanggal,
            jam,
            jumlah_orang,
            pilihan_background,
            no_whatsapp,
            metode_pembayaran
        } = req.body;

        const newReservasi = await Reservasi.create({
            id_pelanggan,
            id_paket,
            nama_pelanggan,
            tanggal,
            jam,
            jumlah_orang,
            pilihan_background,
            no_whatsapp,
            metode_pembayaran,
            status_reservasi: 'Menunggu'
        });

        // Get paket info
        const paket = await Paket.findByPk(id_paket);

        const responseData = {
            id_reservasi: newReservasi.id_reservasi,
            id_pelanggan: newReservasi.id_pelanggan,
            id_paket: newReservasi.id_paket,
            nama_pelanggan: newReservasi.nama_pelanggan,
            nama_paket: paket ? paket.nama_paket : '',
            harga: paket ? paket.harga : 0,
            tanggal: newReservasi.tanggal,
            jam: newReservasi.jam,
            jumlah_orang: newReservasi.jumlah_orang,
            pilihan_background: newReservasi.pilihan_background,
            no_whatsapp: newReservasi.no_whatsapp,
            metode_pembayaran: newReservasi.metode_pembayaran,
            status_reservasi: newReservasi.status_reservasi
        };

        res.json({
            success: true,
            message: 'Booking berhasil dibuat',
            data: responseData
        });
    } catch (error) {
        console.error('Error create booking:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            data: null
        });
    }
});

/**
 * GET /api/reservasi
 * Get semua booking (untuk Admin)
 */
router.get('/', async (req, res) => {
    try {
        const reservasiList = await Reservasi.findAll({
            include: [
                {
                    model: Paket,
                    attributes: ['nama_paket', 'harga', 'durasi']
                },
                {
                    model: Pelanggan,
                    attributes: ['username']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        // Format response
        const formattedData = reservasiList.map(r => ({
            id_reservasi: r.id_reservasi,
            id_pelanggan: r.id_pelanggan,
            id_paket: r.id_paket,
            nama_pelanggan: r.nama_pelanggan,
            nama_paket: r.Paket ? r.Paket.nama_paket : '',
            harga: r.Paket ? r.Paket.harga : 0,
            tanggal: r.tanggal,
            jam: r.jam,
            jumlah_orang: r.jumlah_orang,
            pilihan_background: r.pilihan_background,
            no_whatsapp: r.no_whatsapp,
            metode_pembayaran: r.metode_pembayaran,
            status_reservasi: r.status_reservasi
        }));

        res.json({
            success: true,
            message: 'Data booking berhasil diambil',
            data: formattedData
        });
    } catch (error) {
        console.error('Error get all bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            data: []
        });
    }
});

/**
 * GET /api/reservasi/pelanggan/:id
 * Get booking berdasarkan ID pelanggan
 */
router.get('/pelanggan/:id', async (req, res) => {
    try {
        const idPelanggan = req.params.id;

        const reservasiList = await Reservasi.findAll({
            where: { id_pelanggan: idPelanggan },
            include: [
                {
                    model: Paket,
                    attributes: ['nama_paket', 'harga', 'durasi']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        // Format response
        const formattedData = reservasiList.map(r => ({
            id_reservasi: r.id_reservasi,
            id_pelanggan: r.id_pelanggan,
            id_paket: r.id_paket,
            nama_pelanggan: r.nama_pelanggan,
            nama_paket: r.Paket ? r.Paket.nama_paket : '',
            harga: r.Paket ? r.Paket.harga : 0,
            tanggal: r.tanggal,
            jam: r.jam,
            jumlah_orang: r.jumlah_orang,
            pilihan_background: r.pilihan_background,
            no_whatsapp: r.no_whatsapp,
            metode_pembayaran: r.metode_pembayaran,
            status_reservasi: r.status_reservasi
        }));

        res.json({
            success: true,
            message: 'Data booking berhasil diambil',
            data: formattedData
        });
    } catch (error) {
        console.error('Error get bookings by pelanggan:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            data: []
        });
    }
});

/**
 * PUT /api/reservasi/:id
 * Update booking (untuk Admin)
 */
router.put('/:id', async (req, res) => {
    try {
        const idReservasi = req.params.id;
        const { tanggal, jam, pilihan_background, status_reservasi } = req.body;

        const reservasi = await Reservasi.findByPk(idReservasi);

        if (!reservasi) {
            return res.json({
                success: false,
                message: 'Booking tidak ditemukan',
                data: null
            });
        }

        // Update fields
        reservasi.tanggal = tanggal;
        reservasi.jam = jam;
        reservasi.pilihan_background = pilihan_background;
        if (status_reservasi) {
            reservasi.status_reservasi = status_reservasi;
        }

        await reservasi.save();

        // Get paket info
        const paket = await Paket.findByPk(reservasi.id_paket);

        const responseData = {
            id_reservasi: reservasi.id_reservasi,
            id_pelanggan: reservasi.id_pelanggan,
            id_paket: reservasi.id_paket,
            nama_pelanggan: reservasi.nama_pelanggan,
            nama_paket: paket ? paket.nama_paket : '',
            harga: paket ? paket.harga : 0,
            tanggal: reservasi.tanggal,
            jam: reservasi.jam,
            jumlah_orang: reservasi.jumlah_orang,
            pilihan_background: reservasi.pilihan_background,
            no_whatsapp: reservasi.no_whatsapp,
            metode_pembayaran: reservasi.metode_pembayaran,
            status_reservasi: reservasi.status_reservasi
        };

        res.json({
            success: true,
            message: 'Booking berhasil diupdate',
            data: responseData
        });
    } catch (error) {
        console.error('Error update booking:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            data: null
        });
    }
});

/**
 * DELETE /api/reservasi/:id
 * Delete booking (untuk Admin)
 */
router.delete('/:id', async (req, res) => {
    try {
        const idReservasi = req.params.id;

        const reservasi = await Reservasi.findByPk(idReservasi);

        if (!reservasi) {
            return res.json({
                success: false,
                message: 'Booking tidak ditemukan',
                data: null
            });
        }

        await reservasi.destroy();

        res.json({
            success: true,
            message: 'Booking berhasil dihapus',
            data: 'Deleted'
        });
    } catch (error) {
        console.error('Error delete booking:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            data: null
        });
    }
});

module.exports = router;
