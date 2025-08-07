import { useParams } from "react-router-dom";
import { useChatStore } from "../store/chat.store.js";
import { useNavigationStore } from "../store/navigation.store.js";
import ChatMessage from "../components/ChatMessage";
import TypingLoader from "../components/TypingLoader";
import SummaryModal from "../components/SummaryModal.jsx";
import { useState, useEffect, useRef } from "react";
import { FaKeyboard } from "react-icons/fa";
import { CiMicrophoneOn } from "react-icons/ci";

export default function ChatPage() {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("text");
  const [isListening, setIsListening] = useState(false);
  const [isRecognitionRunning, setIsRecognitionRunning] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const {
    chats,
    sendMessage,
    loading,
    loadChatHistory,
    clearChatHistory,
    summarizeChat,
    sendSummaryEmail,
    summary,
    summaryLoading,
    clearSummary,
  } = useChatStore();
  const { isLoading: isNavigating } = useNavigationStore();
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (id && !isNavigating) {
      loadChatHistory(id);
    }
  }, [id, loadChatHistory, isNavigating]);

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(id, input, mode === "voice");
    setInput("");
  };

  const handleSummarize = async () => {
    try {
      await summarizeChat(id);
    } catch (error) {
      alert(error.message || "Failed to generate summary. Please try again.");
    }
  };

  const handleSendEmail = async (email) => {
    await sendSummaryEmail(id, email);
  };

  const handleOpenSummaryModal = () => {
    setShowSummaryModal(true);
  };

  const handleCloseSummaryModal = () => {
    setShowSummaryModal(false);
    clearSummary();
  };

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
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
    if (
      mode === "voice" &&
      isListening &&
      recognitionRef.current &&
      !isRecognitionRunning
    ) {
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
        if (recognitionRef.current.state === "recording") {
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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="flex-1 flex flex-col">
        {!isNavigating && (
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Document Chat
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleOpenSummaryModal}
                  disabled={chats.length === 0}
                  className={`text-sm font-medium transition-colors px-3 py-1 rounded-md ${
                    chats.length === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  }`}
                  title={
                    chats.length === 0
                      ? "Start a conversation first to summarize"
                      : "Summarize this chat"
                  }
                >
                  📝 Summarize
                </button>
                <button
                  onClick={() => clearChatHistory(id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors px-3 py-1 rounded-md hover:bg-red-50"
                  title="Clear chat history"
                >
                  Clear Chat
                </button>
                <div className="bg-gray-100 rounded-lg p-1 flex shadow-sm">
                  <button
                    onClick={() => setMode("text")}
                    className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${
                      mode === "text"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Text Mode
                  </button>
                  <button
                    onClick={() => setMode("voice")}
                    className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${
                      mode === "voice"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Voice Mode
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {!loading && chats.length === 0 && (
              <div className="text-center text-gray-500 mt-20">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-medium mb-2 text-gray-700">
                  Start a conversation
                </h3>
                <p className="text-gray-400">
                  Ask questions about your document to get started
                </p>
              </div>
            )}

            {!loading &&
              chats.map((chat, idx) => (
                <ChatMessage key={idx} sender={chat.sender} text={chat.text} />
              ))}

            {loading && (
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-blue-600 font-medium">
                  AI is thinking...
                </span>
              </div>
            )}
          </div>
        </div>

        {!isNavigating && (
          <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-6 shadow-lg">
            <div className="max-w-4xl mx-auto">
              {mode === "text" ? (
                <form onSubmit={handleSend} className="flex gap-3">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something about the document..."
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    disabled={!input.trim() || loading}
                  >
                    Send
                  </button>
                </form>
              ) : (
                <div className="flex justify-center">
                  <button
                    onClick={isListening ? stopVoiceInput : startVoiceInput}
                    className={`px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 shadow-sm ${
                      isListening
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    }`}
                  >
                    {isListening ? "Stop Listening" : "Start Voice Input"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!isNavigating && (
        <div className="w-80 bg-white/80 backdrop-blur-sm border-l border-gray-200 p-6 shadow-lg flex flex-col h-full">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            How to use
          </h2>
          <div className="space-y-4 text-sm text-gray-600 flex-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Text Mode</h3>
              <p>
                Type your questions in the input field and press Send to get AI
                responses about your document.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Voice Mode</h3>
              <p>
                Click "Start Voice Input" and speak your question. The AI will
                respond both in text and voice.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Ask specific questions for better answers</li>
                <li>Use voice mode for hands-free interaction</li>
                <li>Previous chats are saved automatically</li>
                <li>
                  Use the Summarize button to get a summary of your conversation
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            {mode === "text" ? (
              <FaKeyboard
                size={64}
                className="text-indigo-400"
                title="Keyboard Typing Mode"
              />
            ) : (
              <CiMicrophoneOn
                size={64}
                className="text-indigo-400"
                title="Voice Mode"
              />
            )}
          </div>
        </div>
      )}

      <SummaryModal
        isOpen={showSummaryModal}
        onClose={handleCloseSummaryModal}
        summary={summary}
        onSummarize={handleSummarize}
        onSendEmail={handleSendEmail}
        summaryLoading={summaryLoading}
      />
    </div>
  );
}
