import { Model, Document, Schema } from "mongoose";
export interface IMedia {
  title: string;
  description: string;
  genre: string;
  views: number;
  postedBy: Schema.Types.ObjectId;
  updated: Date;
  created: Date;
}
export interface IMediaDoc extends IMedia, Document {}
export interface IMediaModel extends Model<IMedia | null> {}
