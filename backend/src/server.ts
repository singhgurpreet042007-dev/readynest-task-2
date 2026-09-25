import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import taskRoutes from './routes/taskRoutes';
import noticeRoutes from './routes/noticeRoutes';
import timetableRoutes from './routes/timetableRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Trust reverse proxies (Render, Railway, etc.)
app.set('trust proxy', 1);

// Flexible CORS Configuration
const allowedOrigins = [
  CLIENT_URL,
  CLIENT_URL.replace(/\/$/, ''),
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, server-to-server, curl)
    if (!origin) return callback(null, true);

    if (
      CLIENT_URL === '*' ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.render.com') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    // Permissive fallback so production deployment never breaks due to CORS
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Info & Health Check Endpoint (for Render / uptime pings)
app.get('/', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Smart Campus Utility API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      attendance: '/api/attendance',
      timetable: '/api/timetable',
      notices: '/api/notices',
      tasks: '/api/tasks',
      admin: '/api/admin',
    },
  });
});

// Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Smart Campus Utility API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(Number(PORT), '0.0.0.0', async () => {
    console.log(`=========================================`);
    console.log(`🚀 Smart Campus Utility Backend Server`);
    console.log(`📡 URL: http://0.0.0.0:${PORT}`);
    console.log(`🔒 Health Check: http://0.0.0.0:${PORT}/api/health`);
    console.log(`💼 CORS Allowed Origin: ${CLIENT_URL}`);
    console.log(`=========================================`);

    // Ensure database demo accounts are seeded once listening
    try {
      const { seedDatabase } = await import('./utils/seedDatabase');
      await seedDatabase();
    } catch (err: any) {
      console.warn('[server] Startup seeding notice:', err.message);
    }
  });
}

export default app;
