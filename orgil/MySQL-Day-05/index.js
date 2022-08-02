const express = require("express");
require("dotenv").config();
const cors = require("cors");

const categoryRouter = require("./routes/categories");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("My shit is running");
});

app.listen(PORT, () => {
  console.log("My shit is running");
});
