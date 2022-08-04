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
foodrouter.post("/insertfood", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await food.createFood(params));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
foodrouter.delete("/deletefood", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await food.deletefood(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

foodrouter.put("/updatefood", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await food.updateFood(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = foodrouter;
