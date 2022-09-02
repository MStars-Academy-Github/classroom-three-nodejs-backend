/* 
    User
        firstname
        lastname
        email
        phone number
        password
        register id
*/
import mongoose, { Schema } from "mongoose";
import { IUser, IUserDoc } from "./user.interface";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUserDoc>({
  firstName: {
    type: String,
    required: true,
    // hooson zaig garwal ustgana
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
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
    const user = this;
    return bcrypt.compare(password, user.password);
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDoc>("User", userSchema);
export default User;
