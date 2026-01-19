import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Note from "./pages/Notes";
import CalmBreath from "./pages/calm-breath";
import RelaxEyesDot from "./pages/RelaxEye";
import ClearHead from "./pages/Clearhead";
import SeatedPostureReset from "./pages/posture";

function App() {
  // ✅ SINGLE SOURCE OF TRUTH
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "",
    activity: "",
    notes: [],
  });

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/chat"
          element={<Chat profile={profile} setProfile={setProfile} />}
        />

        <Route
          path="/notes"
          element={<Note profile={profile} setProfile={setProfile} />}
        />

        <Route path="/calm-breath" element={<CalmBreath />} />
        <Route path="/relax-eyes" element={<RelaxEyesDot />} />
        <Route path="/posture-reset" element={<SeatedPostureReset />} />
        <Route path="/clear-head" element={<ClearHead />} />
      </Routes>
    </Router>
  );
}

export default App;
