require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors'); // CORS added
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For creating and verifying JWT tokens
const verifyToken = require('./middleware/verifyToken');

const app = express();
const PORT = 3000;

const db = require('./models/dbModels'); // Sequelize models

//Enable CORS (important for frontend-backend communication)
app.use(cors({
  origin: 'http://localhost:5173', // allow your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DATABASE CONNECTION
db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection successful!');
    return db.sequelize.sync({ force: false }); // Keep false in production
  })
  .then(() => {
    console.log('✅ All models synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  });

// ROOT TEST ROUTE
app.get('/', (req, res) => {
  res.send('Hello World! Facebook Clone Backend is running.');
});

// SIGNUP ROUTE (Create New User)
app.post('/users', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Please provide all required fields." });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await db.User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: "Error creating user.", details: err.message });
  }
});

// LOGIN ROUTE (now at /users/login to match frontend)
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

  try {
    const user = await db.User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "User not found." });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ error: "Invalid password." });

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET || 'defaultsecretkey',
      { expiresIn: '1h' }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed.", details: err.message });
  }
});

// GET ALL USERS (Protected route example)
app.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users.", details: err.message });
  }
});

//Optional: handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
