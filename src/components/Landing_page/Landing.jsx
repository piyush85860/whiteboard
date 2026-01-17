import React from 'react'

const Landing = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 bg-[url('/bg2.png')] bg-cover bg-center">
      <div className=' fixed z-1 top-10 px-10 py-3 rounded-full flex justify-between items-center text-white bg-black/20 backdrop-blur-3xl gap-7'>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
      </div>
      {/* Heading */}
      <h1 className="text-[10rem] leading-none font-[Barriecito] bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent">
        RONPAD
      </h1>

      {/* Description */}
      <p className="w-[40%] text-center text-lg font-[Inter] font-extralight leading-snug bg-gradient-to-r from-black to-green-500 bg-clip-text text-transparent">
        Ideas don’t wait—and neither should your canvas.<br />
        RONPAD is built for moments when thoughts flow faster than words.
        Sketch freely, shape ideas visually, and turn rough sparks into clarity
      </p>

      {/* Button */}
      <button className="mt-2 px-5 py-2 bg-blue-900 text-white font-[Barriecito] rounded-3xl tracking-[0.3rem]">
        START CANVAS
      </button>

    </div>
  )
}

export default Landing
