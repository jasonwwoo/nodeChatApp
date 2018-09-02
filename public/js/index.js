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

socket.on("newLocationMessage", message => {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.textContent = "My current Location";
  a.setAttribute("target", "_blank");

  li.textContent = `${message.from}: `;
  a.setAttribute("href", message.url);
  li.appendChild(a);
  document.querySelector("#messages").appendChild(li);
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

const locationButton = document.querySelector("#send-location");
locationButton.addEventListener("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition(
    position => {
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      alert("Unable to fetch location");
    }
  );
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
