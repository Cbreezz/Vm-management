const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, userController.updateProfile);
router.put('/rate-plan', authenticate, userController.updateRatePlan);

module.exports = router;