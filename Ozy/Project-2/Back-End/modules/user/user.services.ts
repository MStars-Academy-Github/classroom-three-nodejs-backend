import mongoose from "mongoose";
import { IUserDoc } from "./user.interfaces";
import User from "./user.model";

export const createUser = async (body: any) => {
  return User.create(body);
};

export const getUserByEmail = async (email: string): Promise<IUserDoc | null> =>
  User.findOne({ email });
