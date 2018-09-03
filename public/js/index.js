const socket = io();

socket.on("connect", () => {
  console.log("Client connected to server");
});

socket.on("newMessage", newMessage => {
  const formattedTime = moment(newMessage.createdAt).format("h:mm a");
  let template = document.querySelector("#message-template").innerHTML;
  let html = Mustache.render(template, {
    from: newMessage.from,
    text: newMessage.text,
    createdAt: formattedTime
  });

  document.querySelector("#messages").innerHTML += html;

  // const formattedTime = moment(newMessage.createdAt).format("h:mm a");
  // const li = document.createElement("li");
  // const ol = document.querySelector("#messages");
  // li.textContent = `${newMessage.from} ${formattedTime}: ${newMessage.text} `;
  // ol.appendChild(li);
});

socket.on("newLocationMessage", message => {
  let formattedTime = moment().format("h:mm a");
  let locationTemplate = document.querySelector("#location-message-template")
    .innerHTML;
  let html = Mustache.render(locationTemplate, {
    createdAt: formattedTime,
    from: message.from,
    url: message.url
  });

  document.querySelector("#messages").innerHTML += html;

  // let li = document.createElement("li");
  // let a = document.createElement("a");
  // a.textContent = "My current Location";
  // a.setAttribute("target", "_blank");
  // let formattedTime = moment(message.createdAt).format("h:mm a");
  // // let formattedTime = moment(12 - 25 - 1995, "MM-DD-YYYY");

  // li.textContent = `${message.from} ${formattedTime}: `;
  // a.setAttribute("href", message.url);
  // li.appendChild(a);
  // document.querySelector("#messages").appendChild(li);
});

socket.on("disconnect", () => {
  console.log("Client disconnected from server");
});

document.querySelector("#message-form").addEventListener("submit", function(e) {
  e.preventDefault();
  let messageTextBox = document.querySelector("[name=message]");
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: document.querySelector("[name=message]").value
    },
    function() {
      messageTextBox.value = "";
    }
  );
});

const locationButton = document.querySelector("#send-location");
locationButton.addEventListener("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }
  locationButton.setAttribute("disabled", "disabled");
  locationButton.textContent = "Sending Location...";
  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttribute("disabled");
      locationButton.textContent = "Send Location";
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      locationButton.removeAttribute("disabled");
      locationButton.textContent = "Send Location";
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
