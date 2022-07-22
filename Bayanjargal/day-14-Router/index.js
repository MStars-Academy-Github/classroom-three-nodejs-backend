const express = require("express");
var router = express.Router();
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  "Express starting ";
});
router.get("/userInfo/:id", (req, res, next) => {
  res.send("user info with ID");
});

router.use("/user", (req, res, next) => {
  //   res.status(500).send("something broke");
  res.send("User Info");
});
app.use("/", router);
// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Can't find ${req.originalUrl} on this server`,
//   });
// });
router.get("/userid/:id", (req, res, next) => {
  const id = req.params.id;
  if (id < 0) {
    const err = new Error("Can\t find user with this ID!");
    err.status = "fail";
    err.statusCode = 500;
    return next(err);
  }
  res.send("User Info whith" + id);
});
router.get(
  "/user1/:id",
  (req, res, next) => {
    const id = req.params.id;
    if (id < 10) {
      const err = new Error("Can\t find user with this ID!");
      err.status = "fail";
      err.statusCode = 500;
      return next(err);
    }
    res.send("User Info whith" + id);
  },
  (err, req, res, next) => {
    res.status(500).json({
      message: err.status,
    });
  }
);
