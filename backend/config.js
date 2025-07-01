module.exports = {
    username: process.env.DB_USER || 'fb_user',
    password: process.env.DB_PASSWORD || 'mydbpassword123',
    database: process.env.DB_NAME || 'fb_clone_db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
  };