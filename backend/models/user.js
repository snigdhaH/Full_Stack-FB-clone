// This file now exports a function that defines the User model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Define attributes of the model
    userId: { // This will be your primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically increments for new users
      field: 'user_id' // Maps to 'user_id' column in your database
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name' // Maps to 'first_name' column
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name' // Maps to 'last_name' column
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Ensures each email is unique in the database
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false // Passwords should never be null
    },
    // Adding other User attributes from your ERD:
    birthday: {
      type: DataTypes.DATEONLY, // Stores date only (YYYY-MM-DD)
      allowNull: true // Birthday can be optional
    },
    gender: {
      type: DataTypes.STRING, // e.g., 'Male', 'Female', 'Other'
      allowNull: true // Gender can be optional
    }
  }, {
    // Optional: Some configuration options for the model
    tableName: 'users', // Explicitly sets the table name in the database to 'users'
    timestamps: true,  // Sequelize will automatically add `createdAt` and `updatedAt` columns
    underscored: true  // Uses snake_case for auto-generated fields (like foreign keys and timestamps)
  });

  // Associations (relationships) will be defined in backend/models/dbModels.js, not here.

  return User; // Return the defined User model
};