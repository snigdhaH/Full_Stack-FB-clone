// backend/models/message.js
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    messageId: { // message_id
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'message_id'
    },
    senderId: { // sender_id (Foreign Key to Users table)
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'sender_id'
    },
    receiverId: { // receiver_id (Foreign Key to Users table)
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'receiver_id'
    },
    contentText: { // content text
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'messages',
    timestamps: true,
    underscored: true
  });

  return Message;
};