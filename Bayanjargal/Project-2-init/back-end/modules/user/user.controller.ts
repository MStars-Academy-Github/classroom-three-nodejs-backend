import { NextFunction, Response, Request } from "express";
import * as userService from "./user.service";
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userService.createUser(req.body);
  res.send(user);
};
