import { IMediaDoc } from "./media.interfaces";
import mongoose, { Types, Schema } from "mongoose";
import { User } from "../user";

const mediaSchema = new Schema<IMediaDoc>({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  genre: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: User,
  },

  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Media = mongoose.model<IMediaDoc>("Media", mediaSchema);
export default Media;
