import { motion } from "framer-motion";

const Transition = () => {
  const bars = [
    { delay: 0.0, duration: 0.8 },
    { delay: 0.1, duration: 0.7 },
    { delay: 0.2, duration: 0.6 },
    { delay: 0.3, duration: 0.5 },
    { delay: 0.4, duration: 0.4 },
  ];

  return (
    <>
      

      <div className="fixed inset-0 z-[200] flex pointer-events-none">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="h-full w-full bg-black origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ 
              duration: bar.duration, 
              delay: bar.delay, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 z-[200] flex pointer-events-none">
        {bars.map((bar, i) => (
          <motion.div
            key={`in-${i}`}
            className="h-full w-full bg-black origin-bottom"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ 
              duration: bar.duration, 
              delay: bar.delay, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Transition;