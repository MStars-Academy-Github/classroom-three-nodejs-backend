const express = require("express");
const router = express.Router();
const app = express();
require("dotenv").config();
const categoryRouter = require("./routes/categories");
const foodRouter = require("./routes/foods");
const loginRouter = require("./routes/users");
const userRoleRouter = require("./routes/usersRole");
const PORT = process.env.PORT;
const cors = require("cors");

app.use(express.json());
app.use("/api/categories", cors(), categoryRouter);
app.use("/api/foods", cors(), foodRouter);
app.use("/login", cors(), loginRouter);
app.use("/userrole", cors(), userRoleRouter);

app.get("/", (req, res) => {
  res.send("My app is running");
});

app.listen(PORT, () => {
  console.log("MY app is running");
});
