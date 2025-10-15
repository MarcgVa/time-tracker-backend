const corsOptions = {
  origin: 'http://localhost:5173', // Replace with the actual origin of your frontend application
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  credentials: true // Allow cookies and credentials to be sent cross-origin
};


module.exports = {corsOptions};
