const express = require("express");
require("dotenv").config();
const cors = require("cors");

const categoryRouter = require("./routes/categories");

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// router.get("/", (req, res, next) => {

//   res.send("Node client bolgohin tuld mysql2-iig suulgana");
// });
app.use(cors());
app.use("/category", categoryRouter);

app.listen(3003, () => {
  console.log(3003);
});
