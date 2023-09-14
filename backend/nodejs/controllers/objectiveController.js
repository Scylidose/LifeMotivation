const Objective = require('../models/Objective');

// Get objectives by author
exports.getObjectivesByAuthor = async (req, res) => {
    const author = req.params.author;
    try {
        const objectives = await Objective.findAllByAuthor(author);
        res.json(objectives);
    } catch (error) {
        console.error('Error fetching objectives:', error);
        res.status(500).json({ error: 'Error fetching objectives' });
    }
}

// Get objective by ID
exports.getObjectiveById = async (req, res) => {
    const id = req.params.id;
    try {
        await Objective.findById(id).then((result) => {
            if (result) {
                if (req.user.username !== result.author) {
                    result = [];
                }
            } else {
                result = [];
            }
            res.json(result);
        })
    } catch (error) {
        console.error('Error fetching objective:', error);
        res.status(500).json({ error: 'Error fetching objective' });
    }
}

// Create objective
exports.createObjective = async (req, res) => {
    const { title, description, author, priority, complexity, intendedFinishDateTime } = req.body;
    try {
        const newObjective = await Objective.create(
            title,
            description,
            author,
            priority,
            complexity,
            intendedFinishDateTime
        );

        res.status(201).json({ message: 'Objective created successfully', objective: newObjective });
    } catch (error) {
        console.error('Error creating objective:', error);
        res.status(500).json({ error: 'Failed to create objective' });
    }
}

exports.deleteObjectiveById = async (req, res) => {
    const objectiveId = req.params.id;
    try {
        await Objective.deleteById(objectiveId);
        res.json({ message: 'Objective deleted successfully' });
    } catch (error) {
        console.error('Error deleting objective:', error);
        res.status(500).json({ error: 'Error deleting objective' });
    }
}

exports.finishObjectiveById = async (req, res) => {
    const id = req.params.id;

    try {
        await Objective.finishObjectiveById(id);
        const objective = await Objective.findById(id);
        res.json(objective);
    } catch (error) {
        console.error('Error finishing objective:', error);
        res.status(500).json({ error: 'Error finishing objective' });
    }
}

exports.resetObjectiveById = async (req, res) => {
    const id = req.params.id;

    try {
        await Objective.resetObjectiveById(id);
        const objective = await Objective.findById(id);
        res.json(objective);
    } catch (error) {
        console.error('Error resetting objective:', error);
        res.status(500).json({ error: 'Error resetting objective' });
    }
}