import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import ProfilePanel from "./ProfilePanel";

export default function ChatPanel({
  messages,
  input,
  setInput,
  chatName,
  setChatName,
  sendMessage,
  loading,
}) {
  const endRef = useRef(null);

  // Auto-scroll messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* PROFILE PANEL */}
    

      {/* HEADER */}
      <header className="sticky top-0 z-10 py-3 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg flex items-center px-4">
        <div className="w-8" />

        <div className="flex items-center gap-3 mx-auto">
          <span className="text-2xl">🧠</span>
          <input
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="bg-transparent text-xl font-bold border-b border-white/50 focus:outline-none"
          />
        </div>

       
      </header>

      {/* QUICK PROMPTS (ONLY WHEN EMPTY) */}
      {messages.length === 0 && (
        <div className="flex gap-3 justify-center py-2 flex-wrap px-4">
          {[
            "Suggest a workout 🏋️",
            "Give me a diet plan 🥗",
            "Motivate me 🔥",
          ].map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              className="bg-white/10 px-4 py-2 rounded-full text-sm hover:bg-white/20"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* MESSAGES (ONLY SCROLL AREA) */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex my-3 ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 max-w-[70%] rounded-2xl text-sm ${
                m.sender === "user"
                  ? "bg-blue-600 rounded-br-none"
                  : "bg-white/10 border border-white/10 rounded-bl-none"
              }`}
            >
              {m.sender === "bot" ? (
                <ReactMarkdown>{m.text}</ReactMarkdown>
              ) : (
                m.text
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm opacity-60 mt-2">
            FitGuru is typing…
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* INPUT */}
      <div className="sticky bottom-0 p-3 bg-gray-900/90 border-t border-white/10 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20"
          placeholder="Ask FitGuru something..."
        />
        <button
          onClick={() => sendMessage()}
          className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
