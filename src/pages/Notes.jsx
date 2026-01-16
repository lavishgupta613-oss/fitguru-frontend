import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

export default function ProfilePanel() {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "",
    activity: "",
    notes: [],
  });

  const [newNote, setNewNote] = useState("");

  /* ---------- LOAD FROM LOCAL STORAGE ---------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fitguru_profile"));
    if (saved) setProfile(saved);
  }, []);

  /* ---------- SAVE TO LOCAL STORAGE ---------- */
  useEffect(() => {
    localStorage.setItem("fitguru_profile", JSON.stringify(profile));
  }, [profile]);

  /* ---------- INPUT HANDLER (ALL FIELDS) ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- ADD NOTE ---------- */
  const addNote = () => {
    if (!newNote.trim()) return;

    setProfile((prev) => ({
      ...prev,
      notes: [{ id: Date.now(), text: newNote }, ...prev.notes],
    }));

    setNewNote("");
  };

  /* ---------- DELETE NOTE ---------- */
  const deleteNote = (id) => {
    setProfile((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== id),
    }));
  };

  return (
    <div className="h-[calc(100vh-66px)] w-full overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* HEADER */}
      <div className="px-8 py-6 border-b border-white/10">
        <h2 className="text-3xl font-bold">Profile</h2>
        <p className="text-sm text-gray-400 mt-1">
          Manage your body details & personal notes
        </p>
      </div>

      {/* CONTENT */}
      <div className="px-8 py-6 flex flex-col gap-8">


        {/* BASIC INFO */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Body Details</h3>
          <div className="grid grid-cols-3 gap-4">
            {["age", "weight", "height"].map((field) => (
              <input
                key={field}
                type="number"
                name={field}
                value={profile[field]}
                onChange={handleChange}
                placeholder={field.toUpperCase()}
                className="rounded-xl p-4 bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>
        </section>

        {/* GOAL & ACTIVITY */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Fitness Preferences</h3>
          <div className="grid grid-cols-2 gap-4">
            <select
              name="goal"
              value={profile.goal}
              onChange={handleChange}
              className="rounded-xl p-4 bg-gray-800 border border-gray-700"
            >
              <option value="">Goal</option>
              <option value="gain">Gain</option>
              <option value="lose">Lose</option>
              <option value="maintain">Maintain</option>
            </select>

            <select
              name="activity"
              value={profile.activity}
              onChange={handleChange}
              className="rounded-xl p-4 bg-gray-800 border border-gray-700"
            >
              <option value="">Activity Level</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
        </section>

        {/* NOTES – FULL HEIGHT */}
        <section className="flex-1 flex flex-col min-h-0">
          <h3 className="text-lg font-semibold mb-3">Personal Notes</h3>

          {/* ADD NOTE */}
          <div className="flex gap-3 mb-4">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write anything about your fitness, mood, diet..."
              className="flex-1 resize-none rounded-xl p-4 bg-gray-800 border border-gray-700"
            />
            <button
              onClick={addNote}
              className="px-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>

          {/* NOTES LIST */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {profile.notes.length === 0 && (
              <p className="text-gray-500 text-sm">
                No notes yet. Start tracking your journey ✨
              </p>
            )}

            {profile.notes.map((note) => (
              <div
                key={note.id}
                className="flex justify-between items-start p-4 rounded-xl bg-gray-800 border border-gray-700"
              >
                <p className="text-sm leading-relaxed">{note.text}</p>
                <button onClick={() => deleteNote(note.id)}>
                  <Trash size={16} className="text-gray-400 hover:text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
