import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadDocument } from "../controllers/doc.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("file"), uploadDocument);

export default router;
