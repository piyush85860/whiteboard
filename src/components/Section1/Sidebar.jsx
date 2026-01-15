import React, { useContext ,useEffect} from 'react'
import { data } from '../../contextapi/Context.jsx'
import 'remixicon/fonts/remixicon.css'
import { motion } from "motion/react"
import Panel1 from './Panel1.jsx'
const Sidebar = () => {
    const {icons,barmap,activeTool,setactiveTool,panels,setpanels}=useContext(data);
  return (
    <>
        {activeTool===0&&<Panel1/>}
        <div className='absolute left-10 top-50 px-3 py-4 bg-gray-700 rounded-md flex flex-col gap-2 text-xl'>
            {icons.map((icon,idx)=>{
                return(
                    <motion.button whileHover={{ scale: 1.2 }} onClick={()=>(setactiveTool(idx))} className={activeTool === idx ? barmap.active : barmap.notactive}>{icon}</motion.button>
                )
            })}
            
        </div>
        
    </>  
  )
}

export default Sidebar