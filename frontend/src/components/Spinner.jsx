import React from 'react'

const Spinner = () => {
    return (
        <>
            <div
                role="status"
                className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-[#000106] via-[#1a1f3a] to-[#000106] z-[9999] animate-shimmer"
            >
                <div className="relative animate-float">
                    <div className="w-16 h-16 border-4 border-transparent border-t-cyan-400 border-r-purple-500 border-b-pink-500 rounded-full animate-spin animate-glow"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-transparent border-t-purple-400 border-r-pink-500 border-b-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse animate-glow"></div>
                </div>
                <div className="mt-8 text-center animate-float" style={{ animationDelay: '0.5s' }}>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent animate-pulse">
                        Loading...
                    </h2>
                    <p className="text-gray-600 text-sm mt-3 animate-pulse" style={{ animationDelay: '1s' }}>
                        Please wait while we prepare your experience
                    </p>
                </div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-bounce opacity-60 animate-glow"
                            style={{
                                left: `${15 + i * 12}%`,
                                top: `${25 + (i % 3) * 25}%`,
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: '2.5s'
                            }}
                        ></div>
                    ))}
                </div>

                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>

                <span className="sr-only">Loading...</span>
            </div>
        </>
    )
}

export default Spinner