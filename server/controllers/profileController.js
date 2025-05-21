const db = require('../config/db');

// Create or Update Recruiter Profile
exports.upsertRecruiterProfile = (req, res) => {
  const userId = req.user.id;
  const { company_name, company_website, contact_number } = req.body;

  const sql = `
    INSERT INTO recruiters (user_id, company_name, company_website, contact_number)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      company_name = VALUES(company_name),
      company_website = VALUES(company_website),
      contact_number = VALUES(contact_number)
  `;

  db.query(sql, [userId, company_name, company_website, contact_number], (err) => {
    if (err) return res.status(500).json({ error: 'Database error while saving recruiter profile' });
    res.json({ message: 'Recruiter profile saved successfully' });
  });
};

// Get Recruiter Profile
exports.getRecruiterProfile = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT u.name, u.email, rp.company_name, rp.company_website, rp.contact_number
    FROM users u
    LEFT JOIN recruiters rp ON u.id = rp.user_id
    WHERE u.id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Profile not found' });

    res.json(results[0]);
  });
};

// Create or Update Job Seeker Profile
exports.upsertJobSeekerProfile = (req, res) => {
  const userId = req.user.id;
  let { bio, skills, experience, phone } = req.body;

  // ✅ Convert array to comma-separated string
  if (Array.isArray(skills)) {
    skills = skills.join(','); // e.g. ['JavaScript', 'React'] → 'JavaScript,React'
  }

  const sql = `
    INSERT INTO job_seekers (user_id, bio, skills, experience, phone)
    VALUES (?, ?, ?, ?, ?)
   
  `;

  db.query(sql, [userId, bio, skills, experience, phone], (err) => {
    if (err) {
      console.error('Error updating job seeker profile:', err);
      return res.status(500).json({ error: 'Database error while saving job seeker profile' });
    }
    res.json({ message: 'Job seeker profile saved successfully' });
  });
};


// Get Job Seeker Profile
exports.getJobSeekerProfile = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT u.name, u.email, jp.bio, jp.skills, jp.experience,jp.phone
    FROM users u
    LEFT JOIN job_seekers jp ON u.id = jp.user_id
    WHERE u.id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Profile not found' });

    res.json(results[0]);
  });
};
