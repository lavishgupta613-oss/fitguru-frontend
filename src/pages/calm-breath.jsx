import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CalmBreath() {
  const phases = [
    { label: "Inhale", duration: 4, tip: "Breathe in slowly" },
    { label: "Hold", duration: 4, tip: "Hold gently" },
    { label: "Exhale", duration: 6, tip: "Release and relax" },
  ];

  const totalCycles = 3;

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [count, setCount] = useState(phases[0].duration);
  const [cycle, setCycle] = useState(0);
  const [done, setDone] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  const current = phases[phaseIndex];

  // ⏱ TIMER LOGIC
  useEffect(() => {
    if (done) return;

    const timeout = setTimeout(() => {
      if (count > 1) {
        setCount((c) => c - 1);
        return;
      }

      const nextPhase = (phaseIndex + 1) % phases.length;

      if (nextPhase === 0) {
        if (cycle + 1 >= totalCycles) {
          setDone(true);
          return;
        }
        setCycle((c) => c + 1);
      }

      setPhaseIndex(nextPhase);
      setCount(phases[nextPhase].duration);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [count, phaseIndex, cycle, done]);

  // 🔁 RESET — FORCE REMOUNT
  const resetExercise = () => {
    setPhaseIndex(0);
    setCount(phases[0].duration);
    setCycle(0);
    setDone(false);
    setSessionKey((k) => k + 1); // ✅ CRITICAL
  };

  return (
    <div className="relative h-[calc(100vh-66px)] flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
     <button
  onClick={() => window.history.back()}
  className="
    absolute top-5 left-5 z-50
    flex items-center gap-2
    px-3 py-1.5
    rounded-full
    bg-white/5 backdrop-blur-md
    text-sm text-gray-300
    hover:bg-white/10 hover:text-white
    transition
  "
>
  <span className="text-lg">←</span>
  Back
</button>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={`session-${sessionKey}`} // ✅ FORCE REMOUNT
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{
                scale:
                  current.label === "Inhale"
                    ? 1.25
                    : current.label === "Exhale"
                    ? 0.9
                    : 1,
              }}
              transition={{ duration: current.duration, ease: "easeInOut" }}
              className="h-60 w-60 rounded-full bg-purple-600/20 border border-purple-400 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.35)]"
            >
              <span className="text-2xl font-semibold">{current.label}</span>
            </motion.div>

            <p className="mt-6 text-3xl font-light">{count}</p>
            <p className="mt-2 text-sm text-gray-400">{current.tip}</p>

            <p className="mt-6 text-xs text-gray-500">
              Cycle {cycle + 1} of {totalCycles}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-3">🌿</div>
            <h2 className="text-xl font-semibold">Well done</h2>
            <p className="mt-2 text-sm text-gray-400">
              Your breathing is slower now.
            </p>

            <button
              onClick={resetExercise}
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
