import React, { useState } from 'react';

const SummaryModal = ({ isOpen, onClose, summary, onSummarize, onSendEmail, summaryLoading }) => {
    const [email, setEmail] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopySummary = async () => {
        try {
            await navigator.clipboard.writeText(summary.summary);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownloadTxt = () => {
        const element = document.createElement('a');
        const file = new Blob([summary.summary], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `chat-summary-${summary.documentTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleSendEmail = async () => {
        if (!email.trim()) return;

        setEmailLoading(true);
        try {
            await onSendEmail(email);
            setEmail('');
            alert('Document summary sent to email successfully!');
        } catch (error) {
            console.error('Email error:', error);
            const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to send document summary email. Please try again.';
            alert(`Email Error: ${errorMessage}`);
        } finally {
            setEmailLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">📄 Document Summary</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {!summary ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📄</div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2">
                                Generate Document Summary
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Create a comprehensive summary of your uploaded document using AI
                            </p>
                            <button
                                onClick={onSummarize}
                                disabled={summaryLoading}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {summaryLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Generating Document Summary...</span>
                                    </div>
                                ) : (
                                    "Generate Document Summary"
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Summary Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                                <h3 className="font-bold text-gray-800 mb-2">{summary.documentTitle}</h3>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>📄 Document Summary</span>
                                    <span>📅 {new Date(summary.timestamp).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Summary Content */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {summary.error ? (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-red-800 mb-2">❌ Error Generating Summary</h4>
                                            <p className="text-red-700">{summary.error}</p>
                                        </div>
                                    ) : summary.summary && summary.summary.trim() ? (
                                        summary.summary
                                    ) : (
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ No Summary Generated</h4>
                                            <p className="text-yellow-700">No summary could be generated for this document. Please check if the document contains extractable text, or try again with a different file.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button
                                    onClick={handleCopySummary}
                                    className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-200"
                                >
                                    <span>📋</span>
                                    <span>{copySuccess ? 'Copied!' : 'Copy Summary'}</span>
                                </button>

                                <button
                                    onClick={handleDownloadTxt}
                                    className="flex items-center justify-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded-lg font-medium transition-all duration-200"
                                >
                                    <span>📁</span>
                                    <span>Download .txt</span>
                                </button>

                                <button
                                    onClick={() => document.getElementById('emailInput').focus()}
                                    className="flex items-center justify-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-3 rounded-lg font-medium transition-all duration-200"
                                >
                                    <span>📧</span>
                                    <span>Send Document Summary</span>
                                </button>
                            </div>

                            {/* Email Section */}
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <h4 className="font-semibold text-gray-800 mb-3">📧 Send Document Summary to Email</h4>
                                <div className="flex space-x-3">
                                    <input
                                        id="emailInput"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email address to receive document summary..."
                                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        onClick={handleSendEmail}
                                        disabled={!email.trim() || emailLoading}
                                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {emailLoading ? (
                                            <div className="flex items-center space-x-2">
                                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                                <span>Sending...</span>
                                            </div>
                                        ) : (
                                            "Send"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            Generated by BatCheet.ai
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-all duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryModal;
