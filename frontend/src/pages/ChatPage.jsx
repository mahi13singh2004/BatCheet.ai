import { useParams } from "react-router-dom";
import { useChatStore } from "../store/chat.store.js";
import ChatMessage from "../components/ChatMessage";
import TypingLoader from "../components/TypingLoader";
import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("text");
  const [isListening, setIsListening] = useState(false);
  const [isRecognitionRunning, setIsRecognitionRunning] = useState(false);

  const { chats, sendMessage, loading } = useChatStore();
  const recognitionRef = useRef(null);


  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(id, input, mode === "voice");
    setInput("");
  };

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setIsRecognitionRunning(true);
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(id, transcript, true);
      setIsListening(false);
      setIsRecognitionRunning(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setIsRecognitionRunning(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      setIsRecognitionRunning(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [id, sendMessage]);

  useEffect(() => {
    if (mode === "voice" && isListening && recognitionRef.current && !isRecognitionRunning) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        setIsListening(false);
      }
    } else if (recognitionRef.current && isRecognitionRunning) {
      recognitionRef.current.stop();
    }
  }, [mode, isListening, isRecognitionRunning]);

  const startVoiceInput = () => {
    setMode("voice");
    setIsListening(true);
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      try {
        if (recognitionRef.current.state === 'recording') {
          recognitionRef.current.stop();
        }
      } catch (error) {
        console.error("Error stopping recognition:", error);
      }
    }
    setIsListening(false);
    setMode("text");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Document Chat</h1>
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setMode("text")}
                className={`px-4 py-2 rounded-md transition-colors ${mode === "text"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                Text Mode
              </button>
              <button
                onClick={() => setMode("voice")}
                className={`px-4 py-2 rounded-md transition-colors ${mode === "voice"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                Voice Mode
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {chats.length === 0 && !loading && (
              <div className="text-center text-gray-500 mt-20">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-medium mb-2">Start a conversation</h3>
                <p className="text-gray-400">Ask questions about your document to get started</p>
              </div>
            )}

            {chats.map((chat, idx) => (
              <ChatMessage key={idx} sender={chat.sender} text={chat.text} />
            ))}

            {loading && (
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-blue-600 font-medium">AI is thinking...</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border-t p-6">
          <div className="max-w-4xl mx-auto">
            {mode === "text" ? (
              <form onSubmit={handleSend} className="flex gap-3">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something about the document..."
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!input.trim() || loading}
                >
                  Send
                </button>
              </form>
            ) : (
              <div className="flex justify-center">
                <button
                  onClick={isListening ? stopVoiceInput : startVoiceInput}
                  className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${isListening
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                  {isListening ? "Stop Listening" : "Start Voice Input"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-80 bg-white border-l p-6">
        <h2 className="text-lg font-semibold mb-4">How to use</h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Text Mode</h3>
            <p>Type your questions in the input field and press Send to get AI responses about your document.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Voice Mode</h3>
            <p>Click "Start Voice Input" and speak your question. The AI will respond both in text and voice.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Tips</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Ask specific questions for better answers</li>
              <li>Use voice mode for hands-free interaction</li>
              <li>Previous chats are saved automatically</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
