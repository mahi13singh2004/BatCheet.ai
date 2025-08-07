// utils/gemini.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`;

export const askGemini = async (contextText, userMessage) => {
  try {
    console.log("Context text length:", contextText?.length || 0);
    console.log("User message:", userMessage);

    const res = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: `You are an AI assistant that answers questions based ONLY on the provided document content. 

Document Content:
${contextText}

IMPORTANT INSTRUCTIONS:
- Answer ONLY based on the information present in the document above
- If the question cannot be answered from the document content, respond with "I cannot answer this question based on the provided document content."
- Do not provide any information that is not directly from the document
- Be concise and accurate
- Format your response beautifully with proper spacing and paragraphs
- Do not use asterisks (*) or any special formatting characters
- Use clear, readable formatting with good spacing between sections
- Do not add any explanations, disclaimers, or additional context beyond what's in the document

User Question: ${userMessage}

Answer:`,
            },
          ],
        },
      ],
    });

    const reply =
      res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return reply;
  } catch (error) {
    console.error(
      "❌ Error in askGemini (Axios):",
      error.response?.data || error.message
    );
    throw new Error("Gemini API request failed");
  }
};
