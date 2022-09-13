import express, { Router } from "express";
import { mediaController } from "../../modules/media";

const router: Router = express.Router();

router.post("/upload", mediaController.createMedia);
router.get("/video/:mediaId", mediaController.getMediaById);
router.get("/video/by/:userId", mediaController.getMediaByUserId);

export default router;
