const EventEmitter = require("events");
const EventEmitter = new EventEmitter();

EventEmitter.on("start", () => {
  console.log("started");
});

EventEmitter.EventEmitter("start");
