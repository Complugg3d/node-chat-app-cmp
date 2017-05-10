var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

var rooms = jQuery("#rooms");

rooms.autocomplete({
  source:[]
});

rooms.keypress(function () {
  console.log('entro');
  socket.emit('roomSearch', rooms.val(), function (roomsList) {
    console.log(roomsList);
    rooms.autocomplete('option', { source: roomsList });
  });
});
