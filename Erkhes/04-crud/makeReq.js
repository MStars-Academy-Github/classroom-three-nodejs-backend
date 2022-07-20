const https = require("https");

https
  .get("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const ddata = JSON.parse(Buffer.concat(data).toString());
      console.log(ddata);
    });
  })
  .on("error", (err) => {
    console.error("err %s", err.message);
  });
