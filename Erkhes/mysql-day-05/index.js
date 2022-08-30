const express = require("express");
require("dotenv").config();
const router = express.Router();
const cors = require("cors");

const categoryRouter = require("./routes/categories");

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", categoryRouter);

app.get("/", (req, res) => {
  res.send("my app is running");
});

app.listen(PORT);
