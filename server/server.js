const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publiPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publiPath));//middleware

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket.emit('newEmail', {
  //   from: 'some@we.com',
  //   text: 'hello',
  //   createdAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User joined',
    createdAt: new Date().getTime()  
  });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('disconnected from client');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
