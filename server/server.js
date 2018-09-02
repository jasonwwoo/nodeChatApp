const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const express = require("express");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const { generateMessage, generateLocationMessage } = require("./utils/message");

//newMessage handles the message creation and sending process
//createMessage is from the user, and when called emits newMessage
app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected to server");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the Chat App!")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "A new user has joined the Chat Group.")
  );

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
  });

  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", () => {
    console.log("Could not find Client connection");
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
