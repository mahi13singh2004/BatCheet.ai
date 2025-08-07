import React from 'react'

const Home = () => {
  return (
    <div className='pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-8xl mb-6">🚀</div>
          <h1 className='text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4'>
            Welcome to BatCheet.ai
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your documents and start chatting with AI to get instant insights and answers
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="text-4xl mb-3">📤</div>
                <h3 className="font-medium text-gray-800 mb-2">1. Upload Document</h3>
                <p className="text-gray-600 text-sm">Upload a PDF or image file to get started</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-medium text-gray-800 mb-2">2. AI Processing</h3>
                <p className="text-gray-600 text-sm">Our AI extracts and understands your content</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-medium text-gray-800 mb-2">3. Start Chatting</h3>
                <p className="text-gray-600 text-sm">Ask questions and get instant answers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home