const User = require('../models/User');

// Update user experience
exports.updateUserXP = async (req, res) => {
    const username = req.params.username;
    var xp = parseInt(req.params.xp, 10);

    if (isNaN(xp) || !isFinite(xp)) {
        xp = 0;
    }

    try {
        const user = await User.findOrCreate(username);
        var total_xp = user.xp + xp;
        if(total_xp < 0) {
            total_xp = 0;
        }
        await User.saveUserXP(username, total_xp);
        res.json({ message: 'User XP successfully added' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
}

// Create or get user
exports.fetchCreateUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOrCreate(username);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}