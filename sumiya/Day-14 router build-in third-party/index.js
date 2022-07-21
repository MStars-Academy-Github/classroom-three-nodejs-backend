const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();
const port = process.env.PORT;

router.get("/userinfo/:id", (req, res, next) => {
  const id = req.params.id;
  if (id < 0) {
    const err = new Error("cant find user with this Id!");
    err.status = "fail";
    err.statusCode = 500;
    return next(err);
  }
  res.send("user info with ID" + id);
});
router.use("/user", (req, res, next) => {
  res.send("user info");
});
// router.use("/users", (err, req, res, next) => {
//   res.status(500).send("something wrong");
//   if (err) {
//     console.error(err);
//   }
// });

// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Cant find ${req.originalUrl} on this server`,
//   });
// });

app.use("/", router);

app.listen(port);
