import express, { Router } from "express";

import userRoute from "./user.route";
import authRoute from "./auth.route";
import medaiRoute from "./media.route";
const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/media", medaiRoute);

export default router;
