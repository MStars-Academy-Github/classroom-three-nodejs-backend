const EventEmitter = require("event");
const eventEmitter = new EventEmitter();

// sonsoh baina on - event
eventEmitter.on("start", () => {
  console.log("started");
});

// even emit uusgej baina buutton gesen ug
eventEmitter.emit("start");
