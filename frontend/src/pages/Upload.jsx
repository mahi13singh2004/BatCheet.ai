import { useUploadStore } from "../store/upload.store";
import { useNavigationStore } from "../store/navigation.store.js";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function Upload() {
    const {
        title,
        setTitle,
        setFile,
        clearForm,
        uploadDocument,
        isUploading,
        error,
    } = useUploadStore();

    const navigate = useNavigate();
    const { startLoading } = useNavigationStore();
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const docId = await uploadDocument();
        if (docId) {
            clearForm();
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            startLoading();
            navigate(`/chat/${docId}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
            <div className="max-w-md mx-auto p-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">📤</div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                            Upload Document
                        </h2>
                        <p className="text-gray-600">Upload a PDF or image to start chatting with AI</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Document Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter document title..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Choose File
                            </label>
                            <input
                                type="file"
                                accept=".pdf, .png, .jpg, .jpeg"
                                onChange={(e) => setFile(e.target.files[0])}
                                ref={fileInputRef}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, PNG, JPG, JPEG</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Uploading...</span>
                                </div>
                            ) : (
                                "Upload Document"
                            )}
                        </button>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
