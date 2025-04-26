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

// Test creating a user (you can remove this part later after testing)
User.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'password123'
}).then(user => {
  console.log('User created:', user);
}).catch(err => {
  console.error('Error creating user:', err);
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
