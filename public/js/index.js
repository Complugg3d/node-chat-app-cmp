var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'me@yes.com',
  //   text: 'testing mail'
  // });
  socket.emit('createMessage', {
    from: 'me@yes.com',
    text: 'testing mail'
  });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// socket.on('newEmail', function (email) {
//   console.log('New Email', email);
// });

socket.on('newMessage', function (msg) {
  console.log('New message', msg);
});
