import { create } from "zustand";
import axiosInstance from "../utils/axios";

export const useUploadStore = create((set) => ({
  title: "",
  file: null,
  isUploading: false,
  error: null,

  setTitle: (title) => set({ title }),
  setFile: (file) => set({ file }),
  clearForm: () => set({ title: "", file: null }),

  uploadDocument: async () => {
    set({ isUploading: true, error: null });

    try {
      const { title, file } = useUploadStore.getState();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);

      const res = await axiosInstance.post("/api/docs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ isUploading: false });
      return res.data.documentId;
    } catch (error) {
      set({
        isUploading: false,
        error: error.response?.data?.message || "Upload failed",
      });
      return null;
    }
  },
}));
