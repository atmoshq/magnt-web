var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var magnetMe;

app.get('/chat/', function(req, res){
  magnetMe = req.query.magnet;
  console.log(magnetMe);
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.myMagnet = magnetMe;
  socket.on('chat message', function(msg){
    socket.myMagnetMsg = {
      magnet: socket.myMagnet,
      message: msg
    };
    io.emit('chat-in', socket.myMagnetMsg);
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
