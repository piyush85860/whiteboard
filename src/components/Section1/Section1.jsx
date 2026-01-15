import React from 'react'
import Canvas from './Canvas'
import Sidebar from './Sidebar'

const Section1 = () => {
  return (
    <div className='relative w-full h-screen'>
        <Canvas/>
        <Sidebar/>
    </div>
  )
}

export default Section1