import mongoose, { Schema } from "mongoose";
import { IUserDoc } from "./user.interfaces";

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

const User = mongoose.model<IUserDoc>("User", userSchema);
export default User;
