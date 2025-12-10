import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Notes from "./pages/Notes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:sessionId" element={<Chat />} />
        <Route path="/notes" element={<Notes/>} />
      </Routes>
    </Router>
  );
}

export default App;
