import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Login Page Component
 * Handles user authentication with mock credentials
 */
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showCredentials, setShowCredentials] = useState(false)
  const { login, mockUsers } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const result = login(username, password)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
  }

  const fillDemoCredentials = () => {
    setUsername('demo')
    setPassword('demo123')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            LifestyleAI
          </h1>
          <p className="text-gray-600">
            Your All-in-One Lifestyle Management Assistant
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign In
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="mt-4">
            <button
              onClick={fillDemoCredentials}
              className="w-full bg-primary-50 text-primary-700 px-6 py-2 rounded-lg font-medium hover:bg-primary-100 transition-colors text-sm"
            >
              Use Demo Credentials
            </button>
          </div>

          {/* Mock Credentials Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="w-full text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              {showCredentials ? 'Hide' : 'Show'} Mock Credentials
            </button>

            {showCredentials && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 mb-3">
                  Mock Login Credentials (for demo):
                </p>
                <div className="space-y-2">
                  {mockUsers.map((user, idx) => (
                    <div key={idx} className="text-xs text-gray-600">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div>Username: <span className="font-mono">{user.username}</span></div>
                      <div>Password: <span className="font-mono">{user.password}</span></div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3 italic">
                  Note: This is a demo application with mock authentication.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <span className="text-primary-600 font-medium">
            Sign up is not required for this demo
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login

