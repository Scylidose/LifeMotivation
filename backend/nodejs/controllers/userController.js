const User = require('../models/User');

// Get actions by user
exports.getActionsByUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOrCreate(username);
        const actions = await user.getActions();
        res.json(actions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get actions by user
exports.fetchCreateUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOrCreate(username);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}