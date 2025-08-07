export default function ChatMessage({ sender, text }) {
    const isUser = sender === "user";
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
        <div
          className={`max-w-[75%] px-4 py-2 rounded-2xl ${
            isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {text}
        </div>
      </div>
    );
  }
  