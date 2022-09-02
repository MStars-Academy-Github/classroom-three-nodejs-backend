import { Request, Response } from "express";
import * as userService from "./user.services";

export const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const user = await userService.createUser(req.body);
  res.send(user);
};
