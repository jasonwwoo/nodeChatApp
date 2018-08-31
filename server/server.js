const path = require("path");
const express = require("express");

const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port, console.log(`NodeChatApp running on PORT:${port}`));

// app.get("/", (req, res) => {
//   res.send("hello World");
// });
