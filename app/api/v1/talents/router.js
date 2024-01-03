const express = require('express');
const {
  create,
  index,
  find,
  update,
  destroy,
} = require('./controller');

const router = express();
router.post('/talents', create);
router.get('/talents', index);
router.get('/talents/:id', find);
router.put('/talents/:id', update);
router.delete('/talents/:id', destroy);

module.exports = router;
