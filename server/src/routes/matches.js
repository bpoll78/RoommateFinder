const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/potential', matchController.getPotentialMatches);
router.post('/like', matchController.likeUser);
router.post('/dislike', matchController.dislikeUser);
router.get('/matches', matchController.getMatches);

module.exports = router; 