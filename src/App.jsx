import React, { useEffect, useState } from 'react'
import Section1 from './components/Section1/Section1'
import Landing from './components/Landing_page/Landing'
import { motion, useMotionValue, useTransform, animate,AnimatePresence } from 'framer-motion'
import { Route,Routes } from 'react-router-dom'
const App = () => {
  const [loaded, setloaded] = useState(false)
  // 1. Create a MotionValue to hold the number
  const count = useMotionValue(0);
  
  // 2. Transform that number into a rounded integer
const rounded = useTransform(count, (latest) => `${Math.round(latest)}%`);
  useEffect(() => {
    // 3. Animate the number from 0 to 100 over 1 second
    const controls = animate(count, 100, { 
      duration: 1,
      ease: "easeInOut", // Matches the default feel of your bar
      onComplete:()=>{setloaded(true);}
    });

    return () => controls.stop();
  }, [count]);

  return (
    <div className='w-full h-full overflow-hidden'>
      {/* Loading Overlay */}
      {!loaded&&
      <div  className='w-full h-screen overflow-hidden absolute z-[100] inset-0 flex flex-col bg-blue-500'>
        
        {/* The Counter */}
        <motion.h1 className='text-9xl text-black px-15 translate-y-[50vh] font-[JARO]'>
          {rounded}
        </motion.h1>

        {/* The Progress Bar */}
        <motion.div 
          initial={{ scaleX: 0 }} 
          animate={{ scaleX: 1 }} 
          transition={{ duration: 1, ease: "easeInOut" }} 
          className='w-full h-[20vh] bg-black translate-y-[60vh] origin-left'
        />
      </div>}
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Landing isAppLoaded={loaded}/>}/>
          <Route path='/draw' element={<Section1/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App