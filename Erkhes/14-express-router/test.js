const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();
const PORT = process.env.PORT;

router.get(
  "/userinfo/:id",
  (req, res, next) => {
    const id = req.params.id;
    if (id < 10) {
      const err = new Error("Can\t find user with this ID!");
      err.status = "fail";
      err.statusCode = 500;
      return next(err);
    }
    res.send("User Info with ID " + id);
  },
  function (err, req, res, next) {
    res.status(404).json({ "message ": err.status });
  }
);
router.use("/user", (req, res, next) => {
  res.send("User Info");
});
// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Can't find ${req.originalUrl} on this server`,
//   });
// });
app.use("/", router);
app.listen(PORT);
