# FitGuru – Frontend (React + Vite)

FitGuru Frontend is a modern React application built with Vite. It provides an interactive UI for chatting with an AI-powered fitness coach and includes multiple functional pages such as Home, Chat, Notes, Profile, and more.

## Table of Contents
- Features
- Tech Stack
- Project Structure
- Installation
- Usage
- API
- Environment Variables
- Screenshots
- Contributing
- License
- Author

## Features
- AI Chat (Fitness Coach)
- Personalized fitness suggestions
- Notes section to save fitness logs
- Calm breathing and relaxation exercises
- Eye relaxation exercises
- Clearhead / mindfulness page
- Profile management panel
- Responsive and clean UI
- Session-based chat

## Tech Stack
- React
- Vite
- JavaScript (ES6+)
- CSS / Tailwind
- React Router
- Fetch / Axios

fitguru-frontend/

├── public/   
│ └── index.html    
├── src/    
│ ├── assets/     
│ ├── components/     
│ ├── pages/     
│ ├── utils/     
│ ├── App.jsx    
│ └── main.jsx    
├── .gitignore     
├── package.json    
├── package-lock.json    
├── vite.config.js     
└── README.md    

## Deployment
Frontend is deployed on Render: [Live Link](https://fitguru-frontend.onrender.com/)

## Installation
1. Clone the repository
git clone https://github.com/lavishgupta613-oss/fitguru-frontend.git
cd fitguru-frontend

2. Install dependencies
npm install

## Usage
Run the app locally:
npm run dev

Open in browser:
http://localhost:5173

## API
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


REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com

## Screenshots
(Optional but recommended — add screenshots of Home, Chat, Notes, etc.)

