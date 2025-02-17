const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Enable cookies and credentials if needed
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
