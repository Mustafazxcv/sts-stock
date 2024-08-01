const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin kayıt işlemi
const registerAdmin = async (req, res) => {
    const { email, password, phone } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO admins (email, password, phone) VALUES ($1, $2, $3) RETURNING *',
            [email, hashedPassword, phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin giriş işlemi
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Kullanıcı bulunamadı' });
        }

        const admin = result.rows[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Şifre yanlış' });
        }

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin
};
