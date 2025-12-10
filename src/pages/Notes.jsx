import { useState, useEffect } from "react";
import { Trash, Pin, PinOff } from "lucide-react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Load notes when page opens
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("fitguru_notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Auto-save whenever notes change
  useEffect(() => {
    localStorage.setItem("fitguru_notes", JSON.stringify(notes));
  }, [notes]);

  // Add note function
  const addNote = () => {
    if (!newNote.trim()) return;

    const noteObj = {
      id: Date.now(),
      text: newNote.trim(),
      pinned: false,
    };

    setNotes([noteObj, ...notes]);
    setNewNote("");
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  // Toggle pin
//   const togglePin = (id) => {
//     setNotes(
//       notes.map((note) =>
//         note.id === id ? { ...note, pinned: !note.pinned } : note
//       )
//     );
//   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📝 Your Personal Notes</h1>

      {/* Add Note Section */}
      <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write something important..."
          className="w-full p-3 h-24 bg-white/10 border border-white/20 rounded-lg 
          outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        ></textarea>

        <button
          onClick={addNote}
          className="mt-3 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 
          transition text-white font-medium"
        >
          ➕ Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="mt-6 space-y-4">
        {notes.length === 0 ? (
          <p className="text-white/60 text-lg">No notes added yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-white/10 border border-white/20 rounded-xl"
            >
              <p
                className={`text-sm ${
                  note.pinned ? "text-yellow-300 font-semibold" : "text-white"
                }`}
              >
                {note.text}
              </p>

              <div className="flex gap-3 justify-end mt-3">
                {/* Pin / Unpin */}
                

                {/* Delete */}
                <button
                  onClick={() => deleteNote(note.id)}
                  className="w-9 h-9 rounded-full flex items-center justify-center 
                    bg-red-500 hover:bg-red-600 transition"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
