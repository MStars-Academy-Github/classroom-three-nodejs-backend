const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Roles = require("./role.model");

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;
const ATLAS_MONGO_SERVER = process.env.ATLAS_MONGO_CONNECTION;

app.post("/roles/create", async (req, res) => {
  const roles = new Roles({
    role_name: req.body.role_name,
    role_status: req.body.role_status,
  });

  console.log(roles);

  try {
    const role = await roles.save();
    res.json({
      data: "create",
    });
  } catch (error) {
    res.json({
      error: "error",
    });
  }
});

app.post("/roles", async (req, res) => {
  const roles = await Roles.find();
  res.json({
    data: "roles",
  });
});

app.put("/roles/update", async (req, res) => {
  console.log(req.body);
  console.log(req.query);

  const { id } = req.query;

  await Roles.findByIdAndUpdate(id, req.body);
  console.log(role);

  res.json({
    data: role,
  });
});

app.get("/", (req, res) => {
  res.json({
    data: "I'm here",
  });
});

mongoose.connect(ATLAS_MONGO_SERVER).then(() => {
  console.log("Connected to the MongoDB");
  app.listen(PORT, () => {
    console.log("Server is running on : " + PORT);
  });
});
