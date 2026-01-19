import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";



export default function NotesPanel({ onAddInfo }) {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

const startBreathing = () => {
  navigate("/calm-breath");
};
  // Delete a note
  const deleteNote = (index) => setNotes(notes.filter((_, i) => i !== index));
  
const startNewChat = () => {
  console.log("Starting new chat");
  // Later:
  // clear messages
  // reset context
  // open empty chat window
};

const startEyeRelax = () => {
  navigate("/relax-eyes");
};

const startPostureReset = () => {
  navigate("/posture-reset");
};

const startClearHead = () => {
  navigate("/clear-head");
};

  // Add a note
  const addNote = () => {
    // const trimmed = input.trim();  
   // const types = ["🏋️", "🥗", "⏰"];
    // const type = types[Math.floor(Math.random() * types.length)]; // Random type
    // setNotes([...notes, { text: trimmed, type, time: new Date().toLocaleTimeString() }]);
    setInput("");
    if (onAddInfo) onAddInfo();
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     addNote();
  //   }
  // };

  return (
    <div className="h-full border-r border-gray-700 p-4 flex flex-col bg-gray-900">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">My Info</h2>
        <span className="text-gray-400 text-sm animate-pulse">💡</span>
      </div>

      {/* Add Info / Input */}
      <div className="mb-4 flex flex-col space-y-2">
        <div className="flex gap-2">
        
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addNote}
            className="px-8 min-w-[280px] py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg transition"
          >
            Add Info➕
          </motion.button>
        </div>
        <button
          onClick={() => alert("Extra feature coming soon!")}
          className="text-xs text-gray-400 hover:text-purple-400 transition self-start"
        >
          Suggest Info Ideas 💡
        </button>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        <AnimatePresence>
          {notes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col justify-center items-center text-gray-400 text-sm text-center px-2 space-y-2"
            >
             
              <motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  onClick={startNewChat}
  className="
    w-full mb-4
    flex items-center justify-center gap-2
    rounded-xl py-3
    bg-gray-800 hover:bg-gray-700
    border border-gray-700
    text-gray-200 font-medium
    shadow-sm transition
  "
>
  💬 Start New Chat
</motion.button>

            </motion.div>
          ) : (
            notes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-800 p-3 rounded-lg flex justify-between items-start shadow-md hover:shadow-xl transition group"
              >
                <div>
                  <p className="text-sm text-gray-200">
                    <span className="mr-2">{note.type}</span>
                    {note.text}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{note.time}</p>
                </div>
                <button
                  onClick={() => deleteNote(index)}
                  className="ml-2 text-red-500 hover:text-red-400 text-sm transition opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      {/* Quick Reset Section */}
{/* Quick Reset Section */}
<div className="mt-6 px-1">
  <div className="mb-3 flex items-center justify-between">
    <p className="text-xs uppercase tracking-wide text-gray-400">
      Quick reset
    </p>
  </div>

  <div className="grid grid-cols-1 gap-3">
    {[
      { label: "Calm Breath", icon: "🌬️", action: startBreathing },
      { label: "Relax Eyes", icon: "👀", action: startEyeRelax },
      { label: "Clear Head", icon: "🧠", action: startClearHead },
    ].map((item) => (
      <motion.button
        key={item.label}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={item.action}
        className="
          group relative overflow-hidden
          rounded-2xl p-2 h-[50px]
          bg-gradient-to-br from-gray-800 to-gray-900
          border border-gray-700
          shadow-sm hover:shadow-md
          transition-all
        "
      >
        {/* Soft glow */}
        <div className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          bg-purple-500/10 blur-xl transition
        " />

       <div className="relative flex flex-col gap-2">
  {/* Top row: icon + label */}
  <div className="flex items-center gap-3">
    {/* Icon bubble */}
    <div
      className="
        h-8 w-9 rounded-full
        bg-gray-700/70
        flex items-center justify-center
        text-lg
        shrink-0
      "
    >
      {item.icon}
    </div>

    <p className="text-sm font-medium text-gray-200 whitespace-nowrap">
      {item.label}
    </p>
  </div>

 
</div>

      </motion.button>
    ))}
  </div>
</div>



      {/* Footer */}
      <div className="mt-4 text-gray-500 text-xs text-center animate-pulse">
        Your notes are saved locally ✨
      </div>
    </div>
  );
}
