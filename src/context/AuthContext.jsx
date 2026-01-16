import { createContext, useContext, useState, useEffect } from 'react'

/**
 * Authentication Context
 * Manages user authentication state (mock implementation)
 */
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Mock user credentials
  const mockUsers = [
    { username: 'demo', password: 'demo123', name: 'Demo User', email: 'demo@lifestyleai.com' },
    { username: 'admin', password: 'admin123', name: 'Admin User', email: 'admin@lifestyleai.com' },
    { username: 'user', password: 'user123', name: 'Test User', email: 'user@lifestyleai.com' },
  ]

  const login = (username, password) => {
    // Find user in mock credentials
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    )

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        name: foundUser.name,
        email: foundUser.email,
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } else {
      return { success: false, error: 'Invalid username or password' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    logout,
    loading,
    mockUsers, // Expose for display on login page
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

