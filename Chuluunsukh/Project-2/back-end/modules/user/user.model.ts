import mongoose, { Schema } from "mongoose";
import { IUserDoc } from "./user.interfaces";
import bcrypt from "bcryptjs";

// User has
// firstName
// lastName
// email
// phoneNumber
// password
// registerId

// Mongoose section
const userSchema = new Schema<IUserDoc>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  phone: {
    type: Number,
    required: true,
  },
  registerId: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
    trim: true,
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
  console.log("before model saving");
  console.log("user");
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDoc>("User", userSchema);
export default User;
