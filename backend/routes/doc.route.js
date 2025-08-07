import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  uploadDocument,
  getUserDocuments,
} from "../controllers/doc.controller.js";
import { upload } from "../middlewares/multer.js";
import chatRoutes from "./chat.route.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("file"), uploadDocument);
router.get("/", verifyToken, getUserDocuments);
router.use("/", chatRoutes);

export default router;
