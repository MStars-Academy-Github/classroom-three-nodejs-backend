import mongoose from "mongoose";
import { getUserByEmail } from "../user/user.service";

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new Error("Incorrect email or password");
  }
  return user;
};
