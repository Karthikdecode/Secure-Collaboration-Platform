// models/OnlineUser.js
const mongoose = require('mongoose');

const onlineUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  socketId: String,
  lastActive: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('OnlineUser', onlineUserSchema);
