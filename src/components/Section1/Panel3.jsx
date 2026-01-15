import { useContext } from "react"
import { data } from "../../contextapi/Context"
import { motion } from "motion/react";
const Panel3 = ({containRef}) => {

    const {setBrushSize,setshapeSet,shapeSet}=useContext(data);
    const ShapeActive={active:'text-blue-500',notactive:'cursor-pointer'};
    const shapes=[<i className="ri-rectangle-line"></i>,<i className="ri-circle-line"></i>,<i className="ri-expand-vertical-s-line"></i>];
    const shapname=['rect','circle','line'];
  return (
    <motion.div drag dragConstraints={containRef} initial={{scaleX:0,opacity:0,x:-50}} animate={{scaleX:1,opacity:1,x:0}} transition={{duration:0.5, ease:"easeInOut"}} className='origin-left absolute top-[25%] left-[8%] bg-gray-700 rounded-3xl flex flex-col py-2 px-5 gap-3 text-4xl text-white'>
       <div className='w-full h-full flex gap-2'>
            {shapes.map((shape,idx)=>{
            return(
                <motion.div whileHover={{scale:1.2}} onClick={()=>{setshapeSet(shapname[idx])}} className={shapeSet===shapname[idx]?ShapeActive.active:ShapeActive.notactive}>{shape}</motion.div>
            )
        })}
       </div>
       

    </motion.div>
  )
}

export default Panel3