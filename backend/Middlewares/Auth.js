const jwt = require('jsonwebtoken');

/**
 * Middleware to ensure the user is authenticated.
 * It checks for a JWT token in the request headers and verifies it.
 * If the token is valid, it attaches the user information to the request object.
 * If not, it sends an appropriate error response.
 */
const ensureAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "Unauthorized access", success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid JWT token", success: false });
    }
}

module.exports = ensureAuthenticated;