
const Sequelize = require('sequelize');
const config = require('./config');  // Import the config to get the connection details

// Set up Sequelize to connect to MySQL via Docker
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false, // Disable SQL query logging
});

// Authenticate the connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
