const express = require('express');
const { index } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middleware/auth');

const router = express();

router.get('/orders', authenticateUser, authorizeRoles('organizer', 'admin'), index);

module.exports = router;
