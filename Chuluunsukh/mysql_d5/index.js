const express = require("express");
require("dotenv");
const cors = require("cors");

const categoryRouter = require("./routes/categories");
const PORT = process.env.PORT;
const app = express();
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.json());
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("My app is running");
});

app.listen(PORT, () => {
  console.log("My app is running ", PORT);
});
