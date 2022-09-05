import { Request, Response } from "express";
import formidable, { Fields } from "formidable";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import { User } from "../user";
import Media from "./media.model";
import fs from "fs";

let gridfs: GridFSBucket;
mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

export const createMedia = (req: Request, res: Response) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err: Error, fields: Fields, files: any) => {
    if (err) {
      return res.status(400).json({
        error: "Video could not be uploaded",
      });
    }

    const user = await User.findById("630ec7701b1bf5648c9e03e7");
    let media = new Media(fields);
    media.postedBy = user?._id;
    const file = files["media"];
    // console.log(file);
    console.log(fields);
    // save the parse file
    if (file) {
      let writeStream = gridfs.openUploadStream(media._id.toString(), {
        contentType: "binary/octet-stream",
      });
      fs.createReadStream(file.filepath).pipe(writeStream);
    }

    try {
      let result = await media.save();
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(400).json({
        error: "Error during file upload",
      });
    }
  });
};

export const getMediaById = async (req: Request, res: Response) => {
  const { mediaId } = req.params;
  console.log(mediaId);

  try {
    const media = await Media.findById(mediaId)
      .populate("postedBy", "_id firstName lastName")
      .exec();
    res.json({
      data: media,
    });
  } catch (error) {
    return res.status(404).json({
      error: "Could not retrieve media file",
    });
  }
};

export const getMediaByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    let media = await Media.find({ postedBy: userId });
    res.status(200).json({
      data: media,
    });
  } catch (error) {
    res.json({
      error: "Could not retrieve the media",
    });
  }
};
