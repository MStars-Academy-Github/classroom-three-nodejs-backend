const express = require("express");

const app = express();
app.use(express.json());

const userRoute = express.Router();
app.use("/user", userRoute);

const user = require("../service/user");

userRoute.get("/", async (req, res, next) => {
  try {
    res.json(await user.getAllUser());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

userRoute.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await user.insertUser(params));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

userRoute.put("/", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(req.body);
    res.json(await user.UpdateUser(params));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

userRoute.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(req.params);
  console.log(id);
  try {
    res.json(await user.getUserById(id));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

userRoute.delete("/", async (req, res, next) => {
  try {
    const params = req.body;
    // console.log(params);
    res.json(await user.deleteUser(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = userRoute;
