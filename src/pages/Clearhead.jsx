import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ClearHead() {
  const steps = [
    { label: "SEE", text: "Look around and name 5 things you can SEE." },
    { label: "FEEL", text: "Notice 4 things you can FEEL (chair, clothes, air)." },
    { label: "HEAR", text: "Listen and name 3 sounds you can HEAR." },
    { label: "SMELL", text: "Identify 2 smells around you." },
    { label: "TASTE", text: "Notice 1 thing you can TASTE right now." },
  ];

  const total = steps.length;
  const STEP_TIME = 12;

  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(STEP_TIME);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    if (timer === 0) {
      if (step + 1 >= total) {
        setDone(true);
        return;
      }
      setStep(step + 1);
      setTimer(STEP_TIME);
      return;
    }

    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, step, done]);

  const restart = () => {
    setStep(0);
    setTimer(STEP_TIME);
    setDone(false);
  };

  // 🔥 Progress is based on current step timer only
  const progress = (timer / STEP_TIME) * 100;

  return (
    <div className="relative h-[calc(100vh-66px)] flex items-center justify-center bg-gradient-to-b from-gray-950 to-black text-white">

      {/* Background Glow */}
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-600/25 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Back Button */}
      <button
  onClick={() => window.history.back()}
  className="
    absolute top-6 left-6 z-20
    flex items-center gap-2
    text-sm text-gray-400
    hover:text-white transition
  "
>
  ← Back
</button>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-6 rounded-3xl border border-gray-800 bg-gray-900/60 backdrop-blur-md shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-purple-400">
            Grounding Reset
          </p>
          <p className="text-xs text-gray-400">
            Step {step + 1}/{total}
          </p>
        </div>

        {/* Content */}
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-6 flex flex-col items-center"
          >
            {/* Timer Ring */}
            <div className="relative">
              <svg className="w-40 h-40" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  className="stroke-gray-700 fill-transparent"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  className="stroke-purple-500 fill-transparent"
                  strokeWidth="6"
                  strokeDasharray="276"
                  strokeDashoffset={(276 * (100 - progress)) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-light">{timer}</div>
                <div className="mt-2 text-xs text-gray-400">
                  {steps[step].label}
                </div>
              </div>
            </div>

            {/* Instruction Card */}
            <div className="mt-6 w-full p-4 rounded-2xl border border-gray-800 bg-gray-800/50">
              <p className="text-sm text-gray-200">
                {steps[step].text}
              </p>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Sit still • Eyes open • No effort
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center"
          >
            <div className="text-4xl mb-2 text-purple-400">✨</div>
            <h2 className="text-xl font-semibold">Reset complete</h2>
            <p className="mt-2 text-sm text-gray-400">
              Your mind is calmer now.
            </p>

            <button
              onClick={restart}
              className="mt-6 px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
            >
              Start again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
