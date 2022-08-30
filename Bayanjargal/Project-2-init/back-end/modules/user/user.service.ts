import mongoose from "mongoose";
import User from "./user.module";

export const createUser = async (body: any) => {
  return User.create(body);
};
