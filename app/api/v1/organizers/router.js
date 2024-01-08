const express = require('express');
const { createCMSOrganizer, createCMSUser } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middleware/auth');

const router = express();

router.post('/organizers', authenticateUser, authorizeRoles('owner'), createCMSOrganizer);
router.post('/users', authenticateUser, authorizeRoles('organizer'), createCMSUser);

module.exports = router;
