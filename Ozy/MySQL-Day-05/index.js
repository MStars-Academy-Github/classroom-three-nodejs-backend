const express = require("express");
const app = express();
require("dotenv").config();
const categoryRouter = require("./routes/categories");
const PORT = process.env.PORT;

app.use(express.json());
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(PORT, () => {
  console.log("Running");
});
