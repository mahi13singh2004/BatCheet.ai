import { create } from "zustand";
import axiosInstance from "../utils/axios";

axiosInstance.defaults.withCredentials = true;

export const useChatStore = create((set) => ({
  chats: [],
  loading: false,

  sendMessage: async (docId, userMessage, shouldSpeak = false) => {
    if (!userMessage.trim()) return;

    set((state) => ({
      chats: [...state.chats, { sender: "user", text: userMessage }],
      loading: true,
    }));

    try {
      const res = await axiosInstance.post(`/api/docs/${docId}/chat`, {
        message: userMessage,
      });

      const aiResponse = res.data.answer;

      set((state) => ({
        chats: [...state.chats, { sender: "ai", text: aiResponse }],
        loading: false,
      }));

      if (shouldSpeak && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("❌ Chat error:", error);
      set((state) => ({
        chats: [
          ...state.chats,
          { sender: "ai", text: "❌ Something went wrong." },
        ],
        loading: false,
      }));
    }
  },

  clearChat: () => set({ chats: [] }),
}));
