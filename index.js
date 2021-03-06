var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  io.on('connection', function(socket){
  socket.on('chatmessage', function(msg){
    console.log('message: ' + msg);
    io.emit('chatmessage', msg);
  });
});
});

http.listen(1337,'127.0.0.1',function(){
  console.log('listening on *:3000');
});
