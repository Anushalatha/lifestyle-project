import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

/**
 * Dashboard Component
 * Main page showing overview of all modules with summary cards
 */
const Dashboard = () => {
  // Mock data for dashboard summaries
  const todayTasks = [
    { id: 1, title: 'Complete project proposal', priority: 'High', completed: false },
    { id: 2, title: 'Grocery shopping', priority: 'Medium', completed: false },
    { id: 3, title: 'Morning workout', priority: 'Low', completed: true },
  ]

  const outfitSuggestion = {
    weather: 'Sunny, 72°F',
    outfit: 'Light jacket with jeans',
    reason: 'Perfect for the mild sunny weather',
  }

  const mealSuggestion = {
    name: 'Grilled Chicken Salad',
    tags: ['High Protein', 'Low Carb'],
  }

  const habitProgress = [
    { name: 'Exercise', progress: 75, target: 7, current: 5 },
    { name: 'Meditation', progress: 57, target: 7, current: 4 },
    { name: 'Reading', progress: 100, target: 7, current: 7 },
  ]

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Here's your daily overview
          </p>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Today's Tasks Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Today's Tasks</h2>
              <span className="text-2xl">✅</span>
            </div>
            <div className="space-y-2 mb-4">
              {todayTasks.slice(0, 2).map((task) => (
                <div key={task.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="rounded"
                  />
                  <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to="/tasks"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all tasks →
            </Link>
          </div>

          {/* Outfit Suggestion Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Outfit Suggestion</h2>
              <span className="text-2xl">👔</span>
            </div>
            <div className="mb-2">
              <p className="text-sm text-gray-500 mb-1">{outfitSuggestion.weather}</p>
              <p className="text-lg font-semibold text-gray-900">{outfitSuggestion.outfit}</p>
            </div>
            <Link
              to="/outfits"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              See more →
            </Link>
          </div>

          {/* Meal Suggestion Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Meal Suggestion</h2>
              <span className="text-2xl">🍽️</span>
            </div>
            <div className="mb-2">
              <p className="text-lg font-semibold text-gray-900 mb-2">{mealSuggestion.name}</p>
              <div className="flex flex-wrap gap-2">
                {mealSuggestion.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/meals"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Plan meals →
            </Link>
          </div>

          {/* Habit Progress Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Habit Progress</h2>
              <span className="text-2xl">📈</span>
            </div>
            <div className="space-y-3">
              {habitProgress.map((habit, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{habit.name}</span>
                    <span className="text-gray-500">{habit.current}/{habit.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${habit.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/habits"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-4 block"
            >
              Track habits →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/tasks"
              className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors text-center"
            >
              <div className="text-3xl mb-2">✅</div>
              <div className="font-medium text-gray-900">Add Task</div>
            </Link>
            <Link
              to="/journal"
              className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors text-center"
            >
              <div className="text-3xl mb-2">📝</div>
              <div className="font-medium text-gray-900">Write Journal</div>
            </Link>
            <Link
              to="/chatbot"
              className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors text-center"
            >
              <div className="text-3xl mb-2">🤖</div>
              <div className="font-medium text-gray-900">Ask AI</div>
            </Link>
            <Link
              to="/community"
              className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors text-center"
            >
              <div className="text-3xl mb-2">👥</div>
              <div className="font-medium text-gray-900">Community</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard

