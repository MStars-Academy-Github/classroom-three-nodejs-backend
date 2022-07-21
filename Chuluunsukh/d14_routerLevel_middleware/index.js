const express = require("express");
const app = express();
var router = express.Router();
require("dotenv").config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>Hey</h1>");
});
router.use(function (err, req, res, next) {
  res.status(500).send("Something broke!");
});

// error handling section

// router.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Can't find ${req.originalUrl} on this server!`,
//   });
// });

router.get("/userid/:id", function (req, res, next) {
  const id = req.params.id;
  if (id < 0) {
    const err = new Error.apply(`Can\'t find user with this ID!`);
    err.status = "fail";
    err.statusCode = 500;
    return next(err);
  }
  res.send("User info with ID" + id);
});
router.get(
  "/user1/:id",
  function (req, res, next) {
    const id = req.params.id;
    if (id < 10) {
      const err = new Error("Can't find user with this ID!");
      err.status = "fail";
      next(err);
    }
    res.send("User Info with ID" + id);
  },
  function (err, req, res, next) {
    res.status(500).json({ message: err.status });
  }
);
router.get("/userinfo/:id", function (req, res, next) {
  res.send("user info with ID");
});
router.use("/user", function (req, res, next) {
  res.send("user info ");
});
app.use("/", router);
app.listen(3000, () => {
  "Express server is starting";
});
