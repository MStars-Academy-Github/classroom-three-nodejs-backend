// http https
// backEnd api duudad

const https = require("https");

https
  .get("https://ghibliapi.herokuapp.com/films", (res) => {
    console.log(res.statusCode);
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const covertData = JSON.parse(Buffer.concat(data).toString());
      console.log(covertData);
    });
  })
  .on("error", (err) => {
    console.error("error %s", err.message);
  });
