const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/:author', authenticateToken, actionController.getActionsByAuthor);
router.get('/id/:id', authenticateToken, actionController.getActionById);
router.get('/objective/:id', authenticateToken, actionController.getActionsByObjectiveId);

router.post('/', authenticateToken, actionController.createAction);
router.post('/:id/finish', authenticateToken, actionController.finishAction);
router.post('/:id/reset', authenticateToken, actionController.resetAction);
router.post('/:id/comments', authenticateToken, actionController.addActionComment);

router.delete('/:id', authenticateToken, actionController.deleteAction);

module.exports = router;