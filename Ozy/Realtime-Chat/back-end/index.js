const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const MONGO_SERVER = process.env.ATLAS_MONGO_SERVER;
const socketIo = require("socket.io");
const cors = require("cors");

const http = require("http");
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.json("root path");
});

io = socketIo(server);
io.on("connection", (socket) => {
  socket.on("join", ({ userName }, callback, error) => {
    if (error) {
      callback(error);
    } else {
      const roomId = 123;
      socket.join(roomId);
      console.log(userName);
    }

    socket.on("inputChange", ({ value }, callback, error) => {
      if (error) {
        callback(error);
      } else {
        console.log(value);
      }
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
});

mongoose
  .connect(MONGO_SERVER)
  .then(() => {
    console.log("Conneted MongoDB");
    server.listen(PORT, () => {
      console.log("Server running at " + PORT);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
