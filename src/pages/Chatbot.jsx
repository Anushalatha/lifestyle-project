import { useState, useRef, useEffect } from 'react'
import Layout from '../components/Layout'

/**
 * AI Chatbot Component
 * Interactive chatbot with keyword-based responses
 */
const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI lifestyle assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Keyword-based response logic
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    // Task-related keywords
    if (lowerMessage.includes('task') || lowerMessage.includes('todo') || lowerMessage.includes('schedule')) {
      return "I can help you manage your tasks! You can add tasks with priorities and due dates. Would you like me to suggest breaking down a large task into smaller ones?"
    }

    // Meal-related keywords
    if (lowerMessage.includes('meal') || lowerMessage.includes('food') || lowerMessage.includes('recipe') || lowerMessage.includes('cook')) {
      return "I'd be happy to help with meal planning! Based on your grocery list, I can suggest healthy recipes. What type of meal are you looking for - breakfast, lunch, or dinner?"
    }

    // Outfit-related keywords
    if (lowerMessage.includes('outfit') || lowerMessage.includes('wear') || lowerMessage.includes('clothes') || lowerMessage.includes('dress')) {
      return "I can help you choose an outfit! Based on today's weather (sunny, 72°F), I'd recommend a light jacket with jeans for casual occasions, or a blazer with chinos for business settings."
    }

    // Habit-related keywords
    if (lowerMessage.includes('habit') || lowerMessage.includes('track') || lowerMessage.includes('routine')) {
      return "Great question about habits! Consistency is key. I suggest starting with one habit at a time and tracking it daily. Your current best streak is 7 days - keep it up! 🔥"
    }

    // Journal-related keywords
    if (lowerMessage.includes('journal') || lowerMessage.includes('write') || lowerMessage.includes('reflect')) {
      return "Journaling is a wonderful practice! You can write text entries or use voice journaling. Try reflecting on three things you're grateful for today."
    }

    // Greeting keywords
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to help you manage your lifestyle. What would you like to know about?"
    }

    // Help keywords
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return "I can help you with:\n• Task scheduling and prioritization\n• Meal planning and recipes\n• Outfit recommendations\n• Habit tracking tips\n• Journaling guidance\n\nWhat would you like help with?"
    }

    // Weather keywords
    if (lowerMessage.includes('weather') || lowerMessage.includes('temperature')) {
      return "Today's weather is sunny with a temperature of 72°F. Perfect weather for outdoor activities! I've updated your outfit recommendations accordingly."
    }

    // Motivation/encouragement keywords
    if (lowerMessage.includes('motivate') || lowerMessage.includes('encourage') || lowerMessage.includes('tired')) {
      return "You're doing great! Remember, progress is progress, no matter how small. Take it one step at a time. You've got this! 💪"
    }

    // Default responses
    const defaultResponses = [
      "That's interesting! Can you tell me more about that?",
      "I understand. How can I help you with that?",
      "Let me help you with that. What specific aspect would you like to explore?",
      "Great question! Based on your lifestyle data, I'd suggest checking out the relevant section in the app for more details.",
    ]
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = {
        id: Date.now(),
        text: input,
        sender: 'user',
        timestamp: new Date(),
      }

      setMessages([...messages, userMessage])
      setInput('')

      // Simulate bot thinking delay
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: getBotResponse(input),
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, botResponse])
      }, 500)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Chatbot</h1>
          <p className="text-gray-600">Get instant help and recommendations from your AI assistant</p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col" style={{ height: '600px' }}>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Try: 'help with tasks', 'meal suggestions', 'outfit advice')"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows="2"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              💡 Try asking about: tasks, meals, outfits, habits, or journaling
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Chatbot

