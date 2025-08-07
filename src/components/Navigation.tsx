import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Hexagon Labs
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {/* General Links */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Home
            </Link>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300"></div>

            {/* Brand Section */}
            <div className="flex items-center space-x-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">
                Brands
              </span>
              <Link
                to="/brands"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/brands') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Brand Dashboard
              </Link>
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300"></div>

            {/* Creator Section */}
            <div className="flex items-center space-x-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">
                Creators
              </span>
              <Link
                to="/creators"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/creators') 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                Creator Dashboard
              </Link>
              <Link
                to="/creator-marketplace"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/creator-marketplace') 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                Marketplace
              </Link>
              <Link
                to="/content-creation"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/content-creation') 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                Content Studio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
