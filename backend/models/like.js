// backend/models/like.js
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    likeId: { // like_id
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'like_id'
    },
    userId: { // user_id (Foreign Key to Users table)
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    // 'count' column in your diagram is unusual for a 'likes' table.
    // Typically, a like table stores individual likes.
    // We'll add a placeholder, but usually, 'count' is calculated from rows.
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1, // If this 'count' is for each like entry, 1 makes sense
      allowNull: true // Can be null if not used
    }
    // Often, likes are tied to a specific Post or Comment.
    // You might want:
    // postId: { type: DataTypes.INTEGER, allowNull: true, field: 'post_id' },
    // commentId: { type: DataTypes.INTEGER, allowNull: true, field: 'comment_id' },
    // ensuring one of them is present.
  }, {
    tableName: 'likes',
    timestamps: true,
    underscored: true
  });

  return Like;
};