const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const router = express.Router();

router.get("/user", (req, res, next) => {
  res.send("User Info with ID");
});

router.use("/admin", (req, res, next) => {
  res.send("User Info");
});
// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Can't fund ${req.originalUrl} on this server!`,
//   });
// });

router.get("/userid/:id", (req, res, next) => {
  const id = req.params.id;
  if (id < 0) {
    const err = new Error("Cant find user with this ID!");
    err.status = "fail";
    err.statusCode = 500;
    return next(err);
  }
  res.send("err");
});

router.get(
  "/user1/:d",
  (req, res, next) => {
    const id = req.params.id;
    if (id < 10) {
      const err = new Error("Can't find user with this ID!");
      err.status = "fail";
      next(err);
    }
    res.send("User Info with ID" + id);
  },
  (err, req, res, next) => {
    res.status(500).json({ message: err.status });
  }
);

app.use("/", router);

app.listen(PORT);
