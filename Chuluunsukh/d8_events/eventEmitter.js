const EventEmitter = require("events");
const EventEmitter = new EventEmitter();

eventEmitter.on("start", () => {
  console.log("started");
});
eventEmitter.emit("start");
