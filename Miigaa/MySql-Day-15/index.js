const express = require("express");
const router = express.Router();
const app = express();
require("dotenv").config();
const categoryRouter = require("./routes/categories");
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/categories", categoryRouter);

app.get("/", (req, res) => {
  res.send("My app is running");
});

app.listen(PORT, () => {
  console.log("MY app is running");
});
