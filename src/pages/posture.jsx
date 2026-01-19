import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SeatedPostureReset() {
 const DURATION = 20;

  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [done, setDone] = useState(false);
  const audioRef = useRef(null);

  // Start / stop timer
  useEffect(() => {
    if (done) return;

    if (timeLeft === 0) {
      setDone(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, done]);

  // Control sound
  useEffect(() => {
    if (!audioRef.current) return;

    if (!done) {
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [done]);

  const restart = () => {
    setTimeLeft(DURATION);
    setDone(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="/sounds/ambient-focus.mp3" type="audio/mpeg" />
      </audio>

      {/* Back */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-5 left-5 text-sm text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      {/* Subtle background pulse */}
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
      />

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-center max-w-md px-6"
          >
            <p className="text-xs uppercase tracking-widest text-purple-400">
              Sound Reset
            </p>

            <h1 className="mt-4 text-2xl font-semibold">
              Listen carefully
            </h1>

            <p className="mt-4 text-gray-400">
              Notice <span className="text-white">3 different sounds</span>{" "}
              around you.
              <br />
              Do not move your body.
            </p>

            {/* Focus pulse */}
            <motion.div
              className="mx-auto mt-10 h-4 w-4 rounded-full bg-purple-500"
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            <div className="mt-6 text-4xl font-light">
              {timeLeft}
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Sitting still • Eyes open • No effort
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center px-6"
          >
            <div className="text-3xl mb-3">🎧</div>

            <h2 className="text-xl font-semibold">
              Reset complete
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Your mind should feel a little quieter now.
            </p>

            <button
              onClick={restart}
              className="mt-6 px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
            >
              Start again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}