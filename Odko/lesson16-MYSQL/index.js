const express = require("express");
require("dotenv").config();

const categoryRouter = require("./routes/categories");

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// router.get("/", (req, res, next) => {

//   res.send("Node client bolgohin tuld mysql2-iig suulgana");
// });

app.use("/category", categoryRouter);
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Request-Method", "*");
res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "*");

app.listen(PORT, () => {
  console.log("my apddddp");
});
