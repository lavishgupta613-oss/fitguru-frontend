import { useState } from "react";

export default function NotesPanel({ onAddInfo }) {
  const [notes, setNotes] = useState([]);
 // const [input, setInput] = useState("");

  // Add a new note
  // const addNote = () => {
  //   const trimmed = input.trim();
  //   if (!trimmed) return;
  //   setNotes([...notes, trimmed]);
  //   setInput("");
  // };

  // Delete a note by index
  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // Handle Enter key to add note
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     addNote();
  //   }
  // };

  return (
    <div className="h-full border-r border-gray-700 p-4 flex flex-col bg-gray-900">
      {/* Add Info Button */}
      <button
        onClick={onAddInfo}
        className="mb-4 rounded-lg bg-purple-600 hover:bg-purple-700 px-4 py-2 font-semibold text-white transition"
      >
        ➕ Add My Info
      </button>

      {/* Notes Input */}
      {/* <div className="mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a note and press Enter"
          className="w-full rounded-lg bg-gray-800 px-3 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={2}
        />
        <button
          onClick={addNote}
          className="mt-2 w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-white font-semibold transition"
        >
          Add Note
        </button>
      </div> */}

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {notes.length === 0 ? (
          <p className="text-gray-400 text-sm"></p>
        ) : (
          notes.map((note, index) => (
            <div
              key={index}
              className="bg-gray-800 p-3 rounded-lg flex justify-between items-start"
            >
              <p className="text-gray-200 text-sm whitespace-pre-wrap">{note}</p>
              <button
                onClick={() => deleteNote(index)}
                className="ml-2 text-red-500 hover:text-red-400 text-sm"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
