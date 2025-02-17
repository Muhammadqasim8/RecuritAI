const User = require('../models/userModel');

const completeRecruiterProfile = (req, res) => {
    const { company_name, industry, website, location } = req.body;
    if (!company_name || !industry || !website || !location) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const profileData = [company_name, industry, website, location];
    User.updateRecruiterProfile(req.user.id, profileData, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        res.json({ message: 'Recruiter profile completed successfully.' });
    });
};

const completeJobSeekerProfile = (req, res) => {
    const { resume_link, skills, experience, education } = req.body;
    if (!resume_link || !skills || !experience || !education) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const profileData = [resume_link, skills, experience, education];
    User.updateJobSeekerProfile(req.user.id, profileData, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        res.json({ message: 'Job seeker profile completed successfully.' });
    });
};

module.exports = { completeRecruiterProfile, completeJobSeekerProfile };
