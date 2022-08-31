import express, { Router } from "express";
import userRoute from "./user.route";

const router = express.Router();
interface IRoute {
  path: string;
  route: Router;
}

router.use("/users", userRoute);

export default router;
