import io from 'socket.io-client';
const socket = io('http://localhost:8080/');

const connectToChat = (userId) => {
  socket.emit('connectToChat', { userId });
};

const startNewChatGroup = (chatGroup) => {
  socket.emit('startNewChatGroup', { chatGroup });
};

const subscribeToJoinNewChatGroup = (cb) => {
  socket.on('joinNewChatGroup', (res) => {
    cb(null, res);
  });
};

const setConnectedChat = (chatId) => {
  socket.emit('setConnectedChat', { chatId });
};

const sendGroupMessage = (msg) => {
  socket.emit('sendGroupMessage', msg);
};

const subscribeToGroupMessage = (cb) => {
  socket.on('subscribeToGroupMessage', (res) => {
    cb(null, res);
  });
};

export {
  setConnectedChat, 
  sendGroupMessage,
  subscribeToGroupMessage, 
  connectToChat, 
  startNewChatGroup, 
  subscribeToJoinNewChatGroup
};