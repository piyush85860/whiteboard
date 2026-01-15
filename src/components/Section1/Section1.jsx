import React, { useContext, useRef } from 'react'
import Canvas from './Canvas'
import Sidebar from './Sidebar'
import { data } from '../../contextapi/Context'

const Section1 = () => {
  const containRef=useRef(null);
  return (
    <div ref={containRef} className='relative w-full h-screen'>
      <div className='px-5 py-10 fixed z-1 text-4xl text-white text-bold font-[Asimovian]'>
        <h1>RONPAD</h1>
      </div>
        <Canvas/>
        <Sidebar containRef={containRef}/>
    </div>
  )
}

export default Section1