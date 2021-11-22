import express from "express";
import {
  deleteVideo,
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";
const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .get(getUpload)
  .post(uploadVideo.single("video"), postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);

export default videoRouter;
