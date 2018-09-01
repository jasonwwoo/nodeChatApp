const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const express = require("express");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected to server");

  socket.emit("newMessage", {
    from: "friend@friend.com",
    text: "Yo, lets grab dinner",
    createdAt: 12316243
  });

  socket.on("createMessage", message => {
    console.log(message);
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
