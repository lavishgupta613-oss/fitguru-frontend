import { useState } from "react";

import ChatPanel from "./ChatPanel";
import NotesPanel from "./NotesPanel";
import ProfilePanel from "./ProfilePanel";

export default function Chat({ profile, setProfile }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatName, setChatName] = useState("My Health Chat");
  const [loading, setLoading] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());

  const sendMessage = async (text) => {
    const finalText = text ?? input;
    if (!finalText.trim()) return;

    setMessages((p) => [...p, { sender: "user", text: finalText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({    session_id: sessionId,message: finalText }),
      });

      const data = await res.json();
      setMessages((p) => [...p, { sender: "bot", text: data.reply }]);
    } catch {
      setMessages((p) => [
        ...p,
        { sender: "bot", text: "⚠️ Server error." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <div
        className={`grid h-[calc(100vh-66px)] bg-gradient-to-br
        from-gray-900 via-gray-800 to-gray-900 text-white
        ${showNotes ? "grid-cols-[320px_1fr]" : "grid-cols-1"}`}
      >
        {showNotes && (
          <NotesPanel onAddInfo={() => setShowProfile(true)} />
        )}

        <ChatPanel
          messages={messages}
          input={input}
          setInput={setInput}
          chatName={chatName}
          setChatName={setChatName}
          sendMessage={sendMessage}
          loading={loading}
          showNotes={showNotes}
          setShowNotes={setShowNotes}
        />
      </div>

      <ProfilePanel
        open={showProfile}
        onClose={() => setShowProfile(false)}
        profile={profile}
        setProfile={setProfile}
      />
    </>
  );
}
