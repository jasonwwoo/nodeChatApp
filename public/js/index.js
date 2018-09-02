const socket = io();

socket.on("connect", () => {
  console.log("Client connected to server");
});

socket.on("newMessage", newMessage => {
  console.log("newMessage", newMessage);
  const li = document.createElement("li");
  const ol = document.querySelector("#messages");
  li.textContent = `${newMessage.from}: ${newMessage.text} `;
  ol.appendChild(li);
});

socket.on("disconnect", () => {
  console.log("Client disconnected from server");
});

document.querySelector("#message-form").addEventListener("submit", function(e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: document.querySelector("[name=message]").value
    },
    function() {}
  );
});

//ack allows listener to send back data to emitter

// EMAIL EXAMPLE
//   socket.emit("createdEmail", {
//     to: "jen@jen.com",
//     text: "Hey Jen!"
//   });
// });
// socket.on("newEmail", email => {
//   console.log("New Email Event", email);
// });
