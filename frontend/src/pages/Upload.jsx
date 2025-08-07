// src/pages/Upload.jsx
import { useUploadStore } from "../store/upload.store";
import { useNavigate } from "react-router-dom";

export default function Upload() {
    const {
        title,
        setTitle,
        setFile,
        uploadDocument,
        isUploading,
        error,
    } = useUploadStore();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const docId = await uploadDocument();
        if (docId) navigate(`/chat/${docId}`);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 shadow rounded bg-white">
            <h2 className="text-xl font-bold mb-4">Upload Document</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Document title"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="file"
                    accept=".pdf, .png, .jpg, .jpeg"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload"}
                </button>

                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    );
}
