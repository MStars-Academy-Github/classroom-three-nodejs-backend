import mongoose, { Schema } from "mongoose";
import { User } from "../user";
import { IMediaDoc } from "./media.interface";

const mediaSchema = new Schema<IMediaDoc>({
  title: {
    type: String,
    required: true,
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
