const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE,PATCH",
  })
);
const router = express.Router();
app.use("/category", router);
const categories = require("../service/categories");

router.get("/get", cors(), async (req, res, next) => {
  try {
    res.json(await categories.getAllCategories());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.post("/insert", cors(), async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.createCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
router.delete("/delete", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await categories.deleteCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
router.put("/update", cors(), async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.updateCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
