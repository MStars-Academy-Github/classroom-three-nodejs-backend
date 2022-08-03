const express = require("express");
const router = express.Router();
const categoriesRouter = require("./Routes/categories");
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
app.use("/", router);

// app.get("/", (req, res) => {
//   res.send("my app is running ");
// });

app.listen(PORT, () => {
  console.log("my app is running");
});
