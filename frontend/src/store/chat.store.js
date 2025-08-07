import { create } from "zustand";
import axiosInstance from "../utils/axios";

axiosInstance.defaults.withCredentials = true;

export const useChatStore = create((set) => ({
  chats: [],
  loading: false,
  summary: null,
  summaryLoading: false,

  loadChatHistory: async (docId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/api/docs/${docId}/chat`);
      set({ chats: res.data.messages, loading: false });
    } catch (error) {
      console.error("❌ Load chat history error:", error);
      set({ chats: [], loading: false });
    }
  },

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

  summarizeChat: async (docId) => {
    set({ summaryLoading: true });
    try {
      const res = await axiosInstance.post(`/api/docs/${docId}/summarize`);
      set({ summary: res.data, summaryLoading: false });
      return res.data;
    } catch (error) {
      console.error("❌ Summarize chat error:", error);
      set({ summaryLoading: false });

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate summary";
      throw new Error(errorMessage);
    }
  },

  sendSummaryEmail: async (docId, email) => {
    try {
      const res = await axiosInstance.post(`/api/docs/${docId}/send-summary`, {
        email,
      });
      return res.data;
    } catch (error) {
      console.error("❌ Send summary email error:", error);
      throw error;
    }
  },

  clearChat: () => set({ chats: [] }),

  clearChatHistory: async (docId) => {
    try {
      await axiosInstance.delete(`/api/docs/${docId}/chat`);
      set({ chats: [] });
    } catch (error) {
      console.error("❌ Clear chat history error:", error);
    }
  },

  clearSummary: () => set({ summary: null }),
}));
