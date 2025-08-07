import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

export default function Profile() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your documents...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Documents</h1>
                    <p className="text-gray-600">View and manage your uploaded documents</p>
                </div>

                {documents.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📁</div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No documents yet</h3>
                        <p className="text-gray-600 mb-6">Upload your first document to get started</p>
                        <button
                            onClick={() => navigate("/upload")}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Upload Document
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {documents.map((doc) => (
                            <div
                                key={doc._id}
                                onClick={() => navigate(`/chat/${doc._id}`)}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow hover:border-blue-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-3xl">{getFileIcon(doc.fileType)}</div>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                        {doc.fileType.toUpperCase()}
                                    </span>
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {doc.title}
                                </h3>

                                <p className="text-sm text-gray-500 mb-4">
                                    {doc.extractedText.length > 100
                                        ? `${doc.extractedText.substring(0, 100)}...`
                                        : doc.extractedText}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span>{formatDate(doc.createdAt)}</span>
                                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
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
