const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log('JWT error:', error.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyToken