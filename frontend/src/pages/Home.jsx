import React from "react";
import FeatureCards from "../components/FeatureCards";

const Home = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-8xl mb-6">🚀</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Welcome to BatCheet.ai
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your documents and start chatting with AI to get instant
            insights and answers
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Getting Started
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="text-4xl mb-3">📤</div>
                <h3 className="font-medium text-gray-800 mb-2">
                  1. Upload Document
                </h3>
                <p className="text-gray-600 text-sm">
                  Upload a PDF or image file to get started
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-medium text-gray-800 mb-2">
                  2. AI Processing
                </h3>
                <p className="text-gray-600 text-sm">
                  Our AI extracts and understands your content
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-medium text-gray-800 mb-2">
                  3. Start Chatting
                </h3>
                <p className="text-gray-600 text-sm">
                  Ask questions and get instant answers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeatureCards />

      <footer className="mt-10 md:mt-20 py-6 bg-gradient-to-r from-blue-50 via-green-100 to-blue-200 rounded-t-2xl shadow-inner flex flex-col items-center">
          <span className="text-lg font-bold text-green-700">BatCheet.ai</span>
          <span className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} BATCHEET. All rights reserved.</span>
          <span className="text-gray-400 text-xs mt-1">Docuemnt Analysis at fingertips</span>
          <div className="flex gap-4 mt-2">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z" /></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800" aria-label="GitHub">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.589 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
          </div>
        </footer>
    </div>
  );
};

export default Home;
