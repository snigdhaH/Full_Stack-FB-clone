// backend/models/notification.js
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    notificationId: { // notification_id
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'notification_id'
    },
    userId: { // user_id (Foreign Key to Users table)
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    read: { // read status
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    unread: { // unread status (can be derived from 'read' or used separately)
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
    // You might want an 'content' or 'type' column for the notification message itself
    // e.g., content: DataTypes.STRING,
  }, {
    tableName: 'notifications',
    timestamps: true,
    underscored: true
  });

  return Notification;
};