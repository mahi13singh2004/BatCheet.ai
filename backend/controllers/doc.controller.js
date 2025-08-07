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
      try {
        const pdfParse = (await import("pdf-parse")).default;
        const dataBuffer = fs.readFileSync(file.path);
        const parsed = await pdfParse(dataBuffer);
        extractedText = parsed.text.trim();
        console.log("PDF extracted text length:", extractedText.length);
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        extractedText = "PDF content could not be extracted";
      }
    } else {
      try {
        const result = await Tesseract.recognize(file.path, "eng");
        extractedText = result.data.text.trim();
        console.log("Image extracted text length:", extractedText.length);
      } catch (ocrError) {
        console.error("OCR error:", ocrError);
        extractedText = "Image content could not be extracted";
      }
    }

    if (!extractedText || extractedText.length === 0) {
      extractedText = "Document content extracted but appears to be empty";
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

export const getUserDocuments = async (req, res) => {
  try {
    const userId = req.user._id;

    const documents = await Document.find({ userId })
      .sort({ createdAt: -1 })
      .select("title fileName fileType extractedText createdAt");

    return res.status(200).json({
      documents,
    });
  } catch (error) {
    console.error("❌ Error in getUserDocuments:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
