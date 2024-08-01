const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Yetkisiz' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Geçersiz token' });
    }
};

module.exports = auth;
