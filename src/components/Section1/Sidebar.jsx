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
    setactiveTool
  } = useContext(data);

  return (
    <>
      {activePanel === 0 && <Panel1 containRef={containRef}/>}
      {activePanel === 1 && <Panel2 containRef={containRef}/>}
      {activePanel === 2 && <Panel3 containRef={containRef}/>}

      <div className="absolute left-10 top-50 px-3 py-4 bg-gray-700 rounded-md flex flex-col gap-2 text-xl">
        {icons.map((icon, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setActivePanel(idx);

              // map panel → tool explicitly
              if (idx === 0) setactiveTool(0); // pen
              if (idx === 1) setactiveTool(1); // eraser
              if (idx === 2) setactiveTool(2); // shape
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