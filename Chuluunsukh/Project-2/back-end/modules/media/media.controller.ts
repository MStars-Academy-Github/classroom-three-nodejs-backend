import { Request, Response } from "express";
import formidable, { Fields } from "formidable";
import { GridFSBucket } from "mongoDB";
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
        error: "Video couldn't uploaded",
      });
    }
    const user = await User.findById("630ee1ee17c36d282332b747");
    console.log(user);

    let media = new Media(fields);

    const file = files["media"];

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
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: "Error has occured during video upload",
      });
    }
  });
};
export const getMediaById = async (req: Request, res: Response) => {
  const { mediaId } = req.params;

  try {
    const media = await Media.findById(mediaId)
      .populate("postedBy", "_id firstName lastName")
      .exec();
    console.log(media?._id.toString());

    let files = await gridfs
      .find({ filename: media?._id.toString() })
      .toArray();

    console.log(files);
    res.json({
      data: media,
      file: files,
    });
  } catch (error) {
    return res.status(404).json({
      error: "Couldn't retrieve media file",
    });
  }

  res.json({
    data: "get media by id",
  });
};
export const getMediaByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    let media = await Media.find({ postedBy: userId });
    res.status(200).json({
      data: media,
    });
  } catch (error) {
    return res.status(404).json({
      error: "Couldn't retrieve media file",
    });
  }
};
