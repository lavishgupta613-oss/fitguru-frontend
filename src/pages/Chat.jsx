import { useState, useEffect, useRef } from "react";
import { Trash, Pin, PinOff } from "lucide-react";
import ReactMarkdown from "react-markdown";


export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatName, setChatName] = useState("My Health Chat");

  const [loading, setLoading] = useState(false);

  // Notes states
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const chatEndRef = useRef(null);

  // Load notes on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fitguru_notes")) || [];
    setNotes(saved);
  }, []);

  // Auto-save notes to localStorage
  useEffect(() => {
    localStorage.setItem("fitguru_notes", JSON.stringify(notes));
  }, [notes]);

  // Auto-scroll chat
 

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://fitguru-backend.onrender.com//chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input ,session_id: "user_123"}),
      });

      const data = await res.json();
      const botMsg = { sender: "bot", text: data.reply };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error reaching FitGuru server." },
      ]);
    }

    setLoading(false);
  };

  // Quick prompts
  const quickPrompt = (msg) => {
    setInput(msg);
    sendMessage(msg);
  };

  // Add new note
  const addNote = () => {
    if (!newNote.trim()) return;

    const noteObj = {
      id: Date.now(),
      text: newNote,
    };

    setNotes((prev) => [...prev, noteObj]);
    setNewNote("");
  };

  return (
<div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

  {/* Left Notes Sidebar */}
  <aside className="w-80 bg-gray-900/60 border-r border-white/10 p-4 flex flex-col backdrop-blur-md h-full">
    <h2 className="text-xl font-bold mb-3">📝 Personal Notes</h2>

    {/* Add Note Input */}
    <textarea
      value={newNote}
      onChange={(e) => setNewNote(e.target.value)}
      placeholder="Write a note..."
      className="w-full p-3 h-24 bg-white/10 border border-white/20 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    ></textarea>

    <button
      onClick={addNote}
      className="mt-2 w-full bg-blue-600 py-2 rounded-lg text-white font-medium hover:bg-blue-700 transition"
    >
      ➕ Add Note
    </button>

    {/* Notes List */}
    <div className="mt-4 flex-1 overflow-y-auto">
      {notes.length === 0 ? (
        <p className="text-white/60 text-sm">No notes saved yet.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            className={`p-3 my-2 border rounded-lg text-sm bg-white/10 border-white/10 relative`}
          >
            <p className={`${note.pinned ? "text-yellow-300 font-semibold" : "text-white"}`}>
              {note.text}
            </p>

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => {
                  setNotes((prev) =>
                    prev.map((n) =>
                      n.id === note.id ? { ...n, pinned: !n.pinned } : n
                    )
                  );
                }}
                title="Save Permanently"
                className={`w-8 h-8 flex items-center justify-center rounded-full 
                  ${note.pinned ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"} 
                  text-white shadow transition`}
              >
                {note.pinned ? <PinOff size={16} /> : <Pin size={16} />}
              </button>

              <button
                onClick={() =>
                  setNotes((prev) => prev.filter((n) => n.id !== note.id))
                }
                title="Delete"
                className="w-8 h-8 flex items-center justify-center rounded-full 
                  bg-red-500 hover:bg-red-600 text-white shadow transition"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </aside>

  {/* Right Chat Area */}
  <div className="flex flex-col flex-1 h-full">

    {/* Header */}
    <header className="py-4 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg flex items-center justify-center gap-3">
      <span className="text-2xl">🧠</span>
      <input
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
        className="bg-transparent text-white text-xl font-bold border-b border-white/50 focus:outline-none pb-1"
      />
    </header>

    {/* Quick Buttons */}
    <div className="flex gap-3 justify-center mt-4 px-4 flex-wrap">
      {[
        "Suggest a workout 🏋️",
        "Give me a diet plan 🥗",
        "Motivate me 🔥",
        "Help me lose weight ⚖️",
        "Track my progress 📊",
      ].map((btn, i) => (
        <button
          key={i}
          onClick={() => quickPrompt(btn)}
          className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition text-sm border border-white/20"
        >
          {btn}
        </button>
      ))}
    </div>

    {/* Chat Window */}
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 my-3 ${
            m.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {m.sender === "bot" && (
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712106.png"
              className="w-10 h-10 rounded-full"
              alt="bot"
            />
          )}

          <div
            className={`p-3 rounded-2xl max-w-[70%] text-sm leading-relaxed shadow
            ${
              m.sender === "user"
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-white/10 text-white border border-white/10 rounded-bl-none"
            }`}
          >
            {m.text}
          </div>

          {m.sender === "user" && (
            <img
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              className="w-10 h-10 rounded-full"
              alt="user"
            />
          )}
        </div>
      ))}

      {loading && (
        <div className="flex items-center gap-3 my-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712106.png"
            className="w-10 h-10 rounded-full opacity-70"
          />
          <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        </div>
      )}

      <div ref={chatEndRef}></div>
    </div>

    {/* Input Bar */}
    <div className="p-4 bg-gray-900/80 border-t border-white/10 flex gap-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ask FitGuru something..."
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 px-6 py-3 rounded-xl text-white font-medium hover:bg-blue-700 transition active:scale-95"
      >
        Send
      </button>
    </div>

  </div>
</div>

  );
}
