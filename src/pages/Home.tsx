import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        {/* Experiment Information Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-amber-800 font-semibold text-lg">Experimental Version</span>
          </div>
          <p className="text-amber-700 text-sm">
            This is a working prototype and experimental version of Hexagon Labs. Features are being actively developed and may change. 
            Your feedback helps us improve the platform!
          </p>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-indigo-600">Hexagon Labs</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The ultimate creator platform for content creators, influencers, and digital entrepreneurs. 
          Discover campaigns, create amazing content, and grow your earnings with AI-powered tools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Brands</h2>
            <p className="text-gray-600 mb-6">
              Discover creators, manage campaigns, and track performance with AI-powered matching and analytics.
            </p>
            <Link
              to="/brands"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Brand Dashboard
            </Link>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Creators</h2>
            <p className="text-gray-600 mb-6">
              Find opportunities, track earnings, and grow your brand with our creator tools and marketplace.
            </p>
            <Link
              to="/creators"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 inline-block"
            >
              Creator Dashboard
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/creator-dashboard"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
          >
            Creator Dashboard
          </Link>
          <Link
            to="/creator-marketplace"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            Browse Campaigns
          </Link>
          <Link
            to="/content-creation"
            className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors duration-200"
          >
            Content Studio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
