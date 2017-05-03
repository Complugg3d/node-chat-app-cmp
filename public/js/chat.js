var socket = io();

function scrollToBottom () {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if(err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
  // socket.emit('createEmail', {
  //   to: 'me@yes.com',
  //   text: 'testing mail'
  // });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
  console.log('usersList', users);
  var ol = jQuery('<ol></ol>');
  users.forEach(function (name) {
    ol.append(jQuery('<li></li>').text(name));
  });
  jQuery('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
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
