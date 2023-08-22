const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:username/actions', userController.getActionsByUser);
router.post('/:username', userController.fetchCreateUser);

module.exports = router;