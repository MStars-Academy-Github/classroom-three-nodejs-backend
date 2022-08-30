import mongoose, { Model, Document } from "mongoose";

export interface IUser {
  firstName: String;
  lastName: String;
  email: String;
  phone: Number;
  password: String;
  register: String;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: String): Promise<boolean>;
}
