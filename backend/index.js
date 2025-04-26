const express = require('express');
const app = express();
const PORT = 3000;
const sequelize = require('./database'); // Import Sequelize connection

// Import the User model (make sure the path is correct)
const User = require('./models/user');

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


// Define a route for the root URL
app.get('/', (req, res) => {
  const { firstName, lastName } = req.query;

  if (!firstName || !lastName) {
    return res.status(400).send("Please provide both firstName and lastName as query parameters.");
  }

  User.create({
    firstName: firstName,
    lastName: lastName,
    email: "john.doe@example.com", // Placeholder email
    password: "password123", // Placeholder password
  })
    .then((user) => {
      console.log("User created:", user);
      res.send(`User created: ${user.firstName} ${user.lastName}`);
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).send("Error creating user.");
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
