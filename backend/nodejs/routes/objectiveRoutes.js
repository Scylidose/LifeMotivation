const express = require('express');
const router = express.Router();
const objectiveController = require('../controllers/objectiveController');

router.get('/:author', objectiveController.getObjectivesByAuthor);
router.get('/:id', objectiveController.getObjectiveById);

router.post('/', objectiveController.createObjective);
router.post('/:id/finish', objectiveController.finishObjectiveById);
router.post('/:id/reset', objectiveController.resetObjectiveById);

router.delete('/:id', objectiveController.deleteObjectiveById);

module.exports = router;