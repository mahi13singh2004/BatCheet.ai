import Document from "../models/doc.model.js";
import Chat from "../models/chat.model.js";
import { askGemini } from "../utils/gemini.js";

export const chatWithDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const userId = req.user._id;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const document = await Document.findOne({ _id: id, userId });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    console.log(
      "Document extracted text length:",
      document.extractedText?.length || 0
    );
    console.log(
      "Document extracted text preview:",
      document.extractedText?.substring(0, 200) + "..."
    );

    const answer = await askGemini(document.extractedText, message);

    // Save or update chat history
    let chat = await Chat.findOne({ userId, documentId: id });

    if (!chat) {
      // Create new chat if it doesn't exist
      chat = new Chat({
        userId,
        documentId: id,
        messages: [
          { sender: "user", text: message },
          { sender: "ai", text: answer },
        ],
      });
    } else {
      // Add new messages to existing chat
      chat.messages.push(
        { sender: "user", text: message },
        { sender: "ai", text: answer }
      );
    }

    await chat.save();

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("❌ chatWithDocument error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const document = await Document.findOne({ _id: id, userId });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const chat = await Chat.findOne({ userId, documentId: id });

    if (!chat) {
      return res.status(200).json({ messages: [] });
    }

    return res.status(200).json({ messages: chat.messages });
  } catch (error) {
    console.error("❌ getChatHistory error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const clearChatHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const document = await Document.findOne({ _id: id, userId });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const chat = await Chat.findOne({ userId, documentId: id });

    if (chat) {
      chat.messages = [];
      await chat.save();
    }

    return res
      .status(200)
      .json({ message: "Chat history cleared successfully" });
  } catch (error) {
    console.error("❌ clearChatHistory error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
