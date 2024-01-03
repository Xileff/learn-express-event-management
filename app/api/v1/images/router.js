const express = require('express');
const { create } = require('./controller');
const uploadMiddleware = require('../../../middleware/multer');

const router = express();
router.post('/images', uploadMiddleware.single('avatar'), create);

module.exports = router;
