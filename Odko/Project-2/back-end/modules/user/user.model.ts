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

const User = mongoose.model<IUserDoc>("User", userSchema);
export default User;
