import mongoose from "mongoose";

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
};
