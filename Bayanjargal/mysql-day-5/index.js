const express = require("express");
const categoryRouter = require("./routes/categories");
const foodsRouter = require("./routes/foodapi");
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
// app.get("/", (req, res) => {
//   res.send("My app is running");
// });
app.listen(PORT, () => {
  console.log("my app is runnig");
});
