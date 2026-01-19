// import { useState } from "react";

export default function ProfilePanel({ open, onClose,profile,setProfile }) {

  // Handle input change for basic fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle change for notes array
const handleNoteChange = (index, value) => {
  setProfile((prev) => ({
    ...prev,
    notes: prev.notes.map((n, i) =>
      i === index ? { ...n, text: value } : n
    ),
  }));
};


  // Add a new note
const addNote = () => {
  setProfile((prev) => ({
    ...prev,
    notes: [...prev.notes, { id: Date.now(), text: "" }],
  }));
};



  // Remove a note
 const removeNote = (index) => {
  setProfile((prev) => ({
    ...prev,
    notes: prev.notes.filter((_, i) => i !== index),
  }));
};

const preventEnter = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};
const handleSave = async () => {
  await fetch("http://localhost:8000/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  onClose();
};


  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-gray-800 z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-full flex flex-col">

          {/* HEADER */}
          <div className="px-6 py-5 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-purple-400">
              My Health Profile
            </h2>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white text-lg"
            >
              ✕
            </button>
          </div>

          {/* FORM */}
          <div className="flex-1 px-6 py-5 space-y-4 overflow-y-auto text-gray-200">
            {/* Age */}
            <div>
              <label className="block text-sm text-gray-200 mb-1">Age</label>
     <input
  name="age"
  type="number"
  value={profile.age}
  onChange={handleChange}
  onKeyDown={preventEnter}
  placeholder="Enter your age"
  className="w-full rounded-lg bg-gray-700 px-3 py-2
    focus:outline-none focus:ring-2 focus:ring-purple-500
    placeholder:text-gray-400 text-gray-200"
/>

            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm text-gray-200 mb-1">
                Weight (kg)
              </label>
              <input
                name="weight"
                type="number"
                value={profile.weight}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-700 px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  placeholder:text-gray-400 text-gray-200"
                placeholder="Enter your weight"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm text-gray-200 mb-1">
                Height (cm)
              </label>
              <input
                name="height"
                type="number"
                value={profile.height}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-700 px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  placeholder:text-gray-400 text-gray-200"
                placeholder="Enter your height"
              />
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm text-gray-200 mb-1">Goal</label>
              <select
                name="goal"
                value={profile.goal}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-700 px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  text-gray-200"
              >
                <option value="">Select goal</option>
                <option value="gain">Gain Weight</option>
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain</option>
              </select>
            </div>

            {/* Activity */}
            <div>
              <label className="block text-sm text-gray-200 mb-1">
                Activity Level
              </label>
              <select
                name="activity"
                value={profile.activity}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-700 px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  text-gray-200"
              >
                <option value="">Select level</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Dynamic Notes */}
            <div>
              <label className="block text-sm text-gray-200 mb-1">
                Notes
              </label>
           {profile.notes.map((note, index) => (
  <div key={note.id} className="flex mb-2 items-start space-x-2">
    <textarea
      rows={2}
      value={note.text}   // ✅ FIX
      onChange={(e) => handleNoteChange(index, e.target.value)}
      placeholder={`Note ${index + 1}`}
      className="flex-1 rounded-lg bg-gray-700 px-3 py-2
        text-gray-200 placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
    {profile.notes.length > 1 && (
      <button
        type="button"
        onClick={() => removeNote(index)}
        className="text-red-500 hover:text-red-400 font-bold"
      >
        ✕
      </button>
    )}
  </div>
))}

             <button
                type="button"
                onClick={addNote}
                className="mt-2 w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-white font-semibold transition"
              >
                + Add New Note
              </button>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="px-6 py-4 border-t border-gray-700 bg-gray-800">
            <button
              onClick={handleSave}
              className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 py-2.5 font-semibold text-white"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}