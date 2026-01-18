import { useContext } from "react";
import { data } from "../../contextapi/Context";
import { motion } from "framer-motion"; // Note: standard import is usually framer-motion

const Panel1 = ({ containRef }) => {
  const { setBrushSize, setcolorSet, colorSet } = useContext(data);
  
  const colorActive = {
    active: 'w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white ring-2 ring-gray-900 cursor-pointer',
    notactive: 'w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer'
  };
  
  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#000000', '#f97316'];

  return (
    <motion.div 
      drag 
      dragConstraints={containRef} 
      initial={{ scale: 0.8, opacity: 0, y: 20 }} 
      animate={{ scale: 1, opacity: 1, y: 0 }} 
      // Responsive positioning: Bottom on mobile, Side on desktop
      className='fixed bottom-24 left-1/2 -translate-x-1/2 md:absolute md:translate-y-[-50vh] md:left-24 md:translate-x-0 
                 bg-gray-800/95 backdrop-blur-sm p-4 rounded-2xl flex flex-col gap-4 shadow-2xl z-40 border border-gray-600'
    >
      {/* Drag Handle Indicator */}
      <div className="w-8 h-1 bg-gray-600 rounded-full mx-auto mb-1 md:hidden" />

      <div className='flex flex-wrap justify-center gap-3'>
        {colors.map((color, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={() => setcolorSet(color)} 
            className={colorSet === color ? colorActive.active : colorActive.notactive} 
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Brush Size</label>
        <input
          type="range"
          min={1}
          max={50}
          onChange={(e) => setBrushSize(e.target.value)}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
    </motion.div>
  );
}

export default Panel1;