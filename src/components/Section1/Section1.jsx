import React, { useContext, useRef } from 'react'
import Canvas from './Canvas'
import Sidebar from './Sidebar'
import { data } from '../../contextapi/Context'
import { useNavigate } from 'react-router-dom'
import {motion} from 'motion/react';
import Transition from '../Landing_page/Transition'
const Section1 = () => {
  const navigate=useNavigate();
  const containRef=useRef(null);
  return (
    <>
    <Transition/>
    <div ref={containRef} className='relative w-full h-screen'>
      <div className='px-5 py-10 fixed z-1 text-4xl text-white text-bold font-[Asimovian]'>
        <motion.h1 whileHover={{scale:1.2}} className='cursor-pointer' onClick={()=>{navigate('/')}}>RONPAD</motion.h1>
      </div>
        <Canvas/>
        <Sidebar containRef={containRef}/>
    </div>
    
    </>
  )
}

export default Section1