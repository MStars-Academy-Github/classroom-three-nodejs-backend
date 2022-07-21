const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();
const PORT = process.env.PORT;

router.get("/userinfo/:id", (req, res, next) => {
  const id = req.params.id;
  if (id < 0) {
    const err = new Error("Can't find user with this ID!");
    err.status = "fail";
    err.statusCode = 500;
    return next(err);
  }
  res.send("User Info with ID " + id);
});

router.get(
  "/user1/:id",
  (req, res, next) => {
    const id = req.params.id;
    if (id < 10) {
      const err = new Error("Cant find user with this ID!");
      err.status = "fail";
      next(err);
    }
    res.send("User Info with ID " + id);
  },
  (err, req, res, next) => {
    res.status(500).json({ message: err.status });
  }
);
router.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("Running");
});
