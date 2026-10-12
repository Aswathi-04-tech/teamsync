const { getConnectionStatus } = require('../config/db');
const ApiResponse = require('../utils/apiResponse');

/**
 * Health check controller
 * GET /api/health
 */
const getHealthStatus = (req, res) => {
  const uptimeSeconds = Math.floor(process.uptime());
  const memoryUsage = process.memoryUsage();

  const healthData = {
    status: 'healthy',
    platform: 'TeamSync API Platform',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: `${uptimeSeconds} seconds`,
    database: {
      status: getConnectionStatus(),
      configured: Boolean(process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<username>')),
    },
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
    },
    version: '1.0.0',
  };

  return ApiResponse.success(res, healthData, 'TeamSync API service operational', 200);
};

module.exports = {
  getHealthStatus,
};
