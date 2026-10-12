const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware: Cross-Origin Resource Sharing
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching origin
      if (!origin || origin === clientUrl || origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly permissive default
    },
    credentials: true,
  })
);

// Middleware: Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger in non-test mode
if (process.env.NODE_ENV !== 'test') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      if (req.originalUrl.startsWith('/api')) {
        console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
      }
    });
    next();
  });
}

// Mount centralized API router
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'TeamSync Backend API',
    status: 'online',
    version: '1.0.0',
    healthCheck: '/api/health',
  });
});

// 404 Not Found handler
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

module.exports = app;
