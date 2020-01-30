const mongoose = require('mongoose');

const chatGroupSchema = new mongoose.Schema({
  users: [{
    id: String,
    email: String
  }],
  msgHistory: [{
    fromEmail: String,
    msg: String
  }]
});

const ChatGroup = mongoose.model('ChatGroup', chatGroupSchema);

module.exports = ChatGroup;