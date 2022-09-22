const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_DB = process.env.ATLAS_MONGO_SERVER;

const app = express();
app.use(cors());
const http = require("http");
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.json("root path");
});

io = socketIO(server);

io.on("connection", (socket) => {
  //   socket.on("join", ({ username }, callback, error) => {
  //     if (error) {
  //       callback(error);
  //     } else {
  //       const roomId = 123;
  //       socket.join(roomId);
  //       console.log(username);
  //     }
  //     socket.on("disconnect", () => {
  //       console.log("disconnected");
  //     });
  //   });

  socket.on("inputchange", ({ value }, callback, error) => {
    if (error) {
      callback(error);
    } else {
      console.log(value);
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
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
