const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils');
const User = require('../models/userModel');

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.createUser(name, email, hashedPassword, role, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email already exists.' });
                }
                return res.status(500).json({ message: 'Database error.' });
            }
            res.status(201).json({ message: 'User registered successfully.' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    User.findUserByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password.' });

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password.' });

        const token = generateToken(user.id);
        res.json({ token, role: user.role });
    });
};

module.exports = { register, login };
