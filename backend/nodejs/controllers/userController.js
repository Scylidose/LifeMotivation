const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

// Update user experience
exports.updateUserXP = async (req, res) => {
    const username = req.params.username;
    var xp = parseInt(req.params.xp, 10);

    if (isNaN(xp) || !isFinite(xp)) {
        xp = 0;
    }

    try {
        const user = await User.fetchOne(username);
        var total_xp = user.xp + xp;
        if (total_xp < 0) {
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

// Log user
exports.logUser = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        const user = await User.fetchOne(usernameOrEmail);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (passwordMatch) {

            const payload = {
                userId: user.id,
                username: user.username,
            };
            const token = jwt.sign(payload, secretKey, { expiresIn: '12h', algorithm: 'HS256' });
            res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Authentication failed.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Register user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.findOrCreate(username, email, hashedPassword, salt);
        res.json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
