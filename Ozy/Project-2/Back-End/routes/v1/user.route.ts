import express, { Router } from "express";
import { userController } from "../../modules/user";

const router: Router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
export default router;
