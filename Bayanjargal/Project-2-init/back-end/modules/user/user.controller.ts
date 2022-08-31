import { NextFunction, Response, Request } from "express";
import * as userService from "./user.service";
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userService.createUser(req.body);
  res.send(user);
  console.log(user);
};
export const LoginUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  // const resulst = await userService.LoginUser(req.body);
  // res.send("login");
};
