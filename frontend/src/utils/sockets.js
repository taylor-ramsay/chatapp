import io from 'socket.io-client';
const socket = io('http://localhost:5000/');

const subscribeToChat = (cb) => {
  socket.on('news', (res) => {
    cb(null, res);
  });
};

const transmitMessage = (msg) => {
  socket.emit('transmitMessage', msg);
};

export { subscribeToChat, transmitMessage };