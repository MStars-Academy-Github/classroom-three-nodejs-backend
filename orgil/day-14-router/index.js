const express = require("express");
const app = express();

var router = express.Router();
router.post("/users", (req, res, next) => {
  res.send("first router");
});
router.post("/users", (req, res, next) => {
  res.send("second router");
});
router.get(
  "/userinfo/:id",
  (req, res, next) => {
    const id = req.params.id;
    if (id < 10) {
      const err = new Error(`Can't find user with this ID!`);
      err.status = "fail";
      err.statusCode = 500;
      return next(err);
    }
    res.send("User Info with ID " + id);
  },
  (err, req, res, next) => {
    res.status(500).json({ message: err.status });
  }
);
router.use("/user", (req, res, next) => {
  res.send("User Info");
});
app.use("/", router);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(3000);
