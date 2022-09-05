import mongoose, { Schema } from "mongoose";
import { IMediaDoc } from "./media.interfaces";
import { User } from "../user";

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
