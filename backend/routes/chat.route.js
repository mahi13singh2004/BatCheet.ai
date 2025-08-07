import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { chatWithDocument } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/:id/chat", verifyToken, chatWithDocument);

export default router;
