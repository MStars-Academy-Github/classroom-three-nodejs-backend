const https = require("https");

https
  .get("https://ghibliapi.herokuapp.com/films", (res) => {
    console.log(res.statusCode);
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const convertedData = JSON.parse(Buffer.concat(data).toString());
      console.log(convertedData);
    });
  })
  .on("error", (err) => {
    console.error("Error %s"), err.message;
  });
