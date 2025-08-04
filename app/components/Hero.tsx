import React from 'react'

export const Hero = () => {
  return (
    <div>
        <div className="relative flex flex-col justify-center items-center h-screen">
            <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat bg-fixed opacity-50"></div>
            <h1 className="text-4xl font-bold text-white z-10">Society where we bring !dea to life</h1>
        </div>
    </div>
  )
}
