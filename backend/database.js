require('dotenv').config({ path: '../.env' }); // This line is crucial for loading .env variables
const Sequelize = require('sequelize');
const config = require('./config'); // Correct path: config.js is a sibling

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;