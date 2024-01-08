const express = require('express');
const {
  create,
  index,
  find,
  update,
  destroy,
  updateStatus,
} = require('./controller');

const { authenticateUser, authorizeRoles } = require('../../../middleware/auth');

const router = express();

router.post('/events', authenticateUser, authorizeRoles('organizer'), create);
router.get('/events', authenticateUser, authorizeRoles('organizer'), index);
router.get('/events/:id', authenticateUser, authorizeRoles('organizer'), find);
router.put('/events/:id', authenticateUser, authorizeRoles('organizer'), update);
router.put('/events/:id/status', authenticateUser, authorizeRoles('organizer'), updateStatus);
router.delete('/events/:id', authenticateUser, authorizeRoles('organizer'), destroy);

module.exports = router;
