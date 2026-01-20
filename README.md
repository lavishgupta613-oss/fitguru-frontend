# 🏋️ FitGuru – Frontend (React)

FitGuru Frontend is a modern React-based web application that provides an interactive UI for chatting with an AI-powered fitness coach. It includes multiple functional pages such as Home, Chat, Notes, Profile, and more.

## Live Demo
Frontend deployed on: *[Live Link](https://fitguru-frontend.onrender.com/)* 

## Features
Core Features:
- AI Chat (Fitness Coach)
- Personalized fitness suggestions
- Notes section to save fitness logs
- Calm breathing and relaxation exercises
- Eye relaxation exercises
- Clearhead / mindfulness page
- Profile management panel

UI Features:
- Responsive and clean design
- Session-based chat
- Easy navigation between pages

## Pages (in src/pages)
Your project contains multiple pages:
- Home.jsx : Landing and dashboard
- Chat.jsx : Main chat interface with AI coach
- ChatPanel.jsx : Chat sidebar or chat controls
- Notes.jsx : Notes and fitness logs
- NotesPanel.jsx : Notes sidebar or notes controls
- ProfilePanel.jsx : Profile details & update panel
- calm-breath.jsx : Breathing exercise page
- RelaxEye.jsx : Eye relaxation exercises
- Clearhead.jsx : Mindfulness / mental wellness
- info.jsx : About / app information page

## Tech Stack
- React
- JavaScript (ES6+)
- CSS / Tailwind
- React Router
- Fetch / Axios
- FastAPI (backend)
- Render (deployment)

## Backend Integration
The frontend communicates with the backend using REST APIs.

Create New Chat Session:
GET /new-chat

Send Message:
POST /chat

Request Body:
{
  "session_id": "uuid",
  "message": "Give me a workout plan"
}

Response:
{
  "reply": "Try a 20-minute full body workout today 💪"
}

## Environment Setup
Create a .env file in the root directory:

REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com

## Local Development
1. Clone the repository
git clone https://github.com/lavishgupta613-oss/fitguru-frontend.git
cd fitguru-frontend

2. Install dependencies
npm install

3. Run the app
npm start

The app will run at:
http://localhost:5173




## Screenshots (Optional)
You may add:
- Home page
- Chat page
- Notes page
- Breathing exercises page

