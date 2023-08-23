const Action = require('../models/Action');

// Get actions by author
exports.getActionsByAuthor = async (req, res) => {
    const author = req.params.author;
    try {
        const actions = await Action.findAllByAuthor(author);
        res.json(actions);
    } catch (error) {
        console.error('Error fetching actions:', error);
        res.status(500).json({ error: 'Error fetching actions' });
    }
}

// Get actions linked to an objective
exports.getActionsByObjectiveId = async (req, res) => {
    const id = req.params.id;
    try {
        const actions = await Action.findActionsByObjective(id);
        res.json(actions);
    } catch (error) {
        console.error('Error fetching objective actions:', error);
        res.status(500).json({ error: 'Error fetching objective actions' });
    }
}

// Finish an action by ID
exports.finishAction = async (req, res) => {
    const id = req.params.id;
    const { realDuration } = req.body;

    try {
        await Action.finishActionById(id, realDuration);
        const action = await Action.findById(id);
        res.json(action);
    } catch (error) {
        console.error('Error finishing action:', error);
        res.status(500).json({ error: 'Error finishing action' });
    }
}

// Reset an action by ID
exports.resetAction = async (req, res) => {
    const id = req.params.id;

    try {
        await Action.resetActionById(id);
        const action = await Action.findById(id);
        res.json(action);
    } catch (error) {
        console.error('Error resetting action:', error);
        res.status(500).json({ error: 'Error resetting action' });
    }
}

// Add a comment to an action
exports.addActionComment = async (req, res) => {
    const id = req.params.id;
    const { comment } = req.body;

    try {
        await Action.saveActionComment(id, comment);
        const action = await Action.findById(id);
        res.json(action);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Error adding comment' });
    }
};

// Delete an action by ID
exports.deleteAction = async (req, res) => {
    const actionId = req.params.id;
    try {
        await Action.deleteById(actionId);
        res.json({ message: 'Action deleted successfully' });
    } catch (error) {
        console.error('Error deleting action:', error);
        res.status(500).json({ error: 'Error deleting action' });
    }
};

// Create a new action
exports.createAction = async (req, res) => {
    const {
        title,
        description,
        author,
        isGood,
        importance,
        daysOfWeek,
        frequency,
        difficulty,
        intendedDuration,
        linkedObjective,
    } = req.body;
    try {
        const newAction = await Action.create(
            title,
            description,
            author,
            isGood,
            importance,
            daysOfWeek,
            frequency,
            difficulty,
            intendedDuration,
            linkedObjective
        );

        res.status(201).json({ message: 'Action created successfully', action: newAction });
    } catch (error) {
        console.error('Error creating action:', error);
        res.status(500).json({ error: 'Failed to create action' });
    }
};
