import React from 'react'

const TopSpinner = () => {
    return (
        <>
            <div
                role="status"
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-[10000] animate-shimmer"
            >
                <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse"></div>
            </div>

            {/* Optional: Add a small loading indicator in the top-right corner */}
            <div className="fixed top-4 right-4 z-[10001]">
                <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
                    <div className="w-3 h-3 border-2 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full animate-spin"></div>
                    <span className="text-white text-xs font-medium">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default TopSpinner
