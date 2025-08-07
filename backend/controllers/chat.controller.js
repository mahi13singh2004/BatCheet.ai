import Document from "../models/doc.model.js";
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

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("❌ chatWithDocument error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
