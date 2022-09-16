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
  console.log(req.headers);
  const range = req.headers["range"];
  try {
    const media = await Media.findById({
      _id: mediaId,
    })
      .populate("postedBy", "_id firstName lastName")
      .exec();

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
      error: "Could nor retrieve media file",
    });
  }
};

// User request id
export const getMediaByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(req.params);
  try {
    const media = await Media.findById(userId)
      .populate("postedBy", "_id firstName")
      .exec();
    let files = await gridfs
      .find({ filename: media?._id.toString() })
      .toArray();
    let file = files[0];
    res.header("Content-Length", file.length.toString());
    res.header("Content-Type", file.contentType);

    let downloadStream = gridfs.openDownloadStream(file._id);
    downloadStream.pipe(res);
    downloadStream.on("error", () => {
      res.sendStatus(404);
    });
    downloadStream.on("end", () => {
      res.end();
    });
  } catch (error) {
    return res.status(404).json({
      error: "Could nor retrieve media file",
    });
  }
};
