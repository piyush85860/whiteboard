import React, { useContext ,useEffect} from 'react'
import { data } from '../../contextapi/Context.jsx'
import 'remixicon/fonts/remixicon.css'
import { motion } from "motion/react"
import Panel1 from './Panel1.jsx'
import Panel2 from './Panel2.jsx'
import Panel3 from './Panel3.jsx'
const Sidebar = ({containRef}) => {
  const {
    icons,
    barmap,
    activePanel,
    setActivePanel,
    setactiveTool,
    setUndoFn,
    setRedoFn
  } = useContext(data);

  return (
    <>
      {activePanel === 0 && <Panel1 containRef={containRef}/>}
      {activePanel === 1 && <Panel2 containRef={containRef}/>}
      {activePanel === 2 && <Panel3 containRef={containRef}/>}

      <div className="absolute 
    /* Mobile: Horizontal, centered at the bottom */
    bottom-8 left-1/2 -translate-x-1/2 flex flex-row 
    /* Desktop (md): Vertical, centered on the left */
    md:top-1/2 md:left-6 md:bottom-auto md:-translate-y-1/2 md:translate-x-0 md:flex-col 
    
    gap-2 px-3 py-3 bg-gray-800/90 backdrop-blur-md border border-gray-600 rounded-2xl shadow-2xl z-50 transition-all duration-300">
        {icons.map((icon, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setActivePanel(idx);
              
              if (idx === 0) setactiveTool(0); // pen
              if (idx === 1) setactiveTool(1); // eraser
              if (idx === 2) setactiveTool(2); // shape
              if(idx==3){alert("This feature is yet to be implemented")}
              if(idx===4){setUndoFn(true)}
              if(idx===5){setRedoFn(true)}
            }}
            className={activePanel === idx ? barmap.active : barmap.notactive}
          >
            {icon}
          </motion.button>
        ))}
      </div>
    </>
  );
};


export default Sidebar