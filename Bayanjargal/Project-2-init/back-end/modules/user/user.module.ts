import mongoose, { Schema } from "mongoose";
import { IUserDoc } from "./user.interface";
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

const User = mongoose.model<IUserDoc>("User", userSchema);

export default User;
