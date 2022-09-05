import { IUser, IUserDoc } from "./user.interface";
import User from "./user.module";

export const createUser = async (body: any) => {
  console.log("Server to create mongoDb collectin");
  console.log(body);
  return User.create(body);
};
export const getUserByEmail = async (email: string): Promise<IUserDoc | null> =>
  User.findOne({ email });
