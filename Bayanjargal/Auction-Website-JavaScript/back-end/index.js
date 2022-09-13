const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Roles = require("./role.model");
const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;
const ATLAS_MONGO_CONNECTION = process.env.ATLAS_MONGO_CONNECTION;

app.post("/roles/create", async (req, res) => {
  const roles = new Roles(req.body);
  console.log(roles);
  try {
    const role = await roles.save();
  } catch (err) {
    res.json({
      error: err,
    });
  }
});
app.get("/", (req, res) => {
  res.json({
    data: "im here",
  });
});

mongoose.connect(ATLAS_MONGO_CONNECTION).then(() => {
  console.log("Connected to the mongoDB");
  app.listen(3000, () => {
    console.log("Server express started port " + PORT);
  });
});
