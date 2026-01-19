import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RelaxEyesDot() {
  const totalDuration = 18; // seconds
  const [count, setCount] = useState(totalDuration);
  const [done, setDone] = useState(false);

  // random movement state
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const directions = [
    { x: -30, y: 0 },
    { x: 25, y: 0 },
    { x: 0, y: -17 },
    { x: 0, y: 12 },
  ];

  useEffect(() => {
    if (done) return;

    const timer = setTimeout(() => {
      if (count <= 1) {
        setDone(true);
        return;
      }
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, done]);

  // move dot randomly every 2 seconds
  useEffect(() => {
    if (done) return;

    const moveInterval = setInterval(() => {
      const next = directions[Math.floor(Math.random() * directions.length)];
      setPosition(next);

      // return to center after 1 second
      setTimeout(() => setPosition({ x: 0, y: 0 }), 1000);
    }, 2000);

    return () => clearInterval(moveInterval);
  }, [done]);

  const resetExercise = () => {
    setCount(totalDuration);
    setDone(false);
  };

  return (
    <div className="relative h-[calc(100vh-66px)] flex items-center justify-center bg-black text-white overflow-hidden">

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-5 left-5 z-50 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-sm text-gray-300 hover:text-white transition"
      >
        ← Back
      </button>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key="exercise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            {/* Instruction */}
            <p className="text-sm text-gray-300 mb-25">
              Follow the dot without moving your head
            </p>

            {/* Dot Path */}
            <div className="relative w-[80vw] max-w-xl h-44 flex items-center justify-center">
              <motion.div
                className="h-4 w-4 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)]"
                animate={{
                  x: `${position.x}vw`,
                  y: `${position.y}vh`,
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Countdown */}
            <p className="mt-8 text-xl font-light text-gray-200">
              {count}s
            </p>

            {/* Safety Notes */}
            <div className="mt-4 text-xs text-gray-400 space-y-1">
              <p>✔ No standing</p>
              <p>✔ Keep eyes open</p>
              <p>✔ Move eyes only</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-3">👁️</div>
            <h2 className="text-xl font-semibold">Exercise complete</h2>
            <p className="mt-2 text-sm text-gray-400 max-w-xs">
              Your eye muscles are relaxed. Blink naturally.
            </p>

            <button
              onClick={resetExercise}
              className="mt-6 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
            >
              Start again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
