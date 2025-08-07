// utils/gemini.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`;

export const askGemini = async (contextText, userMessage) => {
  try {
    

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    if (!contextText || contextText.trim() === "") {
      throw new Error("Context text is empty");
    }

    const requestBody = {
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
    };

    
    const res = await axios.post(GEMINI_API_URL, requestBody);

    

    const reply = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply || reply.trim() === "") {
      console.error("❌ Gemini API returned empty response");
      console.error(
        "❌ Full response structure:",
        JSON.stringify(res.data, null, 2)
      );
      throw new Error(
        "Gemini API returned empty response. The model did not generate any text content."
      );
    }

    

    return reply;
  } catch (error) {
    console.error("❌ Error in askGemini:");
    console.error("- Error message:", error.message);
    console.error("- Error response:", error.response?.data);
    console.error("- Error status:", error.response?.status);

    if (error.response?.status === 400) {
      throw new Error(
        `Gemini API Error: ${
          error.response.data?.error?.message || "Bad Request"
        }`
      );
    } else if (error.response?.status === 403) {
      throw new Error(
        "Gemini API Error: Invalid API key or insufficient permissions"
      );
    } else if (error.response?.status === 429) {
      throw new Error("Gemini API Error: Rate limit exceeded");
    } else {
      throw new Error(`Gemini API Error: ${error.message}`);
    }
  }
};
