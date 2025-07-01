// backend/models/dbModels.js

const Sequelize = require('sequelize');
const sequelize = require('../database'); // Your Sequelize instance

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// --- Load Models ---
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Post = require('./post')(sequelize, Sequelize.DataTypes);
db.Comment = require('./comment')(sequelize, Sequelize.DataTypes);
db.Message = require('./message')(sequelize, Sequelize.DataTypes);
db.Notification = require('./notification')(sequelize, Sequelize.DataTypes);
db.Like = require('./like')(sequelize, Sequelize.DataTypes);
db.Friendship = require('./friendship')(sequelize, Sequelize.DataTypes);

// --- Define Associations (Relationships) ---

// User and Post: One-to-Many (A User has many Posts)
db.User.hasMany(db.Post, { foreignKey: 'userId', as: 'posts' });
db.Post.belongsTo(db.User, { foreignKey: 'userId', as: 'author' });

// User and Comment: One-to-Many (A User has many Comments)
db.User.hasMany(db.Comment, { foreignKey: 'userId', as: 'comments' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId', as: 'commenter' });

// Post and Comment: One-to-Many (A Post has many Comments)
db.Post.hasMany(db.Comment, { foreignKey: 'postId', as: 'comments' });
db.Comment.belongsTo(db.Post, { foreignKey: 'postId', as: 'post' });

// User and Message: Self-referencing (Sender and Receiver are both Users)
db.User.hasMany(db.Message, { foreignKey: 'senderId', as: 'sentMessages' });
db.Message.belongsTo(db.User, { foreignKey: 'senderId', as: 'sender' });
db.User.hasMany(db.Message, { foreignKey: 'receiverId', as: 'receivedMessages' });
db.Message.belongsTo(db.User, { foreignKey: 'receiverId', as: 'receiver' });

// User and Notification: One-to-Many (A User has many Notifications)
db.User.hasMany(db.Notification, { foreignKey: 'userId', as: 'notifications' });
db.Notification.belongsTo(db.User, { foreignKey: 'userId', as: 'notifiedUser' });

// User and Like: One-to-Many (A User has many Likes)
db.User.hasMany(db.Like, { foreignKey: 'userId', as: 'likes' });
db.Like.belongsTo(db.User, { foreignKey: 'userId', as: 'liker' });

// User and Friendship: Many-to-Many (A User can have many Friends via Friendship table)
// Friendship is a "through" table for a many-to-many relationship with extra attributes (status)
db.User.belongsToMany(db.User, {
  as: 'friends',
  through: db.Friendship,
  foreignKey: 'userId1', // user_id1 is the initiator of the friendship
  otherKey: 'userId2'   // user_id2 is the recipient of the friendship
});
db.User.belongsToMany(db.User, {
  as: 'friendOf',
  through: db.Friendship,
  foreignKey: 'userId2', // For relationships where this user is the recipient
  otherKey: 'userId1'
});
// You might also want specific direct associations for the Friendship table to the Users
db.Friendship.belongsTo(db.User, { foreignKey: 'userId1', as: 'userOne' });
db.Friendship.belongsTo(db.User, { foreignKey: 'userId2', as: 'userTwo' });


module.exports = db;