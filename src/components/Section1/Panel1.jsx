import { useContext } from "react"
import { data } from "../../contextapi/Context"
import { motion } from "motion/react";
const Panel1 = () => {

    const {setBrushSize,setcolorSet,colorSet}=useContext(data);
    const colorActive={active:'w-[50px] h-[50px] rounded-full border-2 border-black cursor-pointer',notactive:'w-[50px] h-[50px] rounded-full cursor-pointer'};
    const colors=['red','blue','green','yellow','black','orange'];
  return (
    <motion.div drag initial={{scaleX:0,opacity:0,x:-50}} animate={{scaleX:1,opacity:1,x:0}} transition={{duration:0.5, ease:"easeInOut"}} className='origin-left w-[15%] h-[15%] absolute top-[25%] left-[8%] bg-gray-700 rounded-3xl flex flex-col py-3 px-5'>
       <div className='w-full h-full flex gap-2'>
            {colors.map((color,idx)=>{
            return(
                <motion.div whileHover={{scale:1.2}} onClick={()=>{setcolorSet(colors[idx])}} className={colorSet===colors[idx]?colorActive.active:colorActive.notactive} style={{backgroundColor:color}}></motion.div>
            )
        })}
       </div>
       <input
  type="range"
  min={1}
  max={50}
  onChange={(e) => {setBrushSize(e.target.value)}}
  className="brush-slider"
/>

    </motion.div>
  )
}

export default Panel1