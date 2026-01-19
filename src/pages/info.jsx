import { useState } from "react";
import Note from "./Notes";
import ProfilePanel from "./components/ProfilePanel";

export default function App() {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "",
    activity: "",
    notes: [""],
  });
  return (
    <>
      <Note profile={profile} setProfile={setProfile} />
      <ProfilePanel profile={profile} setProfile={setProfile} />
    </>
  );
}