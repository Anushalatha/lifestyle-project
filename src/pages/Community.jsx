import { useState } from 'react'
import Layout from '../components/Layout'

/**
 * Community & Challenges Component
 * Display challenges and community posts
 */
const Community = () => {
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: '30-Day Fitness Challenge',
      description: 'Complete 30 minutes of exercise every day for 30 days',
      participants: 1247,
      duration: '30 days',
      difficulty: 'Medium',
      joined: false,
    },
    {
      id: 2,
      title: 'Mindful Morning Routine',
      description: 'Start each day with 10 minutes of meditation',
      participants: 892,
      duration: '21 days',
      difficulty: 'Easy',
      joined: true,
    },
    {
      id: 3,
      title: 'Healthy Meal Prep Week',
      description: 'Plan and prep all meals for the week',
      participants: 563,
      duration: '7 days',
      difficulty: 'Medium',
      joined: false,
    },
  ])

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah M.',
      avatar: '👩',
      content: 'Just completed my 7-day meditation streak! Feeling so much more centered and focused. The habit tracker really helped me stay consistent.',
      likes: 24,
      comments: 5,
      time: '2 hours ago',
      liked: false,
    },
    {
      id: 2,
      author: 'Mike T.',
      avatar: '👨',
      content: 'The meal planner suggested an amazing recipe today - Grilled Chicken Salad. It was delicious and so easy to make!',
      likes: 18,
      comments: 3,
      time: '5 hours ago',
      liked: true,
    },
    {
      id: 3,
      author: 'Emma L.',
      avatar: '👩',
      content: 'Love the outfit recommendations feature! It saved me so much time this morning. The weather-based suggestions are spot on.',
      likes: 31,
      comments: 8,
      time: '1 day ago',
      liked: false,
    },
  ])

  const joinChallenge = (id) => {
    setChallenges(challenges.map(challenge =>
      challenge.id === id ? { ...challenge, joined: true, participants: challenge.participants + 1 } : challenge
    ))
  }

  const leaveChallenge = (id) => {
    setChallenges(challenges.map(challenge =>
      challenge.id === id ? { ...challenge, joined: false, participants: challenge.participants - 1 } : challenge
    ))
  }

  const toggleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'Hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">Join challenges and connect with others</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Challenges Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Active Challenges</h2>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👥 {challenge.participants}</span>
                      <span>⏱️ {challenge.duration}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  {challenge.joined ? (
                    <button
                      onClick={() => leaveChallenge(challenge.id)}
                      className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Leave Challenge
                    </button>
                  ) : (
                    <button
                      onClick={() => joinChallenge(challenge.id)}
                      className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Join Challenge
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Community Posts */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Community Posts</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                >
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="text-3xl">{post.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                        <span className="text-sm text-gray-500">• {post.time}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center space-x-2 ${
                        post.liked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                      } transition-colors`}
                    >
                      <span>{post.liked ? '❤️' : '🤍'}</span>
                      <span className="font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-600 transition-colors">
                      <span>💬</span>
                      <span className="font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-600 transition-colors">
                      <span>📤</span>
                      <span className="font-medium">Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Community

