import { useContext } from "react"
import { data } from "../../contextapi/Context"
import { motion } from "motion/react";
const Panel2 = ({containRef}) => {

    const {setBrushSize,setcolorSet,colorSet}=useContext(data);
  return (
    <motion.div drag dragConstraints={containRef} initial={{scaleX:0,opacity:0,x:-50}} animate={{scaleX:1,opacity:1,x:0}} transition={{duration:0.5, ease:"easeInOut"}} className='origin-left w-[15%] absolute top-[35%] left-[8%] bg-gray-700 rounded-3xl flex flex-col py-3 px-5'>
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

export default Panel2