const socket = io();

socket.on("connect", () => {
  console.log("Client connected to server");
});

socket.on("newMessage", newMessage => {
  console.log("newMessage", newMessage);
});

socket.on("disconnect", () => {
  console.log("Client disconnected from server");
});

// EMAIL EXAMPLE
//   socket.emit("createdEmail", {
//     to: "jen@jen.com",
//     text: "Hey Jen!"
//   });
// });
// socket.on("newEmail", email => {
//   console.log("New Email Event", email);
// });
