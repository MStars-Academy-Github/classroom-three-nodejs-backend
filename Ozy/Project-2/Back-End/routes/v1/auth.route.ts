import express, { Router } from "express";
import { authController } from "../../modules/auth";

const router: Router = express.Router();
router.post("/login", authController.loginUser);

export default router;
