const express = require('express');
const healthRoutes = require('./healthRoutes');

const router = express.Router();

// Mount subroutes
router.use('/health', healthRoutes);

// Base API index info
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to TeamSync Core API',
    version: '1.0.0',
    documentation: '/docs/api-documentation.md',
    endpoints: {
      health: '/api/health',
    },
  });
});

module.exports = router;
