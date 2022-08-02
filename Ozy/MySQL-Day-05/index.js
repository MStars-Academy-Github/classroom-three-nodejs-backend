const express = require("express");
const app = express();
require("dotenv").config();
const categoryRouter = require("./routes/categories");
const PORT = process.env.PORT;
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log("Runnig -> " + PORT);
});
