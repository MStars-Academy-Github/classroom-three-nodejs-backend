const express = require("express");

const app = express();
app.use(express.json());

const roleRoute = express.Router();
app.use("/role", roleRoute);

const role = require("../service/role");

roleRoute.get("/", async (req, res, next) => {
  try {
    res.json(await role.getAllRole());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

roleRoute.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await role.insertRole(params));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

roleRoute.put("/", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(req.body);
    res.json(await role.UpdateRole(params));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

roleRoute.get("/:id", async (req, res, next) => {
  const params = req.params;
  // console.log(req.params);
  // console.log(id);
  try {
    res.json(await role.getRoleById(params));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});


roleRoute.delete("/", async (req, res, next) => {
  try {
    const params = req.body;
    // console.log(params);
    res.json(await role.deleteRole(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});


module.exports = roleRoute;
