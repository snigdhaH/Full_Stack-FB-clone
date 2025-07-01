const express = require('express');
const app = express();
const PORT = 3000;

// NEW: Import the central 'db' object from dbModels.js
// This 'db' object contains your sequelize instance (db.sequelize)
// and all your defined models (e.g., db.User)
const db = require('./models/dbModels'); // Correct path to your dbModels.js

// Add middleware to parse JSON and URL-encoded data from requests
app.use(express.json()); // For parsing application/json (e.g., from POST requests)
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Test the database connection AND synchronize models
// This connects to the DB and creates tables if they don't exist based on your models.
db.sequelize.authenticate() // Use db.sequelize to access the sequelize instance
  .then(() => {
    console.log('Database connection successful!');
    // IMPORTANT: Sync all models to the database.
    // { force: true } will DROP existing tables and recreate them.
    // Use this ONCE for initial setup, then change to { force: false } or remove for production.
    return db.sequelize.sync({ force: false }); // CHANGE THIS TO `false` AFTER THE FIRST SUCCESSFUL RUN!
  })
  .then(() => {
    console.log('All models were synchronized successfully (tables created/updated).');
    // Start the server ONLY after the database is connected and synced
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database or sync models:', err);
    process.exit(1); // Exit the process if DB connection or sync fails
  });

// Define a route for creating a user
app.post('/users', async (req, res) => { // Added 'async' keyword
  const { firstName, lastName, email, password } = req.body; // Data comes from request body for POST

  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Please provide all required fields: firstName, lastName, email, password." });
  }

  try {
    const newUser = await db.User.create({ // Use db.User to create a new user
      firstName, // Shorthand for firstName: firstName
      lastName,
      email,
      password // Remember: Hash passwords in a real application!
    });
    console.log("User created:", newUser.toJSON()); // .toJSON() shows plain data, removing Sequelize instance clutter
    res.status(201).json(newUser); // Respond with JSON and 201 Created status
  } catch (err) {
    console.error("Error creating user:", err);
    // More specific error handling for unique constraint violation etc.
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Email already exists. Please use a different email.' });
    }
    res.status(500).json({ error: "Error creating user.", details: err.message });
  }
});

// Define a route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await db.User.findAll(); // Use db.User to find all users
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users.", details: err.message });
  }
});

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello World! Your Facebook Clone Backend is starting.');
});