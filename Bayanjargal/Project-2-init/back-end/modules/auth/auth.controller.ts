import { Request, Response } from "express";
import * as authService from "./auth.service";
import { tokenService } from "../token";
export const loginUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  const tokens = await tokenService.generateAuthToken(user);
  res.send({ user, tokens });
};
