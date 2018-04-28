var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var chatLog = [];

app.use(express.static('client'));

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    io.emit('message', msg);
  });
});

io.on('connection', function (socket) {
	socket.on('message', function (msg) {
		chatLog.push(msg);
	});
});

//this will specify that any time a new user logs in,
//the system will print out the messages stored in chatLog
io.on('connection', function (socket) {
	for (var i = 0; i < chatLog.length; i++) {
		socket.emit('message', chatLog[i]);
	}
});



server.listen(8080, function() {
  console.log('Chat server running');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
