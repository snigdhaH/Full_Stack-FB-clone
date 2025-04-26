// to define a simple User model:

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');  // Import the Sequelize instance

const User = sequelize.define('User', {
  // Define attributes of the model
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Optional: Some configuration options
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Sync the model with the database (creates the table if it doesn't exist)
User.sync();

module.exports = User;
