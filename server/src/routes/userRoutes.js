const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// Profile routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

// Image routes
router.post('/upload-image', userController.uploadImage);
router.delete('/delete-image', userController.deleteImage);

module.exports = router; 