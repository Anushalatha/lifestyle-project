import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Header Component
 * Displays user info and logout button at the top of the page
 */
const Header = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 mb-6">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left side - can be used for page title or branding */}
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900 hidden md:block">
            LifestyleAI
          </h2>
        </div>

        {/* Right side - User info and logout */}
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <button
                onClick={() => navigate('/profile')}
                className="hidden md:flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-200 transition-colors">
                  <span className="text-primary-700 font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </button>
              
              {/* Mobile user display */}
              <button
                onClick={() => navigate('/profile')}
                className="md:hidden flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-200 transition-colors">
                  <span className="text-primary-700 font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
              >
                <span>🚪</span>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

