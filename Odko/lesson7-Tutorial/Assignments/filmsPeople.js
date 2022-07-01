const https = require("https");
const fs = require("fs");
const util = require("util");

const getPeople = util.promisify(https.get);
const readFile = util.promisify(fs.readFile);

function peopleServer() {
  getPeople("https://ghibliapi.herokuapp.com/people", (res) => {
    // console.log(res);
    let data = [];
    let data2 = [];
    let link;
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const covertData = JSON.parse(Buffer.concat(data).toString());
      readFile("data/people.json", "utf-8")
        .then((text) => {
          const filmArray = JSON.parse(text);
          link = filmArray.map((a) => {
            getPeople(a.films[0], (res) => {
              res.on("data", (chunk) => {
                data2.push(chunk);
              });
              res.on("end", () => {
                return (a.image = JSON.parse(Buffer.concat(data2).toString()));
                // console.log(JSON.parse(data2));
              });

              console.log(a);
            });
          });
        })
        .catch((err) => console.log(err));

      // fs.readFile("data/people.json", "utf-8", (err, data) => {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     data = covertData;
      //     fs.writeFile("data/people.json", JSON.stringify(data), (err) => {
      //       if (err) {
      //         console.error(err);
      //       } else {
      //         console.log("success");
      //       }
      //     })
      //   }
      // });
    });
  })
    .then((data) => {
      // console.log(data);
    })
    .catch((err) => {
      console.log("Error", err);
    });

  // https
  //   .get("https://ghibliapi.herokuapp.com/people", (res) => {
  //     let data = [];
  //     res.on("data", (chunk) => {
  //       data.push(chunk);
  //     });
  //     res.on("end", () => {
  //       const covertData = JSON.parse(Buffer.concat(data).toString());
  //       fs.readFile("data/people.json", "utf-8", (err, data) => {
  //         if (err) {
  //           console.error(err);
  //         } else {
  //           data = covertData;
  //           fs.writeFile("data/people.json", JSON.stringify(data), (err) => {
  //             if (err) {
  //               console.error(err);
  //             } else {
  //               console.log("success");
  //             }
  //           });
  //         }
  //       });
  //     });
  //   })
  //   .on("error", (err) => {
  //     console.error("error %s", err.message);
  //   });
}

// peopleServer();
module.exports = peopleServer;
