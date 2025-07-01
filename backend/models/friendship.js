// backend/models/friendship.js
module.exports = (sequelize, DataTypes) => {
  const Friendship = sequelize.define('Friendship', {
    friendshipId: { // friendship_id
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'friendship_id'
    },
    userId1: { // user_id1 (Foreign Key to Users table)
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id1'
    },
    userId2: { // user_id2 (Foreign Key to Users table)
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id2'
    },
    status: { // status (pending, accepted, declined, blocked)
      type: DataTypes.ENUM('pending', 'accepted', 'declined', 'blocked'),
      defaultValue: 'pending',
      allowNull: false
    }
  }, {
    tableName: 'friendships',
    timestamps: true,
    underscored: true,
    indexes: [ // To ensure unique friendships regardless of order (user1, user2) vs (user2, user1)
        {
            unique: true,
            fields: ['user_id1', 'user_id2']
        },
        {
            unique: true,
            fields: ['user_id2', 'user_id1']
        }
    ]
  });

  return Friendship;
};