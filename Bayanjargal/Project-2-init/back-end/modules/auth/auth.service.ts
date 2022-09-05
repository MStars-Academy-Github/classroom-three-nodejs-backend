import { IUserDoc } from "../../modules/user/user.interface";
import { getUserByEmail } from "../../modules/user/user.service";

export const loginUser = async (
  email: string,
  password: string
): Promise<IUserDoc> => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new Error("Incorrect email or password");
  }
  return user;
};
