const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "recruitai"
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database.');
});

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body; // role: 'recruiter' or 'job_seeker'
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, hashedPassword, role], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email already exists.' });
                }
                return res.status(500).json({ message: 'Database error.' });
            }
            res.status(201).json({ message: 'User registered successfully.' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password.' });
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password.' });
        const token = generateToken(user.id);
        res.json({ token, role: user.role });
    });
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied, token missing.' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        req.user = user;
        next();
    });
};

app.post('/complete-profile/recruiter', authenticateToken, (req, res) => {
    const { company_name, industry, website, location } = req.body;
    if (!company_name || !industry || !website || !location) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const query = 'UPDATE users SET company_name = ?, industry = ?, website = ?, location = ?, profile_completed = 1 WHERE id = ?';
    db.query(query, [company_name, industry, website, location, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        res.json({ message: 'Recruiter profile completed successfully.' });
    });
});

app.post('/complete-profile/job-seeker', authenticateToken, (req, res) => {
    const { resume_link, skills, experience, education } = req.body;
    if (!resume_link || !skills || !experience || !education) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const query = 'UPDATE users SET resume_link = ?, skills = ?, experience = ?, education = ?, profile_completed = 1 WHERE id = ?';
    db.query(query, [resume_link, skills, experience, education, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        res.json({ message: 'Job seeker profile completed successfully.' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
