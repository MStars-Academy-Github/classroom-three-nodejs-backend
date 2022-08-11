const express = require("express");
const categoryRouter = require("./controller/categories");
const foodsRouter = require("./controller/foodapi");
const AuthenticationController = require("./controller/AuthenticationController.js");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "DELETE", "PUT", "POST"],
  })
);
app.use("/category", categoryRouter);
app.use("/foods", foodsRouter);
app.use("/user", AuthenticationController);

app.listen(PORT, () => {
  console.log("my app is runnig");
});
