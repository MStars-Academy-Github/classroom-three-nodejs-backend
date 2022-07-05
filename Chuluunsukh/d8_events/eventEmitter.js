const EventEmitter = require("events");
const thisEmitter = new EventEmitter();

thisEmitter.on("start", () => {
  console.log("started");
});
thisEmitter.emit("start");
