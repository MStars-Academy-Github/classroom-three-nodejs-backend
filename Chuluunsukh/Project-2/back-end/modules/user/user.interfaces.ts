import mongoose, { Model, Document } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  registerId: string;
}
export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}
