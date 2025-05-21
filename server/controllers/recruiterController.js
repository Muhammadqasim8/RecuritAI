// controllers/recruiterController.js
const  db  = require('../config/db');

// Check if user is a recruiter
function isRecruiter(req, res) {
  if (req.user.role !== 'recruiter') {
    res.status(403).json({ message: 'Access denied' });
    return false;
  }
  return true;
}

// controllers/candidateController.js
// const db = require('../config/db'); // assuming db is MySQL connection

exports.jobSeekerNumber = (req, res) => {
  const sql = `
    SELECT COUNT(*) AS count FROM users WHERE role = 'job_seeker'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({  error : err, message: err.message });
    }

    // Successful response
    res.status(200).json({ count: results[0].count });
  });
};

exports.getTalentedCandidates = (req, res) => {
  const sql = `
    SELECT 
      u.id, u.name, u.email, u.rank, 
      cp.experience, cp.skills,
      IFNULL(AVG(ta.score), 0) AS avg_score,
      IFNULL(COUNT(ta.id), 0) AS total_attempts
    FROM users u
    LEFT JOIN job_seekers cp ON cp.user_id = u.id
    LEFT JOIN test_attempts ta ON ta.user_id = u.id
    WHERE u.role = 'job_seeker'
      AND u.rank IN ('Advanced', 'Expert', 'Elite')
    GROUP BY u.id
    ORDER BY 
      CASE u.rank
        WHEN 'Elite' THEN 3
        WHEN 'Expert' THEN 2
        WHEN 'Advanced' THEN 1
        ELSE 0
      END DESC,
      avg_score DESC
    LIMIT 50;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching talented candidates:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json({ talentedCandidates: results });
  });
};


exports.completeRecruiterProfile = (req, res) => {
  const userId = req.user.id;
  const { company_name, company_size, industry, verified } = req.body;

  const sql = `
    INSERT INTO recruiters (user_id, company_name, company_size, industry, verified)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      company_name = VALUES(company_name),
      company_size = VALUES(company_size),
      industry = VALUES(industry),
      verified = VALUES(verified)
  `;

  db.query(
    sql,
    [userId, company_name, company_size, industry, verified],
    (err, result) => {
      if (err) {
        console.error('Error updating recruiter profile:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.json({ message: 'Recruiter profile saved successfully' });
    }
  );
};













exports.recommendedOnes = (req, res) => {

}
