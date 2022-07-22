const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
var router = express.Router();

router.get("/userinfo/:id", function (req, res, next) {
  res.send("user");
});

router.use("/user", function (req, res, next) {
  res.send("user info");
});
// router.get("/userid/:id", function (req, res, next) {
//   const id = req.params.id;
//   if (id < 0) {
//     const err = new Error("Cannot user id");
//     err.status = "fail";
//     err.statusCode = 500;
//     return next(err);
//   }
//   res.send("user info with ID" + " " + id);
// });

router.get(
  "/user1/:id",
  function (req, res, next) {
    const id = req.params.id;
    if (id < 10) {
      const err = new Error("Cannot user id");
      err.status = "fail";
      return next(err);
    }
    res.send("user info with ID" + " " + id);
  },
  function (err, req, res, next) {
    res.status(500).json({ message: err.status });
  }
);

// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Can't fund ${req.originalUrl} on this server`,
//   });
// });

// app.get("/", (req, res) => {
//   res.send("<h1>HI</h1>");
// });

app.use("/", router);
app.listen(3000, () => {
  "Starting";
});
