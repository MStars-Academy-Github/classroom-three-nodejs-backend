const express = require("express");

const categoriesRouter = require("./controller/categories");
const foodrouter = require("./controller/food");
const user = require("./controller/user");
const role = require("./controller/role");
const api = require("./controller/AunthenticationController");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const cors = require("cors");
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(express.json());

app.use("/category", categoriesRouter);
app.use("/food", foodrouter);
app.use("/user", user);
app.use("/api", api);
app.use("/role", role);

// app.get("/", (req, res) => {
//   res.send("my app is running ");
// });

app.listen(PORT, () => {
  console.log("my app is running");
});
