import fs from "fs";
import Tesseract from "tesseract.js";
import Document from "../models/doc.model.js";

export const uploadDocument = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;
    const userId = req.user._id;

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    const fileType = file.mimetype.startsWith("application/pdf")
      ? "pdf"
      : "image";
    let extractedText = "";

    if (fileType === "pdf") {
      const pdfParse = (await import("pdf-parse")).default;
      const dataBuffer = fs.readFileSync(file.path);
      const parsed = await pdfParse(dataBuffer);
      extractedText = parsed.text.trim();
    } else {
      const result = await Tesseract.recognize(file.path, "eng");
      extractedText = result.data.text.trim();
    }

    const newDoc = await Document.create({
      userId,
      title,
      fileName: file.filename,
      fileType,
      extractedText,
    });

    return res.status(201).json({
      message: "Document uploaded successfully",
      documentId: newDoc._id,
    });
  } catch (error) {
    console.error("❌ Error in uploadDocument:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
