const express = require("express");
require("dotenv").config();

const cors = require("cors");

const categoryRouter = require("./controller/categories");
const foodRouter = require("./controller/foods");
const authenticationController = require("./controller/AuthenticationController");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/categories", categoryRouter);
app.use("/foods", foodRouter);
app.use("/api", authenticationController);

app.get("/", (req, res) => {
  res.send("My app is running");
});

app.listen(PORT, () => {
  console.log("My App is running");
});
