const express = require("express");
require("dotenv").config();
const cors = require("cors");

const categoryRouter = require("./controller/categories");
const foodsRouter = require("./controller/foods");
const usersRouter = require("./controller/users");
const rolesRouter = require("./controller/roles");
const AuthencationController = require("./controller/AuthencationController");
const transactionRouter = require("./controller/transaction");

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// router.get("/", (req, res, next) => {

//   res.send("Node client bolgohin tuld mysql2-iig suulgana");
// });
app.use(cors());
app.use("/category", categoryRouter);
app.use("/food", foodsRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/api", AuthencationController);
app.use("/trans", transactionRouter);

app.listen(PORT, () => {
  console.log(PORT);
});
