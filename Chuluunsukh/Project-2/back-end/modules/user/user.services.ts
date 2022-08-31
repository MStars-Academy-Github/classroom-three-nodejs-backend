import mongoose from "mongoose";
import User from "./user.model";
import { IUserDoc } from "./user.interfaces";

export const createUser = async (body: any) => {
  console.log("User service layer");
  console.log(body);
  return User.create(body);
};

export const getUserByEmail = async (email: string): Promise<IUserDoc | null> =>
  User.findOne({ email });
