const express = require('express');
const cors = require('cors');
const multer = require('multer'); // For file uploads
const fs = require('fs');
const pdfParse = require('pdf-parse'); // For PDF text extraction
const mammoth = require('mammoth'); // For DOCX text extraction
const natural = require('natural'); // For TF-IDF processing
const path = require('path');
const db = require('./config/db'); // Import the database connection

const app = express();

// Use CORS middleware with the correct frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin (your frontend)
  credentials: true // Optional if you are using cookies or authentication tokens
}));

// Body parser middleware
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' }); // Temporary file storage

// Helper function to extract text from uploaded files
async function extractText(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.pdf') {
        const data = await pdfParse(fs.readFileSync(filePath));
        return data.text;
    } else if (ext === '.docx') {
        const data = await mammoth.extractRawText({ path: filePath });
        return data.value;
    } else if (ext === '.txt') {
        return fs.readFileSync(filePath, 'utf8');
    } else {
        throw new Error('Unsupported file type');
    }
}

// API route: Register a user
app.post('/register', (req, res) => {
  const { name, email, password } = req.body; // Assuming these fields are sent in the request body

  // Insert user into the database
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Error registering user');
    }
    res.status(200).send('Signup successful');
  });
});

// API route: Login a user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check user credentials
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).send('Error logging in');
    }
    if (results.length > 0) {
      res.status(200).send('Signin successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// API route: Match resumes with a job description
app.post('/matcher', upload.array('resumes'), async (req, res) => {
    try {
        const jobDescription = req.body.job_description;
        const resumeFiles = req.files;

        if (!jobDescription || resumeFiles.length === 0) {
            return res.status(400).json({ error: "Please provide a job description and upload resumes." });
        }

        // Extract text from resumes
        const resumes = [];
        for (const file of resumeFiles) {
            const text = await extractText(file.path);
            resumes.push({ filename: file.originalname, content: text });
        }

        // TF-IDF Vectorization
        const vectorizer = new natural.TfIdf();
        vectorizer.addDocument(jobDescription);
        resumes.forEach(resume => vectorizer.addDocument(resume.content));

        // Calculate cosine similarities
        const similarities = resumes.map((_, i) => vectorizer.tfidf(0, i + 1));
        const topMatches = similarities
            .map((score, index) => ({ filename: resumes[index].filename, similarity: parseFloat(score.toFixed(2)) }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 5); // Get top 5 matches

        res.json({ jobDescription, topMatches });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing resumes." });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
