import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigationStore } from "../store/navigation.store.js";
import axiosInstance from "../utils/axios";

export default function Profile() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { startLoading } = useNavigationStore();

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await axiosInstance.get("/api/docs");
            setDocuments(response.data.documents);
        } catch (error) {
            console.error("Error fetching documents:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getFileIcon = (fileType) => {
        return fileType === "pdf" ? "📄" : "🖼️";
    };

    const handleUploadClick = () => {
        startLoading();
        navigate("/upload");
    };

    const handleChatClick = (docId) => {
        startLoading();
        navigate(`/chat/${docId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your documents...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                        My Documents
                    </h1>
                    <p className="text-gray-600 text-lg">View and manage your uploaded documents</p>
                </div>

                {documents.length === 0 ? (
                    <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
                        <div className="text-8xl mb-6">📁</div>
                        <h3 className="text-2xl font-medium text-gray-900 mb-3">No documents yet</h3>
                        <p className="text-gray-600 mb-8 text-lg">Upload your first document to get started</p>
                        <button
                            onClick={handleUploadClick}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
                        >
                            Upload Document
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {documents.map((doc) => (
                            <div
                                key={doc._id}
                                onClick={() => handleChatClick(doc._id)}
                                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:scale-105"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-4xl">{getFileIcon(doc.fileType)}</div>
                                    <span className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium">
                                        {doc.fileType.toUpperCase()}
                                    </span>
                                </div>

                                <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-lg">
                                    {doc.title}
                                </h3>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                    {doc.extractedText.length > 120
                                        ? `${doc.extractedText.substring(0, 120)}...`
                                        : doc.extractedText}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded-md">
                                        {formatDate(doc.createdAt)}
                                    </span>
                                    <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1 rounded-full font-medium">
                                        {doc.extractedText.length} chars
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
