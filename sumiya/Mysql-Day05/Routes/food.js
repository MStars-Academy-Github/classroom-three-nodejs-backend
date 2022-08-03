const express = require("express");

const app = express();
app.use(express.json());

const foodrouter = express.Router();
app.use("/food", foodrouter);

const food = require("../service/food");

foodrouter.get("/getfood", async (req, res, next) => {
  try {
    res.json(await food.getAllFood());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = foodrouter;
