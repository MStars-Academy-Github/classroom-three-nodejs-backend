const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT;
const MONGO_DB = process.env.ATLAS_MONGO_CONNECTION;

app.get("/", (req, res) => {
  res.json("root path");
});

io = socketIO(server);

io.on("connection", (socket) => {
  socket.on("join", ({ username }, callback, err) => {
    if (err) {
      callback(err);
    } else {
      const roomID = 123;
      socket.join(roomID);
      console.log(username);
    }
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
  socket.on("input-change", (msg, callback, err) => {
    if (err) {
      callback(err);
    } else {
      console.log(msg);
    }
  });
});

const start = async () => {
  try {
    mongoose.connect(MONGO_DB, () => {
      console.log("DB is connected succesfully");
    });
    server.listen(PORT, () => {
      console.log(`Listening on PORT = ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
