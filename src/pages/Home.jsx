
import { Link, useNavigate } from "react-router-dom";  // add useNavigate


export default function Home() {
  const navigate = useNavigate();
   async function createNewChat() {
    const res = await fetch("https://fitguru-backend.onrender.com//new-chat");
    const data = await res.json();

    // Redirect to /chat/<session_id>
    navigate(`/chat/${data.session_id}`);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400 text-white flex flex-col items-center justify-between py-10 px-5 relative overflow-hidden">

      {/* Floating background circles */}
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full opacity-30 blur-3xl animate-pulse -top-10 -left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-30 blur-3xl animate-pulse bottom-0 right-0"></div>

      {/* Hero Section */}
      <div className="text-center mt-10 z-10">
        <h1 className="text-6xl sm:text-7xl font-extrabold drop-shadow-lg mb-4">
          Welcome to <span className="text-yellow-300">FitGuru</span>
        </h1>
        <p className="text-lg sm:text-xl text-blue-50 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your AI-powered fitness companion! Chat, plan workouts, and stay on track with your health goals 🚀
        </p>
       <div className="relative group">
  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></span>

  <button
    onClick={createNewChat}   // 👈 add this
    className="relative z-10 px-10 py-4 font-bold text-white text-lg rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] transition-all duration-300 transform hover:scale-110 active:scale-95 hover:-translate-y-1"
  >
    Start Chatting 💬
  </button>
</div>


      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 z-10">
        {[
          { title: "AI Fitness Coach", emoji: "🤖", desc: "Get instant advice tailored to your fitness level and goals." },
          { title: "Workout Tracker", emoji: "🏃‍♂️", desc: "Log and visualize your daily workouts and progress easily." },
          { title: "Nutrition Planner", emoji: "🥗", desc: "Receive personalized diet recommendations and meal plans." },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 border border-white/30 hover:bg-white/30"
          >
            <div className="text-5xl mb-3">{feature.emoji}</div>
            <h2 className="text-2xl font-bold mb-2 text-yellow-200">{feature.title}</h2>
            <p className="text-blue-50">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Quote Section */}
      <div className="text-center mt-16 z-10">
        <p className="text-2xl italic font-semibold text-white/90">
          “Discipline beats motivation. Start your journey today!” 💫
        </p>
      </div>

      {/* Footer */}
      <footer className="text-sm text-white/70 mt-16 mb-4 z-10">
        Made with ❤️ by the FitGuru Team
      </footer>
    </div>
  );
}
