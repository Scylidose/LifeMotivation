const express = require('express');
const router = express.Router();
const objectiveController = require('../controllers/objectiveController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/:author', authenticateToken, objectiveController.getObjectivesByAuthor);
router.get('/id/:id', authenticateToken, objectiveController.getObjectiveById);

router.post('/', authenticateToken, objectiveController.createObjective);
router.post('/edit', authenticateToken, objectiveController.editObjective);
router.post('/:id/finish', authenticateToken, objectiveController.finishObjectiveById);
router.post('/:id/reset', authenticateToken, objectiveController.resetObjectiveById);

router.delete('/:id', authenticateToken, objectiveController.deleteObjectiveById);

module.exports = router;