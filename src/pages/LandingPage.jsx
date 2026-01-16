import { Link } from 'react-router-dom'

/**
 * Landing Page Component
 * First page users see with app overview and call-to-action
 */
const LandingPage = () => {
  const features = [
    {
      icon: '✅',
      title: 'Smart Task Scheduler',
      description: 'AI-powered task management with priority levels and smart suggestions',
    },
    {
      icon: '👔',
      title: 'Outfit Recommendations',
      description: 'Get personalized outfit suggestions based on weather and occasion',
    },
    {
      icon: '🍽️',
      title: 'Meal Planner',
      description: 'Plan your meals and groceries with nutrition tracking',
    },
    {
      icon: '📈',
      title: 'Habit Tracker',
      description: 'Build and track your daily habits with progress visualization',
    },
    {
      icon: '📝',
      title: 'Journal',
      description: 'Record your thoughts and experiences with voice journal support',
    },
    {
      icon: '🤖',
      title: 'AI Chatbot',
      description: 'Get instant help and recommendations from your AI assistant',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            LifestyleAI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6 md:mb-8">
            Your All-in-One Lifestyle Management Assistant
          </p>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-8 md:mb-12 px-4">
            Streamline your daily life with AI-powered task scheduling, outfit recommendations,
            meal planning, habit tracking, and more. Everything you need in one place.
          </p>
          <Link
            to="/login"
            className="inline-block bg-primary-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage

