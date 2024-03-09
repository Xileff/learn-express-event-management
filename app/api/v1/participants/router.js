const express = require('express');
const { signup, activate, signin, getAllLandingPage, getDetailLandingPage, getDashboard, checkout } = require('./controller');
const { authenticateParticipant } = require('../../../middleware/auth');

const router = express();

router.post('/auth/signup', signup);
router.patch('/activate', activate);
router.post('/auth/signin', signin);
router.get('/events', getAllLandingPage);
router.get('/events/:id', getDetailLandingPage);
router.get('/orders',authenticateParticipant, getDashboard);
router.post('/checkout', authenticateParticipant, checkout);

module.exports = router;
