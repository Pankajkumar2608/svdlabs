"use client"
import React, { useState, useEffect } from 'react';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className="relative flex flex-col justify-center items-center min-h-screen"
        onMouseMove={handleMouseMove}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Interactive gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(247, 247, 134, 0.3) 0%, transparent 100%)`,
          }}
        />

        {/* Content */}
        <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight ">
            Society where we bring{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-[#a0eb27] border-b-2 border-[#a0eb27]">
                !deas
              </span>
              {/* <span className="absolute inset-0 blur-md bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 opacity-50 animate-pulse" /> */}
            </span>
            {' '}to life
          </h1>
          
          <p className={`text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Join a community of innovators, creators, and dreamers building the future together
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button className="group relative px-8 py-3 bg-[#a9e14e] text-neutral-800 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25">
              <span className="relative z-10">Join Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
            
            <button className="group px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105">
              Learn More
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Floating elements */}
        {/* <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} /> */}
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full relative">
              <div className="w-1 h-3 bg-white/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
