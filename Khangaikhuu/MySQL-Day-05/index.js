const express = require("express");
require("dotenv").config();

const cors = require("cors");

const categoryRouter = require("./routes/categories");
const foodRouter = require("./routes/foods");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/categories", categoryRouter);
app.use("/foods", foodRouter);

app.get("/", (req, res) => {
  res.send("My app is running");
});

app.listen(PORT, () => {
  console.log("My App is running");
});
