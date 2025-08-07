import { useParams } from "react-router-dom";
import { useChatStore } from "../store/chat.store.js";
import { useNavigationStore } from "../store/navigation.store.js";
import ChatMessage from "../components/ChatMessage";
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
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Main chat container */}
      <div className="flex-1 flex flex-col min-h-0">
        {!isNavigating && (
          <div className="bg-white/90 backdrop-blur-md border-b border-gray-300 px-6 py-4 shadow-sm mb-4 rounded-md max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Document Chat
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleOpenSummaryModal}
                  disabled={chats.length === 0}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    chats.length === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
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
                  className="bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 text-sm font-semibold transition-colors px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                  title="Clear chat history"
                >
                  Clear Chat
                </button>

                <div className="bg-gray-100 rounded-lg p-1 flex shadow-sm">
                  <button
                    onClick={() => setMode("text")}
                    className={`px-4 py-2 rounded-md transition-all duration-200 font-semibold ${
                      mode === "text"
                        ? "bg-white text-blue-600 shadow-md"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Text Mode
                  </button>
                  <button
                    onClick={() => setMode("voice")}
                    className={`px-4 py-2 rounded-md transition-all duration-200 font-semibold ${
                      mode === "voice"
                        ? "bg-white text-blue-600 shadow-md"
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

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
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
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-lg mx-auto">
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
          <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 sm:p-6 shadow-lg">
            <div className="max-w-4xl mx-auto">
              {mode === "text" ? (
                <form onSubmit={handleSend} className="flex gap-3 flex-col sm:flex-row">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm w-full"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something about the document..."
                    disabled={loading}
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    disabled={!input.trim() || loading}
                  >
                    Send
                  </button>
                </form>
              ) : (
                <div className="flex justify-center mt-2">
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

      {/* Side panel */}
      {!isNavigating && (
        <aside className="w-full md:w-80 bg-white/80 backdrop-blur-sm border-t md:border-t-0 md:border-l border-gray-200 p-4 sm:p-6 shadow-lg flex flex-col h-64 md:h-auto mt-4 md:mt-0">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">How to use</h2>
          <div className="space-y-4 text-sm text-gray-600 flex-1 overflow-y-auto">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Text Mode</h3>
              <p>
                Type your questions in the input field and press Send to get AI
                responses about your document.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Voice Mode</h3>
              <p>
                Click "Start Voice Input" and speak your question. The AI will
                respond both in text and voice.
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Ask specific questions for better answers</li>
                <li>Use voice mode for hands-free interaction</li>
                <li>Previous chats are saved automatically</li>
                <li>Use the Summarize button to get a summary of your conversation</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center mt-6 md:mt-8">
            {mode === "text" ? (
              <FaKeyboard
                size={48}
                className="text-indigo-400"
                title="Keyboard Typing Mode"
              />
            ) : (
              <CiMicrophoneOn
                size={48}
                className="text-indigo-400"
                title="Voice Mode"
              />
            )}
          </div>
        </aside>
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
