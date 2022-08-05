const express = require("express");

const categoriesRouter = require("./Routes/categories");
const foodrouter = require("./Routes/food");
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

// app.get("/", (req, res) => {
//   res.send("my app is running ");
// });

app.listen(PORT, () => {
  console.log("my app is running");
});
