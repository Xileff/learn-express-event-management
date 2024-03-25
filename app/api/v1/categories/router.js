const express = require('express');

const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middleware/auth');

router.get('/categories', authenticateUser, authorizeRoles('organizer'), index);
router.get(
  '/categories/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  find
);
router.post(
  '/categories',
  authenticateUser,
  authorizeRoles('organizer'),
  create
);
router.put(
  '/categories/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  update
);
router.delete(
  '/categories/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  destroy
);

module.exports = router;

// Alurnya :
/*
 1. user membuat req ke rute /categories
 2. authenticateUser memastikan bahwa user sudah login dan menambahkan payload data user tsb ke req
 3. authorizeRoles akan memastikan bahwa role user boleh mengakses rute ini
 4. req diteruskan ke controller (index, find, create, update destroy)

*/
