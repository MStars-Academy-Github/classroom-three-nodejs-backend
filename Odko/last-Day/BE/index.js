const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const socketIO = require("socket.io");

require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_SERVER_ATLAS = process.env.MONGO_SERVER_ATLAS;
app.use(cors());
app.use(express.json());

const http = require("http");
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.json("hi");
});

io = socketIO(server);
io.on("connection", (socket) => {
  socket.on("join", ({ username }, callback, error) => {
    if (error) {
      callback(error);
    } else {
      const roomID = 123;
      socket.join(roomID);
      console.log(username);
    }
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });

  socket.on("inputChange", (msg) => {
    console.log(msg);
  });
});

const start = async () => {
  try {
    mongoose.connect(MONGO_SERVER_ATLAS, () => {
      console.log("DB is connection");
    });
    server.listen(PORT, () => {
      console.log("Running server" + " " + PORT);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

// mongoose.connect(MONGO_SERVER_ATLAS).then(() => {
//   console.log("Mongo server connection");
// });
