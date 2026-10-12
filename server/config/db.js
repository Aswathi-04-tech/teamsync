const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas cluster using environment variable MONGODB_URI.
 * Designed to be resilient: if MONGODB_URI is absent or cluster is unreachable,
 * it logs clear setup instructions without terminating the process abruptly.
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      '[MongoDB] Warning: MONGODB_URI is not configured in server/.env.\n' +
      '[MongoDB] The server will run in offline/unconnected mode for local frontend evaluation.\n' +
      '[MongoDB] To connect: create server/.env and add your MongoDB Atlas connection string.'
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`\x1b[32m[MongoDB] Connected successfully to host: ${conn.connection.host}\x1b[0m`);
    return true;
  } catch (error) {
    console.error(`\x1b[31m[MongoDB] Connection error: ${error.message}\x1b[0m`);
    console.warn(
      '\x1b[33m[MongoDB] Please verify your network access/IP whitelist in MongoDB Atlas.\x1b[0m'
    );
    return false;
  }
};

/**
 * Helper to inspect current connection status for health monitoring
 */
const getConnectionStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] || 'unknown';
};

module.exports = {
  connectDB,
  getConnectionStatus,
};
