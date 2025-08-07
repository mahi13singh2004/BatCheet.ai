import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  chatWithDocument,
  getChatHistory,
  clearChatHistory,
  summarizeChat,
  sendSummaryEmail,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/:id/chat", verifyToken, chatWithDocument);
router.get("/:id/chat", verifyToken, getChatHistory);
router.delete("/:id/chat", verifyToken, clearChatHistory);
router.post("/:id/summarize", verifyToken, summarizeChat);
router.post("/:id/send-summary", verifyToken, sendSummaryEmail);

export default router;
