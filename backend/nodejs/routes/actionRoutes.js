const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');

router.get('/:author', actionController.getActionsByAuthor);
router.get('/objective/:id', actionController.getActionsByObjectiveId);
router.get('/:author/actions', actionController.getActionsByUser);

router.post('/', actionController.createAction);
router.post('/:id/finish', actionController.finishAction);
router.post('/:id/reset', actionController.resetAction);
router.post('/:id/comments', actionController.addActionComment);

router.delete('/:id', actionController.deleteAction);

module.exports = router;