# Lifestyle Management App

An AI-Powered All-in-One Lifestyle Management MVP web application built with React.js and Tailwind CSS.

## Features

- **Authentication**: Login page with mock credentials
- **Smart Task Scheduler**: Add, edit, delete tasks with priority levels and due dates
- **AI Outfit Recommendations**: Get personalized outfit suggestions based on weather and occasion
- **Meal Planner**: Manage grocery lists and get meal suggestions with nutrition tags
- **Habit Tracker**: Track daily habits with progress visualization and streak tracking
- **Journal**: Text-based journal entries with voice journal simulation
- **Community**: Join challenges and view community posts
- **AI Chatbot**: Interactive chatbot with keyword-based responses for lifestyle assistance

## Tech Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **State Management**: React Hooks (useState)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

4. You'll be redirected to the login page. Use the mock credentials below to sign in.

### Mock Login Credentials

The following credentials are available for testing:

| Username | Password | Name |
|----------|----------|------|
| `demo` | `demo123` | Demo User |
| `admin` | `admin123` | Admin User |
| `user` | `user123` | Test User |

**Note**: You can also click "Use Demo Credentials" button on the login page to auto-fill the demo account, or click "Show Mock Credentials" to see all available accounts.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
lifestyle project/
├── src/
│   ├── components/
│   │   ├── Layout.jsx         # Main layout with sidebar
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   └── ProtectedRoute.jsx # Route protection component
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication context
│   ├── pages/
│   │   ├── LandingPage.jsx    # Landing page
│   │   ├── Login.jsx          # Login page
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── TaskScheduler.jsx  # Task management
│   │   ├── OutfitRecommendations.jsx
│   │   ├── MealPlanner.jsx
│   │   ├── HabitTracker.jsx
│   │   ├── Journal.jsx
│   │   ├── Community.jsx
│   │   └── Chatbot.jsx
│   ├── App.jsx                # Main app component with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Features Overview

### Authentication
- Login page with mock authentication
- Protected routes (redirect to login if not authenticated)
- User session persistence (stored in localStorage)
- Logout functionality in sidebar
- Multiple mock user accounts for testing

### Dashboard
- Unified overview of all modules
- Summary cards for tasks, outfits, meals, and habits
- Quick action buttons

### Task Scheduler
- CRUD operations for tasks
- Priority levels (Low, Medium, High)
- Due date tracking
- AI-powered suggestions

### Outfit Recommendations
- Mock weather display
- Occasion-based outfit suggestions
- Virtual wardrobe list

### Meal Planner
- Grocery list management
- Meal suggestions based on available ingredients
- Nutrition tags

### Habit Tracker
- Daily habit checkboxes
- Progress bars and streak tracking
- Weekly productivity summary

### Journal
- Text-based entries
- Voice journal simulation
- Entry history

### Community
- Challenge listings
- Join/leave challenges
- Community posts with likes

### AI Chatbot
- Keyword-based responses
- Context-aware suggestions
- Chat interface

## Notes

- This is an MVP prototype with mock data only
- No backend or database integration
- Authentication is mock-based (no real security)
- All data is stored in React state (lost on refresh)
- User session persists in localStorage
- Suitable for demo/review purposes

## License

This project is created for educational/demo purposes.

