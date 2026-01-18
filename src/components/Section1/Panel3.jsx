import { useContext } from "react"
import { data } from "../../contextapi/Context"
import { motion } from "motion/react";
const Panel3 = ({containRef}) => {

    const {setBrushSize,setshapeSet,shapeSet}=useContext(data);
    const ShapeActive={active:'text-blue-500',notactive:'text-neutral-200 cursor-pointer'};
    const shapes=[<i className="ri-rectangle-line"></i>,<i className="ri-circle-line"></i>,<i className="ri-expand-vertical-s-line"></i>];
    const shapname=['rect','circle','line'];
  return (
    <motion.div drag dragConstraints={containRef} initial={{ scale: 0.8, opacity: 0, y: 20 }} 
      animate={{ scale: 1, opacity: 1, y: 0 }}  transition={{duration:0.5, ease:"easeInOut"}} className='origin-left fixed bottom-24 left-1/2 md:translate-y-[-50vh] md:left-28 bg-gray-700 rounded-3xl flex flex-col py-2 px-5 gap-3 text-4xl text-white'>
       <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Shapes
          </label>
          
        </div>
      </div>
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