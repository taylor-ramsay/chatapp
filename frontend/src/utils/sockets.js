import io from 'socket.io-client';
const socket = io('http://localhost:5000/');

const setConnectedChat = (chatId) => {
  socket.emit('setConnectedChat', { chatId });
};

const subscribeToChat = (cb) => {
  socket.on('news', (res) => {
    cb(null, res);
  });
};

const transmitMessage = (msg) => {
  socket.emit('transmitMessage', msg);
};

const sendPrivateMessage = (msg) => {
  socket.emit('sendPrivateMessage', msg);
};

const subscribeToPrivateMessage = (cb) => {
  socket.on('subscribeToPrivateMessage', (res) => {
    cb(null, res);
  });
};

export { subscribeToChat, transmitMessage, setConnectedChat, sendPrivateMessage, subscribeToPrivateMessage };