const ApiResponse = require('../utils/apiResponse');
const logger = require('../utils/logger');

/**
 * Centralized global error handling middleware.
 * Formats Mongoose validation, CastError, duplicate key errors, and runtime errors cleanly.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Log error in console
  logger.error(`${req.method} ${req.originalUrl} - ${message}`);

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    message = `Resource not found with id of ${err.value}`;
    statusCode = 404;
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value entered for ${field}. Please use another value.`;
    statusCode = 409;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    message = 'Validation failed';
    statusCode = 422;
    errors = Object.values(err.errors).map((val) => val.message);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
