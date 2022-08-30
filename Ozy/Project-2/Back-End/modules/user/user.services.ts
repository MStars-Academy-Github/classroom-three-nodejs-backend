import mongoose from "mongoose";
import User from "./user.model";

export const createUser = async (body: any) => {
  return User.create(body);
};
