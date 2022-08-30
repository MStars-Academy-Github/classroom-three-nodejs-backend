import mongoose, { Schema } from "mongoose";
import { IUserDoc } from "./user.interfaces";

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
    trim: true,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    trim: true,
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

const User = mongoose.model<IUserDoc>("User", userSchema);
export default User;
