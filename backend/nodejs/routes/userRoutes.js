const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/:username', userController.fetchCreateUser);
router.post('/:username/:xp', userController.updateUserXP);

module.exports = router;