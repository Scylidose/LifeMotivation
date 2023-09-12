const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/:username', authenticateToken, userController.fetchCreateUser);

router.post('/login', userController.logUser);
router.post('/register', userController.registerUser);

router.post('/:username/:xp', authenticateToken, userController.updateUserXP);

module.exports = router;