const express = require('express');
var cors = require('cors');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId

const User = require('./models/User');
const ChatGroup = require('./models/ChatGroup');

//DATABASE
mongoose.connect('mongodb://localhost:27017/chatapp', {
  'useFindAndModify': true,
  'useNewUrlParser': true,
  'useUnifiedTopology': true
});
// mongoose.connect('mongodb://mongo:27017/chatapp');
const db = mongoose.connection;
db.on('open', () => {
  console.log('connected to mongodb!')
});

//SERVER
const app = express();
const port = 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

//MIDDLEWEAR
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//SOCKETS
const io = require('socket.io')(server);
let connectedUsers = {};

io.on('connection', function (socket) {
  socket.on('connectToChat', (data) => {
    connectedUsers[data.userId] = socket;
  });
  socket.on('setConnectedChat', (data) => {
    socket.join(data.chatId);
  });
  socket.on('sendGroupMessage', (data) => {
    io.to(data.chatGroup._id).emit('subscribeToGroupMessage', {
      from: data.from,
      msg: data.msg,
      chatGroup: data.chatGroup
    });
  });
  socket.on('startNewChatGroup', (data) => {
    const chatGroupUsers = data.chatGroup.users;
    chatGroupUsers.map((user) => {
      if (connectedUsers[user.id]) {
        connectedUsers[user.id].emit('joinNewChatGroup', {
          chatGroup: data.chatGroup
        });
      }
    });
  });
});

//ENDPOINTS
app.post('/register', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const existingUser = await User.findOne({
    email: email
  });
  if (existingUser) {
    return res.send('User already exists');
  }
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return res.send('There was a problem');
    }
    const user = new User({
      email,
      password: hash
    });
    await user.save();
    return res.send(user);
  });
});

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if(!email || !password){
    return res.send('Missing email or password.')
  }
  const user = await User.findOne({ email });
  if(!user){
    return res.send('Incorrect credentials, try again.');
  }
  let hash = user.password;
  bcrypt.compare(password, hash, (err, success) => {
    if (success) {
      return res.json(user);
    } else {
      return res.send('Incorrect password');
    }
  });
});

app.post('/logout', (req, res) => {
  return res.send('User is logged out');
});

app.get('/get-users', async (req, res) => {
  const foundUsers = await User.find({});
  const users = foundUsers.map((user) => {
    return { id: user._id, email: user.email }
  });
  return res.json(users);
});

app.post('/create-new-chat-group', async (req, res) => {
  const chatGroup = new ChatGroup({
    users: req.body.users
  });
  await chatGroup.save();
  return res.send(chatGroup);
});

app.get('/get-chat/:id', async (req, res) => {
  const chatId = req.params.id;
  const chat = await ChatGroup.findOne({
    _id: ObjectId(chatId)
  });
  return res.send(chat);
});

app.get('/get-chat-groups/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail;
  const chatGroups = await ChatGroup.find({ 'users': { '$elemMatch': { 'email': userEmail } } });
  return res.send(chatGroups);
});

app.patch('/patch-chat', async (req, res) => {
  const chatId = req.body.chatId;
  const msg = req.body.msg;
  const fromEmail = req.body.fromEmail;
  const newMessage = { fromEmail, msg };
  const chat = await ChatGroup.findByIdAndUpdate(ObjectId(chatId), { '$push': { 'msgHistory': newMessage } });
  return res.send(chat);
});