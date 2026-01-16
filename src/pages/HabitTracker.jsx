import { useState } from 'react'
import Layout from '../components/Layout'

/**
 * Habit & Productivity Tracker Component
 * Track daily habits with progress visualization
 */
const HabitTracker = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: 'Exercise',
      description: '30 minutes of physical activity',
      target: 7,
      currentWeek: [true, true, true, true, true, false, false],
      streak: 5,
    },
    {
      id: 2,
      name: 'Meditation',
      description: '10 minutes of mindfulness',
      target: 7,
      currentWeek: [true, true, true, true, false, false, false],
      streak: 4,
    },
    {
      id: 3,
      name: 'Reading',
      description: 'Read for 30 minutes',
      target: 7,
      currentWeek: [true, true, true, true, true, true, true],
      streak: 7,
    },
    {
      id: 4,
      name: 'Water Intake',
      description: 'Drink 8 glasses of water',
      target: 7,
      currentWeek: [true, true, false, true, true, false, false],
      streak: 2,
    },
  ])

  const [newHabit, setNewHabit] = useState({ name: '', description: '', target: 7 })
  const [showForm, setShowForm] = useState(false)

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const toggleHabitDay = (habitId, dayIndex) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newWeek = [...habit.currentWeek]
        newWeek[dayIndex] = !newWeek[dayIndex]
        const newStreak = calculateStreak(newWeek)
        return { ...habit, currentWeek: newWeek, streak: newStreak }
      }
      return habit
    }))
  }

  const calculateStreak = (week) => {
    let streak = 0
    for (let i = week.length - 1; i >= 0; i--) {
      if (week[i]) streak++
      else break
    }
    return streak
  }

  const getProgress = (habit) => {
    const completed = habit.currentWeek.filter(Boolean).length
    return Math.round((completed / habit.target) * 100)
  }

  const addHabit = () => {
    if (newHabit.name.trim()) {
      const habit = {
        id: Date.now(),
        name: newHabit.name,
        description: newHabit.description,
        target: newHabit.target,
        currentWeek: [false, false, false, false, false, false, false],
        streak: 0,
      }
      setHabits([...habits, habit])
      setNewHabit({ name: '', description: '', target: 7 })
      setShowForm(false)
    }
  }

  const removeHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  const getWeeklySummary = () => {
    const totalHabits = habits.length
    const totalDays = habits.reduce((sum, habit) => sum + habit.currentWeek.filter(Boolean).length, 0)
    const maxDays = totalHabits * 7
    return Math.round((totalDays / maxDays) * 100)
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Habit Tracker</h1>
          <p className="text-gray-600">Build and track your daily habits</p>
        </div>

        {/* Weekly Summary */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Weekly Productivity</h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{getWeeklySummary()}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-4">
              <div
                className="bg-white h-4 rounded-full transition-all"
                style={{ width: `${getWeeklySummary()}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">{habits.length}</div>
              <div className="text-sm opacity-90">Active Habits</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {habits.reduce((sum, habit) => sum + habit.currentWeek.filter(Boolean).length, 0)}
              </div>
              <div className="text-sm opacity-90">Completed Days</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {Math.max(...habits.map(h => h.streak), 0)}
              </div>
              <div className="text-sm opacity-90">Best Streak</div>
            </div>
          </div>
        </div>

        {/* Add Habit Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            + Add New Habit
          </button>
        )}

        {/* Add Habit Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">New Habit</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Habit Name
                </label>
                <input
                  type="text"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Exercise"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 30 minutes of physical activity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target (days per week)
                </label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={newHabit.target}
                  onChange={(e) => setNewHabit({ ...newHabit, target: parseInt(e.target.value) || 7 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={addHabit}
                  className="flex-1 bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Add Habit
                </button>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setNewHabit({ name: '', description: '', target: 7 })
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Habits List */}
        <div className="space-y-6">
          {habits.map((habit) => {
            const progress = getProgress(habit)
            return (
              <div key={habit.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{habit.name}</h3>
                    <p className="text-gray-600 text-sm">{habit.description}</p>
                  </div>
                  <button
                    onClick={() => removeHabit(habit.id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700">Progress: {habit.currentWeek.filter(Boolean).length}/{habit.target} days</span>
                    <span className="text-gray-700">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary-600 h-3 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Streak */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Current Streak:</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      🔥 {habit.streak} days
                    </span>
                  </div>
                </div>

                {/* Weekly Checkboxes */}
                <div className="flex items-center justify-between">
                  {daysOfWeek.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-2">{day}</span>
                      <button
                        onClick={() => toggleHabitDay(habit.id, index)}
                        className={`w-10 h-10 rounded-lg border-2 transition-colors ${
                          habit.currentWeek[index]
                            ? 'bg-primary-600 border-primary-600 text-white'
                            : 'bg-white border-gray-300 text-gray-400 hover:border-primary-400'
                        }`}
                      >
                        {habit.currentWeek[index] ? '✓' : ''}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {habits.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
            <p className="text-gray-500">No habits yet. Add your first habit to get started!</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default HabitTracker

