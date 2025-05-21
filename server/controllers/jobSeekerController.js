const db  = require('../config/db');
const { getRankFromScore } = require('../utils/rankHelper');


exports.getAvailableTests = (req, res) => {
  db.query('SELECT * FROM tests', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching tests' });
    res.json(results);
  });
};
// controllers/jobSeekerController.js
// const db = require('../config/db');

exports.completeJobSeekerProfile = (req, res) => {
  const userId = req.user.id;
  const { preferred_location, expected_salary, job_type, availability_status } = req.body;

  const sql = `
    INSERT INTO job_seekers (user_id, preferred_location, expected_salary, job_type, availability_status)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      preferred_location = VALUES(preferred_location),
      expected_salary = VALUES(expected_salary),
      job_type = VALUES(job_type),
      availability_status = VALUES(availability_status)
  `;

  db.query(
    sql,
    [userId, preferred_location, expected_salary, job_type, availability_status],
    (err, result) => {
      if (err) {
        console.error('Error updating job seeker profile:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.json({ message: 'Job seeker profile saved successfully' });
    }
  );
};


exports.getTestQuestions = (req, res) => {
  const { testId } = req.params;
  db.query('SELECT * FROM questions WHERE test_id = ?', [testId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching questions' });
    res.json(results);
  });
};

exports.submitTest = (req, res) => {
  console.log("Decoded user info:", req.user); // Add this

  const userId = req.user.id;
  console.log(userId);
  
  const { testId, score } = req.body;

  db.query(
    'INSERT INTO test_attempts (user_id, test_id, score) VALUES (?, ?, ?)',
    [userId, testId, score], // <-- use dynamic userId
    (err) => {
      if (err) return res.status(500).json({ message: 'Error submitting test' });

      db.query('SELECT score FROM test_attempts WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error recalculating rank' });

        const scores = results.map(r => r.score);
        const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
        const newRank = getRankFromScore(avg);

        db.query('UPDATE test_attempts SET rank = ? WHERE id = ?', [newRank, userId], (err) => {
          if (err) return res.status(500).json({ message: 'Error updating rank' });

          res.json({ message: 'Test submitted successfully', newRank });
        });
      });
    }
  );
};


exports.getPerformanceSummary = (req, res) => {
  const  userId  = req.user.id;
  console.log(userId);
  

  db.query('SELECT name, email,rank  FROM users WHERE id = ?', [userId], (err, userResults) => {
    if (err || userResults.length === 0) return res.status(500).json({ message: 'Error fetching user' });

    const user = userResults[0];

    // Fetch average score and tests
    db.query('SELECT ta.score, ta.taken_at, t.title AS test_name FROM test_attempts ta JOIN tests t ON ta.test_id = t.id WHERE ta.user_id = ?', [userId], (err, testResults) => {
      if (err) return res.status(500).json({ message: 'Error fetching test attempts' });

      const scores = testResults.map(t => t.score);
      const totalTests = scores.length;
      const average = totalTests ? (scores.reduce((sum, s) => sum + s, 0) / totalTests).toFixed(2) : 0;

      res.json({
        name: user.name,
        email: user.email,
        rank: user.rank || 'Not ranked yet',
        averageScore: average,
        testsAttempted: totalTests,
        attempts: testResults.map(t => ({
          testName: t.test_name,
          score: t.score,
          date: new Date(t.created_at).toLocaleDateString()
        }))
      });
    });
  });
};


function isJobSeeker(req, res) {
  if (req.user.role !== 'jobseeker') {
    res.status(403).json({ message: 'Access denied' });
    return false;
  }
  return true;
}

// --- New Controllers ---

exports.getAllJobs = (req, res) => {
  if (!isJobSeeker(req, res)) return;

  db.query(
    'SELECT jobs.*, users.name AS recruiter_name FROM jobs JOIN users ON jobs.recruiter_id = users.id',
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching jobs' });
      res.json(results);
    }
  );
};

exports.applyToJob = (req, res) => {
  if (!isJobSeeker(req, res)) return;

  const job_id = req.params.jobId;
  const job_seeker_id = req.user.id;

  db.query('SELECT * FROM applications WHERE candidate_id = ? AND job_id = ?', [job_seeker_id, job_id], (err, existing) => {
    if (err) return res.status(500).json({ message: 'Error checking application' });
    if (existing.length > 0) return res.status(400).json({ message: 'Already applied to this job' });

    db.query(
      'INSERT INTO applications (candidate_id, job_id) VALUES (?, ?)',
      [job_seeker_id, job_id],
      (err) => {
        if (err) return res.status(500).json({ message: 'Error applying to job' });
        res.json({ message: 'Applied successfully' });
      }
    );
  });
};

exports.getMyApplications = (req, res) => {
  if (!isJobSeeker(req, res)) return;

  const job_seeker_id = req.user.id;

  db.query(
    `SELECT a.id, j.title, j.technology, j.description, u.name AS recruiter_name
     FROM applications a
     JOIN jobs j ON a.job_id = j.id
     JOIN users u ON j.recruiter_id = u.id
     WHERE a.candidate_id = ?`,
    [job_seeker_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching applications' });
      res.json(results);
    }
  );
};

exports.getMyResults = (req, res) => {
  // if (!isJobSeeker(req, res)) return;

  const user_id = req.user.id;

  db.query(
    `SELECT t.title AS test_name, ta.score, ta.test_id
     FROM test_attempts ta
     JOIN tests t ON ta.test_id = t.id
     WHERE ta.user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching results' });
      res.json(results);
    }
  );
};
