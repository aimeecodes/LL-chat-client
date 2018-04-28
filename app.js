var socket = io();

$('form').submit(function () {
	var text = $('#message').val();
	var initials = $('#initials').val();
	socket.emit('message', initials + " says : " +  text);
  $('#message').val('');
  return false;
});

socket.on('message', function (msg) {
  $('<li>').text(msg).appendTo('#history');
});

var chatLog = [0];

socket.on('message', function (msg) {
  $('<li>').text(msg).appendTo('chatLog');
});

socket.on('connection', function (msg) {
	$chatLog.forEach(function (item) {
		socket.emit('message', item);
	})
});