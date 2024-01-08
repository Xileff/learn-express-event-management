const express = require('express');
const { createCMSOrganizer, createCMSUser, indexUsers } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middleware/auth');

const router = express();

router.post('/organizers', authenticateUser, authorizeRoles('owner'), createCMSOrganizer);
router.post('/users', authenticateUser, authorizeRoles('organizer'), createCMSUser);
router.get('/users', authenticateUser, authorizeRoles('owner'), indexUsers);

module.exports = router;
