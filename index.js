const express = require("express");
const app = express();
const path = require("path");

//setting
app.set("port", process.env.PORT || 8000);

//static files
app.use(express.static(path.join(__dirname, "public")));

//start the server
const server = app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

//socket
const SocketIo = require("socket.io");
const io = SocketIo(server);

//web socket
io.on("connection", socket => {
  console.log("new connection", socket.id);
  socket.on("chat:message", data => {
    io.sockets.emit('chat:message', data)
  });
  socket.on('chat:typing', (data) => {
      socket.broadcast.emit('chat:typing', data)
      
  })
});
