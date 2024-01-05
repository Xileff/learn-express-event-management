const express = require('express');

const router = express();
const {
  create, index, find, update, destroy,
} = require('./controller');
const { authenticateUser } = require('../../../middleware/auth');

// req akan masuk ke middleware dulu sebelum ke controller
router.get('/categories', authenticateUser, index);
router.get('/categories/:id', authenticateUser, find);
router.post('/categories', authenticateUser, create);
router.put('/categories/:id', authenticateUser, update);
router.delete('/categories/:id', authenticateUser, destroy);

module.exports = router;
