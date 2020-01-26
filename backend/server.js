const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatapp');
const db = mongoose.connection;
const User = require('./models/User');

const app = express();
app.use(cors());

const port = 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const io = require('socket.io')(server);

const connectedUsers = {};

db.on('open', () => {
  console.log('connected to mongodb!')
});

io.on('connection', function (socket) {

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log("data", data);
  });
});

app.post('/register', async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  await user.save();
  res.send(user);
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (user) {
    res.json(user);
  } else {
    res.send('Incorrect credentials, try again.')
  }
});

