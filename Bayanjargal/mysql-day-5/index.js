const express = require("express");
const categoryRouter = require("./routes/categories");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/category", categoryRouter);

// app.get("/", (req, res) => {
//   res.send("My app is running");
// });
app.listen(PORT, () => {
  console.log("my app is runnig");
});
