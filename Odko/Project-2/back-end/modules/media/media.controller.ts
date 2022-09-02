import { Request, Response } from "express";
import formidable, { Fields } from "formidable";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import { User } from "../user";
import Media from "./media.models";
import fs from "fs";

let gridfs: GridFSBucket;
// mongodb deer holbogdod hadgalna
mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

export const createMedia = (req: Request, res: Response) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err: Error, fields: Fields, files: any) => {
    if (err) {
      return res.status(400).json({
        error: "video could not be uploaded",
      });
    }

    const user = await User.findById("6310d6ed91b38f19f1930f11");
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
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: "Error during file upload",
      });
    }
  });
};

export const getMediaById = async (req: Request, res: Response) => {
  const { mediaId } = req.params;

  try {
    const media = await Media.findById({
      _id: mediaId,
    }).populate("postedBy", "_id firstName lastName");
    res.json({
      data: media,
    });
  } catch (error) {
    return res.status(404).json({
      error: "Could nor retrieve media file",
    });
  }
};

// User request id
export const getMediaByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(req.params);
  try {
    const media = await Media.find({
      postedBy: userId,
    });
    res.json({
      data: media,
    });
  } catch (error) {
    return res.status(404).json({
      error: "Could nor retrieve media file",
    });
  }
};
