import { useState } from 'react'

function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('marketplace')

  const tabs = [
    { id: 'marketplace', name: 'Creator Marketplace', icon: '🏪' },
    { id: 'content', name: 'Content Creation', icon: '🎬' },
    { id: 'earnings', name: 'Earnings & Commission', icon: '💰' },
    { id: 'profile', name: 'Profile & Analytics', icon: '📊' },
    { id: 'rewards', name: 'Gamified Rewards', icon: '🏆' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Creator Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your creator journey and maximize your earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">$2,847</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold text-purple-600">45.2K</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reward Points</p>
                <p className="text-2xl font-bold text-orange-600">1,247</p>
              </div>
              <div className="text-3xl">🏆</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'marketplace' && <CreatorMarketplace />}
            {activeTab === 'content' && <ContentCreation />}
            {activeTab === 'earnings' && <EarningsCommission />}
            {activeTab === 'profile' && <ProfileAnalytics />}
            {activeTab === 'rewards' && <GamifiedRewards />}
          </div>
        </div>
      </div>
    </div>
  )
}

// Creator Marketplace Component
function CreatorMarketplace() {
  const campaigns = [
    {
      id: 1,
      brand: 'TechFlow',
      title: 'Smartphone Review Campaign',
      reward: '$500',
      status: 'active',
      deadline: '2024-02-15',
      applications: 24
    },
    {
      id: 2,
      brand: 'FashionForward',
      title: 'Summer Collection Launch',
      reward: '$300',
      status: 'pending',
      deadline: '2024-02-20',
      applications: 18
    },
    {
      id: 3,
      brand: 'FitnessPro',
      title: 'Workout Equipment Demo',
      reward: '$750',
      status: 'active',
      deadline: '2024-02-10',
      applications: 31
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Available Campaigns</h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          View All Campaigns
        </button>
      </div>
      
      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-900">{campaign.title}</h4>
                <p className="text-sm text-gray-600">by {campaign.brand}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-green-600 font-medium">{campaign.reward}</span>
                  <span className="text-sm text-gray-500">{campaign.applications} applications</span>
                  <span className="text-sm text-gray-500">Deadline: {campaign.deadline}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {campaign.status}
                </span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Content Creation Component
function ContentCreation() {
  const tools = [
    { name: 'AI Script Generator', icon: '🤖', status: 'active', description: 'Generate engaging scripts with AI' },
    { name: 'AI Video Editor', icon: '🎬', status: 'active', description: 'Create professional videos automatically' },
    { name: 'Voiceover Tool', icon: '🎤', status: 'coming-soon', description: 'AI-powered voice synthesis' },
    { name: 'Content Templates', icon: '📋', status: 'active', description: 'Pre-designed templates for quick content' },
    { name: 'Content Scheduler', icon: '📅', status: 'active', description: 'Schedule posts across platforms' }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Content Creation Tools</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div key={tool.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{tool.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{tool.name}</h4>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                tool.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {tool.status === 'coming-soon' ? 'Coming Soon' : 'Active'}
              </span>
            </div>
            {tool.status === 'active' && (
              <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors">
                Use Tool
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Earnings & Commission Component
function EarningsCommission() {
  const earnings = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 2100 },
    { month: 'Apr', amount: 2847 }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Earnings & Commission</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Monthly Earnings</h4>
          <div className="space-y-2">
            {earnings.map((earning) => (
              <div key={earning.month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{earning.month}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(earning.amount / 3000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">${earning.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Links */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Affiliate Links</h4>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">TechFlow Smartphone</p>
                  <p className="text-sm text-gray-600">Clicks: 1,247 | Conversions: 23</p>
                </div>
                <span className="text-green-600 font-medium">$156</span>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">FashionForward Collection</p>
                  <p className="text-sm text-gray-600">Clicks: 892 | Conversions: 15</p>
                </div>
                <span className="text-green-600 font-medium">$89</span>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Withdraw via Smart Contract
          </button>
        </div>
      </div>
    </div>
  )
}

// Profile & Analytics Component
function ProfileAnalytics() {
  const platforms = [
    { name: 'TikTok', followers: '23.5K', engagement: '4.2%', posts: 156 },
    { name: 'Instagram', followers: '18.7K', engagement: '3.8%', posts: 89 },
    { name: 'YouTube', followers: '3.0K', engagement: '6.1%', posts: 23 }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Profile & Analytics</h3>
      
      {/* Platform Integration */}
      <div className="grid md:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="border border-gray-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-gray-900 mb-2">{platform.name}</h4>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-indigo-600">{platform.followers}</p>
              <p className="text-sm text-gray-600">followers</p>
              <p className="text-sm text-gray-600">Engagement: {platform.engagement}</p>
              <p className="text-sm text-gray-600">{platform.posts} posts</p>
            </div>
            <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded text-sm hover:bg-indigo-700 transition-colors">
              Sync {platform.name}
            </button>
          </div>
        ))}
      </div>

      {/* Analytics Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-4">Performance Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">45.2K</p>
            <p className="text-sm text-gray-600">Total Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">4.1%</p>
            <p className="text-sm text-gray-600">Avg Engagement</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">268</p>
            <p className="text-sm text-gray-600">Total Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">1.2M</p>
            <p className="text-sm text-gray-600">Total Views</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Gamified Rewards Component
function GamifiedRewards() {
  const badges = [
    { name: 'First Campaign', icon: '🥇', earned: true },
    { name: 'Top Performer', icon: '🏆', earned: true },
    { name: 'Content Creator', icon: '📝', earned: true },
    { name: 'Viral Sensation', icon: '🔥', earned: false },
    { name: 'Brand Ambassador', icon: '⭐', earned: false }
  ]

  const rewards = [
    { name: 'Hotel Voucher', points: 500, available: true },
    { name: 'Gift Cards', points: 200, available: true },
    { name: 'Premium Tools', points: 1000, available: false },
    { name: 'Exclusive Events', points: 1500, available: false }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Gamified Rewards</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Badges */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Badges & Achievements</h4>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <div key={badge.name} className={`border rounded-lg p-3 text-center ${
                badge.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                <span className={`text-xs ${
                  badge.earned ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {badge.earned ? 'Earned' : 'Locked'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Available Rewards</h4>
          <div className="space-y-3">
            {rewards.map((reward) => (
              <div key={reward.name} className={`border rounded-lg p-3 ${
                reward.available ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{reward.name}</p>
                    <p className="text-sm text-gray-600">{reward.points} points required</p>
                  </div>
                  {reward.available ? (
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Claim
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">Locked</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-4">Leaderboard</h4>
        <div className="space-y-2">
          {[
            { rank: 1, name: 'Sarah Johnson', points: 2847, badge: '🥇' },
            { rank: 2, name: 'Mike Chen', points: 2654, badge: '🥈' },
            { rank: 3, name: 'Emma Davis', points: 2412, badge: '🥉' },
            { rank: 4, name: 'Alex Rodriguez', points: 2189, badge: '4' },
            { rank: 5, name: 'You', points: 1247, badge: '5' }
          ].map((user) => (
            <div key={user.rank} className="flex items-center justify-between bg-white rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{user.badge}</span>
                <span className="font-medium text-gray-900">{user.name}</span>
                {user.name === 'You' && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">You</span>}
              </div>
              <span className="font-semibold text-gray-900">{user.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreatorDashboard
