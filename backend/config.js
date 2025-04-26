module.exports = {
    username: 'root',           // Default MySQL username
    password: 'my-secret-pw',  // MySQL password set when creating the container
    database: 'facebook_clone', // Database name (can be created in MySQL)
    host: '172.17.0.2',          // Use 'localhost' if you're running Docker locally
    dialect: 'mysql',           // Dialect for MySQL
  };