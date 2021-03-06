const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

var publiPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publiPath));//middleware

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.on('join', (params, callback) => {

    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    } else if (users.isUserInRoom(params.name, params.room)) {
      return callback('User already in group please join another');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //io.emit() -> io.to(room).emit()
    //socket.broadcast.emt() -> socket.broadcast.to(room).emit
    //socket.emit

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  socket.on('roomSearch', (pattern, callback) => {
    console.log(pattern);
    callback(users.getRoomsList());
  });

  socket.on('privateMessage', (params, callback) => {
    var user = users.isUserInRoom(params.messageTo, params.room);
    var sender = users.getUser(socket.id);

    io.to(user.id).emit('newPrivateMessage', {
      from: sender.name,
      msg:params.msg
    });
    callback();
  });
  // socket.emit('newEmail', {
  //   from: 'some@we.com',
  //   text: 'hello',
  //   createdAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });
  socket.on('createMessage', (newMessage, callback) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(newMessage.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }
    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));

      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
    console.log('disconnected from client');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
