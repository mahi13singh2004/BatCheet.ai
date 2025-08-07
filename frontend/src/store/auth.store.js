import { create } from "zustand";
import axiosInstance from "../utils/axios";

axiosInstance.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  err: null,

  signup: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/api/auth/signup", data);
      set({ user: res.data.user, err: null });
      return true;
    } catch (error) {
      set({ err: error.response.data.message });
      return false;
    }
    finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", data);
      set({ user: res.data.user, err: null });
      return true;
    } catch (error) {
      set({ err: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post("/api/auth/logout");
      set({ user: null, err: null });
    } catch (error) {
      set({ err: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/api/auth/checkAuth");
      set({ user: res.data.user, err: null });
    } catch (error) {
      if (error.response?.status !== 401) {
        set({
          err: error.response?.data?.message || "Something went wrong",
        });
      } else {
        set({ user: null });
      }
    }
    finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ err: null }),
}));