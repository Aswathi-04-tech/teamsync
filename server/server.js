require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to MongoDB Atlas (resilient connection)
  await connectDB();

  // Create HTTP server
  const server = http.createServer(app);

  server.listen(PORT, () => {
    logger.success(`TeamSync server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    logger.info(`Health check available at http://localhost:${PORT}/api/health`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    // Keep server running in development; close gracefully in production
    if (process.env.NODE_ENV === 'production') {
      server.close(() => process.exit(1));
    }
  });

  // Handle process termination
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully.');
    server.close(() => {
      logger.info('Process terminated.');
    });
  });
};

startServer();
