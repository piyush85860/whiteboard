import { useContext } from "react";
import { data } from "../../contextapi/Context";
import { motion } from "motion/react";

const Panel2 = ({ containRef }) => {
  const { setBrushSize } = useContext(data);

  return (
    <motion.div
      drag
      dragConstraints={containRef}
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className="fixed bottom-28 left-1/2 -translate-x-1/2 md:absolute md:translate-y-[-40vh] md:left-24 md:translate-x-0 
                 w-[250px] md:w-[200px] bg-gray-800/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl z-40 border border-gray-600"
    >
      <div className="w-8 h-1 bg-gray-600 rounded-full mx-auto mb-3 md:hidden" />

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Eraser Size
          </label>
          <i className="ri-eraser-line text-gray-400"></i>
        </div>
        
        <input
          type="range"
          min={1}
          max={100} 
          onChange={(e) => setBrushSize(e.target.value)}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-400"
        />
      </div>
    </motion.div>
  );
};

export default Panel2;