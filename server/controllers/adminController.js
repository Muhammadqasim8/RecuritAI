// controllers/adminController.js
const  db  = require('../config/db');

// Ensure only admins perform these actions
function isAdmin(req, res) {
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Access denied' });
    return false;
  }
  return true;
}

exports.addTest = (req, res) => {
  const { title, technology } = req.body; // `technology` should be the ID (number)

  db.query(
    'INSERT INTO tests (title, technology_id ) VALUES (?, ?)', 
    [title, technology], 
    (err) => {
      if (err) return res.status(500).json({ message: 'Error adding test', error: err.message });
      res.json({ message: 'Test added successfully' });
    }
  );
};



exports.updateTest = (req, res) => {
  // if (!isAdmin(req, res)) return;

  const { id } = req.params;
  const { title, technology } = req.body;
  db.query('UPDATE tests SET title = ?, technology = ? WHERE id = ?', [title, technology, id], (err) => {
    if (err) return res.status(500).json({ message: 'Error updating test' });
    res.json({ message: 'Test updated successfully' });
  });
};

exports.deleteTest = (req, res) => {
  const { id } = req.params;

  // Step 1: Delete all related questions
  db.query('DELETE FROM questions WHERE test_id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting related questions', error: err.message });
    }

    // Step 2: Delete the test after questions are removed
    db.query('DELETE FROM tests WHERE id = ?', [id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting test', error: err.message });
      }

      res.json({ message: 'Test and related questions deleted successfully' });
    });
  });
};

exports.getMcqsForTest = (req, res) => {
  const { testId } = req.params;

  db.query('SELECT * FROM questions WHERE test_id = ?', [testId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching MCQs', error: err.message });

    res.json(results);
  });
};



exports.addMCQ = (req, res) => {
//   if (!isAdmin(req, res)) return;

  const { testId } = req.params;
  const { question_text, option_a, option_b, option_c, option_d, correct_option } = req.body;

  db.query(
    'INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [testId, question_text, option_a, option_b, option_c, option_d, correct_option],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error adding MCQ', error : err.message });
      res.json({ message: 'MCQ added successfully' });
    }
  );
};

exports.updateMCQ = (req, res) => {
  // if (!isAdmin(req, res)) return;

  const { id } = req.params;
  const { question_text, option_a, option_b, option_c, option_d, correct_option } = req.body;

  db.query(
    'UPDATE questions SET question_text = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_option = ? WHERE id = ?',
    [question_text, option_a, option_b, option_c, option_d, correct_option, id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error updating MCQ' , error : err.message });
      res.json({ message: 'MCQ updated successfully' });
    }
  );
};

exports.deleteMCQ = (req, res) => {
  // if (!isAdmin(req, res)) return;

  const { id } = req.params;
  db.query('DELETE FROM questions WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Error deleting MCQ' });
    res.json({ message: 'MCQ deleted successfully' });
  });
};

exports.getAllTestsWithMcqs = (req, res) => {

  db.query('SELECT * FROM tests', (err, tests) => {
    if (err) return res.status(500).json({ message: 'Error fetching tests' });

    const testIds = tests.map(t => t.id);
    if (testIds.length === 0) return res.json([]);

    db.query('SELECT * FROM questions WHERE test_id IN (?)', [testIds], (err, mcqs) => {
      if (err) return res.status(500).json({ message: 'Error fetching MCQs' });

      const response = tests.map(test => ({
        ...test,
        mcqs: mcqs.filter(m => m.test_id === test.id)
      }));

      res.json(response);
    });
  });
};
