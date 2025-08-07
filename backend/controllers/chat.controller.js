import Document from "../models/doc.model.js";
import Chat from "../models/chat.model.js";
import { askGemini } from "../utils/gemini.js";
import { sendChatSummaryEmail } from "../utils/email.js";

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

    

    const answer = await askGemini(document.extractedText, message);

    let chat = await Chat.findOne({ userId, documentId: id });

    if (!chat) {
      chat = new Chat({
        userId,
        documentId: id,
        messages: [
          { sender: "user", text: message },
          { sender: "ai", text: answer },
        ],
      });
    } else {
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

export const summarizeChat = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    

    const document = await Document.findOne({ _id: id, userId });
    if (!document) {
      
      return res.status(404).json({ message: "Document not found" });
    }

  

    if (!document.extractedText || document.extractedText.trim() === "") {
      return res.status(400).json({
        message:
          "Document content is empty or could not be extracted. Please try uploading the document again.",
      });
    }

  
    const limitedContent = document.extractedText.substring(0, 3000);
    

    const summaryPrompt = `Summarize this document in a clear, structured way. Include the main topics, key points, and important information.

Document: ${document.title}

Content:
${limitedContent}

Please provide a comprehensive summary with:
- Main topics and themes
- Key facts and insights
- Important conclusions
- Any recommendations`;

    
    const summary = await askGemini(limitedContent, summaryPrompt);
   

    if (!summary || summary.trim() === "") {
      throw new Error("AI model returned empty summary");
    }

    return res.status(200).json({
      summary,
      documentTitle: document.title,
      messageCount: 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ summarizeChat error:", error);
    return res.status(500).json({
      error: error.message,
      documentTitle: document ? document.title : "Unknown Document",
      messageCount: 0,
      timestamp: new Date().toISOString(),
    });
  }
};

export const sendSummaryEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const userId = req.user._id;

    

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const document = await Document.findOne({ _id: id, userId });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (!document.extractedText || document.extractedText.trim() === "") {
      return res.status(400).json({
        message:
          "Document content is empty or could not be extracted. Please try uploading the document again.",
      });
    }

  

    const limitedContent = document.extractedText.substring(0, 3000);

    const summaryPrompt = `Summarize this document in a clear, structured way. Include the main topics, key points, and important information.

Document: ${document.title}

Content:
${limitedContent}

Please provide a comprehensive summary with:
- Main topics and themes
- Key facts and insights
- Important conclusions
- Any recommendations`;

    const summary = await askGemini(limitedContent, summaryPrompt);

    if (!summary || summary.trim() === "") {
      throw new Error("AI model returned empty summary for email");
    }

    const summaryData = {
      summary,
      documentTitle: document.title,
      messageCount: 0,
      timestamp: new Date().toISOString(),
    };


    await sendChatSummaryEmail(email, summaryData);


    return res.status(200).json({
      message: "Document summary sent to email successfully",
      summaryData,
    });
  } catch (error) {
    console.error("❌ sendSummaryEmail error:", error);
    return res.status(500).json({
      message: "Failed to send email",
      error: error.message,
    });
  }
};
