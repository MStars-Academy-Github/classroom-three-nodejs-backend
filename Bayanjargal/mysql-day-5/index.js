const express = require("express");
const categoryRouter = require("./routes/categories");
const foodsRouter = require("./routes/foodapi");
const userRouter = require("./routes/user");
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
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("my app is runnig");
});
