const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const express = require("express");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = new Users();

//newMessage handles the message creation and sending process
//createMessage is from the user, and when called emits newMessage
app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected to server");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback("Name and room name are required");
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the Chat App!")
    );
    socket.broadcast
      .to(params.room)
      .emit("newMessage", generateMessage("Admin", `${params.name} joined`));

    callback();

    // socket.join(params.room, () => {
    //   socket.emit(
    //     "newMessage",
    //     generateMessage("Admin", "Welcome to the Chat App!")
    //   );

    //   socket.broadcast
    //     .to(params.room)
    //     .emit("newMessage", generateMessage("Admin", `${params.name} joined`));
    // });
    // callback();
  });

  socket.on("createMessage", (message, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        "newMessage",
        generateMessage(user.name, message.text)
      );
    }
    callback();
  });

  socket.on("createLocationMessage", (coords, callback) => {
    const user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
  });

  socket.on("disconnect", () => {
    let removedUser = users.removeUser(socket.id);

    if (removedUser) {
      io.to(removedUser.room).emit(
        "updateUserList",
        users.getUserList(removedUser.room)
      );
      io.to(removedUser.room).emit(
        "newMessage",
        generateMessage("Admin", `${removedUser.name} has left`)
      );
    }
  });
});

server.listen(port, console.log(`NodeChatApp running on PORT:${port}`));
// EMAIL EXAMPLE
// socket.emit("newEmail", {
//   createdAt: 1276371423,
//   from: "bob@bob.com",
//   text: "Hey there wuz good"
// });
// socket.on("createdEmail", newEmail => {
//   console.log(newEmail);
// });
