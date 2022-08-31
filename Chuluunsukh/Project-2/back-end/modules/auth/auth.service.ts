import mongoose from "mongoose";
import { getUserByEmail } from "../user/user.services";

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
};
