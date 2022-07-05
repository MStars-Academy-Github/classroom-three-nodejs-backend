const https = require("https");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

https.get("https://ghibliapi.herokuapp.com/films", (res) => {});
