const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const tokenParts = token.split(" ");
    const jwtToken = tokenParts[1];

    jwt.verify(jwtToken, secretKey, { algorithms: ['HS256'] }, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;