import React, { useRef,useEffect,useState } from 'react'
import { motion ,scale,useAnimation} from "motion/react"
import { useNavigate } from 'react-router-dom';
const Landing = ({isAppLoaded}) => {
  const headRef=useRef();
  const paraRef=useRef();
  const buttonRef=useRef();
  const containerRef=useRef();
  const controls = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const navigate=useNavigate();
    const [firsttime, setfirsttime] = useState(true)

useEffect(() => {
   
    if (!isAppLoaded) return; 

    async function sequence() {
      const baseDelay = 0.2; 

      controls.start({
        rotateZ: 5,
        y: 100,
        transition: { delay: baseDelay, duration: 0.4 },
      }).then(() => controls.start({ y: 800, transition: { duration: 0.5 } }));

      controls2.start({
        rotateZ: -55,
        y: 100,
        transition: { delay: baseDelay + 0.1, duration: 0.5 },
      }).then(() => controls2.start({ y: 800, transition: { duration: 0.5 } }));

      controls3.start({
        rotateZ: -15,
        y: 100,
        transition: { delay: baseDelay + 0.2, duration: 0.5 },
      }).then(() => controls3.start({ y: 800, transition: { duration: 0.5 } }));
    }

    sequence();
  }, [isAppLoaded, controls, controls2, controls3]);

  return (
    <motion.div ref={containerRef} className="overflow-hidden w-full h-screen flex flex-col justify-center items-center gap-4 bg-[url('/bg2.png')] bg-cover bg-center">
      {firsttime&&
      <div className='overflow-hidden w-full h-full absolute z-1 inset-0 pointer-events-none flex flex-col justify-center items-center gap-1.5'>
        <motion.div animate={controls} className='w-[50vw] h-[20vh] bg-blue-400 rounded-4xl'></motion.div>
        <motion.div animate={controls2} transition={{duration:0.5,ease:"easeInOut"}} className='w-[60vw] h-[10vh] bg-blue-400 rounded-4xl'></motion.div>
        <motion.div animate={controls3} className='w-[15vw] h-[10vh] bg-blue-400 rounded-4xl'></motion.div>

      </div>}
      <div className=' fixed z-1 top-10 px-10 py-3 rounded-full flex justify-between items-center text-white bg-black/20 backdrop-blur-3xl gap-7'>
        
      </div>
      {/* Heading */}
      <motion.h1 ref={headRef}
   className="origin-bottom text-[5rem] md:text-[10rem] leading-none font-[Barriecito] bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent">
        RONPAD
      </motion.h1>

      {/* Description */}
      <p ref={paraRef} className="w-[40%] hidden md:flex text-center text-lg font-[Inter] font-extralight leading-snug bg-gradient-to-r from-black to-green-500 bg-clip-text text-transparent transition-all duration-300">
        Ideas don’t wait—and neither should your canvas.<br />
        RONPAD is built for moments when thoughts flow faster than words.
        Sketch freely, shape ideas visually, and turn rough sparks into clarity
      </p>
      <p className="w-[40%] flex md:hidden text-center text-lg font-[Inter] font-extralight leading-snug bg-gradient-to-r from-black to-green-500 bg-clip-text text-transparent transition-all duration-300">
        Ideas don’t wait—and neither should your canvas.
        
      </p>
      

      {/* Button */}
      <motion.button onClick={()=>{navigate('/draw')}} whileHover={{scale:1.2,backgroundColor:"red"}} ref={buttonRef} className="mt-2 px-5 py-2 bg-blue-900 text-white font-[Barriecito] rounded-3xl tracking-[0.3rem]">
        START CANVAS
      </motion.button>

    </motion.div>
  )
}

export default Landing
