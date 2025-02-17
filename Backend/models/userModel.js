const db = require('../config/db');

const createUser = (name, email, hashedPassword, role, callback) => {
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, role], callback);
};

const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
};

const updateRecruiterProfile = (userId, profileData, callback) => {
    const query = `
        UPDATE users 
        SET company_name = ?, industry = ?, website = ?, location = ?, profile_completed = 1 
        WHERE id = ?
    `;
    db.query(query, [...profileData, userId], callback);
};

const updateJobSeekerProfile = (userId, profileData, callback) => {
    const query = `
        UPDATE users 
        SET resume_link = ?, skills = ?, experience = ?, education = ?, profile_completed = 1 
        WHERE id = ?
    `;
    db.query(query, [...profileData, userId], callback);
};

module.exports = {
    createUser,
    findUserByEmail,
    updateRecruiterProfile,
    updateJobSeekerProfile,
};
