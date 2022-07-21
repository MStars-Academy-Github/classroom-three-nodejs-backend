const express = require("express");
const fs = require("fs");

const app = express();

app.get("/users/:userId/books/:bookid", (req, res) => {
  res.send(req.params);
  const user = req.params;

  fs.readFile("./data/user.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let dataJson = JSON.parse(data);
      dataJson.push(user);
      dataJson.map((u) => {
        if (u.userId === user.userId) {
          console.log(user);
        }
      });

      //   fs.writeFile("./data/user.json", JSON.stringify(dataJson), (err) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log("success");
      //     }
      //   });
    }
  });
});
app.listen(3000);
