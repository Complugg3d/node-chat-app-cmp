var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
  // socket.emit('createEmail', {
  //   to: 'me@yes.com',
  //   text: 'testing mail'
  // });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// socket.on('newEmail', function (email) {
//   console.log('New Email', email);
// });

socket.on('newMessage', function (msg) {
  var formatedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();

  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formatedTime
  });

  jQuery('#messages').append(html);
});

// socket.emit('createMessage', {
//   from: 'Ram',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

socket.on('newLocationMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();

  var html = Mustache.render(template, {
    createdAt: formatedTime,
    from: message.from,
    url: message.url
  });

  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disable').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (posistion) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: posistion.coords.latitude,
      longitude: posistion.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fecth location');
  });
});
