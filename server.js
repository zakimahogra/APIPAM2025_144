const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const paketRoutes = require('./routes/paket');
const reservasiRoutes = require('./routes/reservasi');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS untuk Android app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    if (Object.keys(req.body).length > 0) {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// Routes
app.use('/api', authRoutes);
app.use('/api/paket', paketRoutes);
app.use('/api/reservasi', reservasiRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Backend API Booking Self Photo Studio',
        version: '1.0.0',
        endpoints: {
            auth: {
                pelangganLogin: 'POST /api/pelanggan/login',
                adminLogin: 'POST /api/admin/login',
                register: 'POST /api/pelanggan/register'
            },
            paket: {
                getAll: 'GET /api/paket'
            },
            reservasi: {
                create: 'POST /api/reservasi',
                getAll: 'GET /api/reservasi',
                getByPelanggan: 'GET /api/reservasi/pelanggan/:id',
                update: 'PUT /api/reservasi/:id',
                delete: 'DELETE /api/reservasi/:id'
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR:', err);
    res.status(500).json({
        success: false,
        message: 'DEBUG: Terjadi kesalahan server GLOBAL: ' + err.message,
        error: err
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// Start server
const startServer = async () => {
    try {
        // Test database connection
        await testConnection();

        // Start listening
        app.listen(PORT, () => {
            console.log('');
            console.log('='.repeat(50));
            console.log('🚀 Backend Server Running!');
            console.log('='.repeat(50));
            console.log(`📍 URL: http://localhost:${PORT}`);
            console.log(`📱 Android Emulator: http://10.0.2.2:${PORT}`);
            console.log('='.repeat(50));
            console.log('');
            console.log('📋 Available Endpoints:');
            console.log('   POST   /api/pelanggan/login');
            console.log('   POST   /api/admin/login');
            console.log('   POST   /api/pelanggan/register');
            console.log('   GET    /api/paket');
            console.log('   POST   /api/reservasi');
            console.log('   GET    /api/reservasi');
            console.log('   GET    /api/reservasi/pelanggan/:id');
            console.log('   PUT    /api/reservasi/:id');
            console.log('   DELETE /api/reservasi/:id');
            console.log('');
            console.log('✅ Server siap menerima request!');
            console.log('');
        });
    } catch (error) {
        console.error('❌ Gagal start server:', error);
        process.exit(1);
    }
};

startServer();
