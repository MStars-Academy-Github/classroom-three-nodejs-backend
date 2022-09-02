import mongoose, { Schema } from "mongoose";
import { IUserDoc, IUserModel } from "./user.interface";
import bcrypt from "bcryptjs";
/**
 * User
 * -FirstName
 * -LastName
 * -email
 * -phone number
 * -password
 * -register id
 */
const userSchema = new Schema<IUserDoc>({
  firstName: {
    type: String,
    reguired: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    reguired: true,
    unique: true,
  },
  phone: {
    type: Number,
    reguired: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  register: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
});
userSchema.method(
  "isPasswordMatch",
  async function (password: string): Promise<boolean> {
    console.log("is password match");
    console.log(password);
    const user: any = this;
    console.log(this);
    return bcrypt.compare(password, user.password);
  }
);
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
    next();
  }
});
const User = mongoose.model<IUserDoc | IUserModel>("User", userSchema);

export default User;
