// src/context/FitnessProfileProvider.jsx
import { useEffect, useState } from "react";
import { FitnessProfileContext } from "./FitnessProfileContext";

const DEFAULT_PROFILE = {
  age: "",
  weight: "",
  height: "",
  goal: "",
  activity: "",
  notes: [],
};

export default function FitnessProfileProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  // Load once
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fitguru_profile"));
    if (saved) setProfile(saved);
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem("fitguru_profile", JSON.stringify(profile));
  }, [profile]);

  return (
    <FitnessProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </FitnessProfileContext.Provider>
  );
}
