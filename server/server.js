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

  socket.on('disconnect', () => {
    console.log('disconnected from client');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
