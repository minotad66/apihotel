const Chat = require("./models/chat");

module.exports = function(io) {
  let users = {};

  io.on("connection", async socket => {
    console.log("se conecto alguien");

    let message = await Chat.find({}).limit(8);

    socket.emit("load old msgs", message);

    socket.on("send message", async (data, cb) => {
      let msg = data.trim();

      if (msg.substr(0, 3) === "/w ") {
        msg = msg.substr(3);
        const index = msg.indexOf(" ");
        if (index !== -1) {
          let name = msg.substring(0, index);
          msg = msg.substring(index + 1);
          if (name in users) {
            users[name].emit("whisper", {
              msg,
              nick: socket.nickname
            });
          } else {
            cb("Error! ingresa un usuario activo");
          }
        } else {
          cb("Error! ingresa el mensaje");
        }
      } else {
        let newMsg = new Chat({
          msg,
          nick: socket.nickname
        });
        await newMsg.save();
        io.sockets.emit("new message", {
          msg: data,
          nick: socket.nickname
        });
      }
    });

    socket.on("new user", (data, cb) => {
      if (data in users) {
        cb(false);
      } else {
        cb(true);
        socket.nickname = data;
        users[socket.nickname] = socket;
        updateNicknames();
      }
    });

    socket.on("disconnect", data => {
      if (!socket.nickname) return;
      delete users[socket.nickname];
      updateNicknames();
    });

    function updateNicknames() {
      io.sockets.emit("usernames", Object.keys(users));
    }
  });
};
