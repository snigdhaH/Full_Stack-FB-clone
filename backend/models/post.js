// backend/models/post.js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    postId: { // post_id
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'post_id'
    },
    userId: { // user_id (Foreign Key)
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    contentText: { // content text
      type: DataTypes.TEXT,
      allowNull: true, // Assuming text content can be optional if media exists
      field: 'content_text'
    },
    media: { // media
      type: DataTypes.STRING, // Store URL or path to media file
      allowNull: true // Media is optional
    },
    timeline: { // timeline
      type: DataTypes.DATE, // Or DataTypes.DATEONLY if only date is needed
      allowNull: true // Assuming timeline can be optional or derived
    }
  }, {
    tableName: 'posts',
    timestamps: true, // Will create createdAt and updatedAt columns
    underscored: true // Use snake_case for column names (e.g., content_text, created_at)
  });

  return Post;
};