// backend/models/comment.js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentId: { // comment_id
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'comment_id'
    },
    userId: { // user_id (Foreign Key to Users table)
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    postId: { // post_id (Foreign Key to Posts table)
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'post_id'
    },
    contentText: { // content text
      type: DataTypes.TEXT,
      allowNull: false
    },
    timeline: { // timeline
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'comments',
    timestamps: true,
    underscored: true
  });

  return Comment;
};