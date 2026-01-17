-- ============================================
-- Database Schema untuk Booking Self Photo Studio
-- MySQL Workbench Script
-- ============================================

-- Drop database jika sudah ada (hati-hati, ini akan menghapus semua data!)
DROP DATABASE IF EXISTS booking_studio;

-- Buat database baru
CREATE DATABASE booking_studio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Gunakan database
USE booking_studio;

-- ============================================
-- Tabel: admin
-- ============================================
CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabel: pelanggan
-- ============================================
CREATE TABLE pelanggan (
    id_pelanggan INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    no_whatsapp VARCHAR(15) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabel: paket
-- ============================================
CREATE TABLE paket (
    id_paket INT AUTO_INCREMENT PRIMARY KEY,
    nama_paket VARCHAR(100) NOT NULL,
    harga INT NOT NULL,
    durasi INT NOT NULL COMMENT 'Durasi dalam menit',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabel: reservasi
-- ============================================
CREATE TABLE reservasi (
    id_reservasi INT AUTO_INCREMENT PRIMARY KEY,
    id_pelanggan INT NOT NULL,
    id_paket INT NOT NULL,
    nama_pelanggan VARCHAR(100) NOT NULL,
    tanggal DATE NOT NULL,
    jam TIME NOT NULL,
    jumlah_orang INT NOT NULL,
    pilihan_background VARCHAR(100) NOT NULL,
    no_whatsapp VARCHAR(15) NOT NULL,
    metode_pembayaran ENUM('Cash', 'QRIS') NOT NULL,
    status_reservasi ENUM('Menunggu', 'Dikonfirmasi', 'Selesai', 'Dibatalkan') DEFAULT 'Menunggu',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id_pelanggan) ON DELETE CASCADE,
    FOREIGN KEY (id_paket) REFERENCES paket(id_paket) ON DELETE CASCADE,
    
    -- Indexes untuk performa
    INDEX idx_pelanggan (id_pelanggan),
    INDEX idx_paket (id_paket),
    INDEX idx_tanggal (tanggal),
    INDEX idx_status (status_reservasi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Insert Sample Data
-- ============================================

-- Insert Admin (password: admin123)
INSERT INTO admin (username, password) VALUES
('admin', 'admin123');

-- Insert Pelanggan (password: password123)
INSERT INTO pelanggan (username, password, no_whatsapp) VALUES
('user1', 'password123', '081234567890'),
('user2', 'password123', '081234567891'),
('budi', 'password123', '081234567892');

-- Insert Paket (sesuai pricelist Studio KU)
INSERT INTO paket (nama_paket, harga, durasi) VALUES
('Paket Couple', 40000, 60),
('Paket Group', 15000, 90),
('Paket Photobox', 30000, 30);

-- Insert Sample Reservasi
INSERT INTO reservasi (
    id_pelanggan, 
    id_paket, 
    nama_pelanggan, 
    tanggal, 
    jam, 
    jumlah_orang, 
    pilihan_background, 
    no_whatsapp, 
    metode_pembayaran, 
    status_reservasi
) VALUES
(1, 1, 'User One', '2026-01-20', '10:00:00', 2, 'White Background', '081234567890', 'Cash', 'Menunggu'),
(1, 2, 'User One', '2026-01-22', '14:00:00', 5, 'Colorful Background', '081234567890', 'QRIS', 'Dikonfirmasi'),
(2, 3, 'User Two', '2026-01-21', '11:00:00', 1, 'Black Background', '081234567891', 'Cash', 'Menunggu');

-- ============================================
-- Verify Data
-- ============================================

-- Tampilkan semua data
SELECT 'Admin Table:' as '';
SELECT * FROM admin;

SELECT 'Pelanggan Table:' as '';
SELECT * FROM pelanggan;

SELECT 'Paket Table:' as '';
SELECT * FROM paket;

SELECT 'Reservasi Table:' as '';
SELECT r.*, 
       p.username as pelanggan_username,
       pk.nama_paket
FROM reservasi r
JOIN pelanggan p ON r.id_pelanggan = p.id_pelanggan
JOIN paket pk ON r.id_paket = pk.id_paket;

-- ============================================
-- Useful Queries untuk Testing
-- ============================================

-- Get all bookings dengan detail
-- SELECT r.*, 
--        pel.username as pelanggan_username,
--        pak.nama_paket,
--        pak.harga,
--        pak.durasi
-- FROM reservasi r
-- JOIN pelanggan pel ON r.id_pelanggan = pel.id_pelanggan
-- JOIN paket pak ON r.id_paket = pak.id_paket
-- ORDER BY r.created_at DESC;

-- Get bookings by pelanggan
-- SELECT * FROM reservasi WHERE id_pelanggan = 1;

-- Update status booking
-- UPDATE reservasi SET status_reservasi = 'Dikonfirmasi' WHERE id_reservasi = 1;

-- Delete booking
-- DELETE FROM reservasi WHERE id_reservasi = 1;

-- ============================================
-- Database Setup Complete!
-- ============================================
