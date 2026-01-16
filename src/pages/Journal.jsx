import { useState } from 'react'
import Layout from '../components/Layout'

/**
 * Journal Component
 * Text-based journal entries with voice journal simulation
 */
const Journal = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: 'Great Day at Work',
      content: 'Today was productive! I completed the project proposal and had a great meeting with the team. Feeling motivated for the week ahead.',
      date: '2024-01-13',
      time: '18:30',
      type: 'text',
    },
    {
      id: 2,
      title: 'Morning Reflection',
      content: 'Started the day with meditation and a healthy breakfast. The weather is beautiful today, perfect for a walk later.',
      date: '2024-01-12',
      time: '09:15',
      type: 'text',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [formData, setFormData] = useState({ title: '', content: '' })

  const addEntry = () => {
    if (formData.title.trim() || formData.content.trim()) {
      const now = new Date()
      const entry = {
        id: Date.now(),
        title: formData.title || 'Untitled Entry',
        content: formData.content,
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().slice(0, 5),
        type: isVoiceMode ? 'voice' : 'text',
      }
      setEntries([entry, ...entries])
      setFormData({ title: '', content: '' })
      setShowForm(false)
      setIsVoiceMode(false)
    }
  }

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const simulateVoiceInput = () => {
    setIsVoiceMode(true)
    // Simulate voice-to-text with a sample transcription
    const sampleTranscription = "This is a simulated voice journal entry. In a real application, this would be transcribed from your voice recording."
    setFormData({ ...formData, content: sampleTranscription })
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Journal</h1>
          <p className="text-gray-600">Record your thoughts and experiences</p>
        </div>

        {/* Add Entry Button */}
        {!showForm && (
          <div className="flex space-x-3 mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              + New Entry
            </button>
            <button
              onClick={simulateVoiceInput}
              className="bg-primary-100 text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-200 transition-colors flex items-center space-x-2"
            >
              <span>🎤</span>
              <span>Voice Journal</span>
            </button>
          </div>
        )}

        {/* Entry Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {isVoiceMode ? 'Voice Journal Entry' : 'New Journal Entry'}
              </h2>
              {isVoiceMode && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium flex items-center space-x-1">
                  <span>🔴</span>
                  <span>Recording...</span>
                </span>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (optional)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Give your entry a title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isVoiceMode ? 'Transcription' : 'Content'}
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="8"
                  placeholder={isVoiceMode ? 'Voice transcription will appear here...' : 'Write your thoughts here...'}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={addEntry}
                  className="flex-1 bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Save Entry
                </button>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setIsVoiceMode(false)
                    setFormData({ title: '', content: '' })
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Journal Entries */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{entry.title}</h3>
                    {entry.type === 'voice' && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        🎤 Voice
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} at {entry.time}
                  </div>
                </div>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
            <p className="text-gray-500 mb-4">No journal entries yet. Start writing to capture your thoughts!</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Journal

