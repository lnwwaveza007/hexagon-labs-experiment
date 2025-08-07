import { useState } from 'react'
import { Link } from 'react-router-dom'

function EarningsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' }
  ]

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: '🌐' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'youtube', name: 'YouTube', icon: '📺' }
  ]

  const earningsData = {
    total: 2847,
    pending: 456,
    withdrawn: 2391,
    thisMonth: 847,
    lastMonth: 623
  }

  const affiliateLinks = [
    {
      id: 1,
      product: 'TechFlow Smartphone',
      clicks: 1247,
      conversions: 23,
      revenue: 156,
      commission: 15,
      status: 'active'
    },
    {
      id: 2,
      product: 'FashionForward Collection',
      clicks: 892,
      conversions: 15,
      revenue: 89,
      commission: 12,
      status: 'active'
    },
    {
      id: 3,
      product: 'FitnessPro Equipment',
      clicks: 567,
      conversions: 8,
      revenue: 67,
      commission: 18,
      status: 'paused'
    }
  ]

  const performanceMetrics = [
    { metric: 'Total Followers', value: '45.2K', change: '+12%', trend: 'up' },
    { metric: 'Avg Engagement', value: '4.1%', change: '+0.3%', trend: 'up' },
    { metric: 'Content Views', value: '1.2M', change: '+8%', trend: 'up' },
    { metric: 'Conversion Rate', value: '2.8%', change: '-0.2%', trend: 'down' }
  ]

  const recentTransactions = [
    { id: 1, type: 'Campaign Payment', amount: 500, date: '2024-02-14', status: 'completed' },
    { id: 2, type: 'Affiliate Commission', amount: 156, date: '2024-02-13', status: 'completed' },
    { id: 3, type: 'Withdrawal', amount: -1000, date: '2024-02-12', status: 'completed' },
    { id: 4, type: 'Campaign Payment', amount: 300, date: '2024-02-11', status: 'pending' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Earnings & Analytics</h1>
              <p className="text-lg text-gray-600">Track your performance and manage your earnings</p>
            </div>
            <Link
              to="/creator-dashboard"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.name}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                    selectedPlatform === platform.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{platform.icon}</span>
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">${earningsData.total}</p>
                <p className="text-sm text-gray-500">+{earningsData.thisMonth - earningsData.lastMonth} vs last month</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">${earningsData.pending}</p>
                <p className="text-sm text-gray-500">Awaiting approval</p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Withdrawn</p>
                <p className="text-2xl font-bold text-blue-600">${earningsData.withdrawn}</p>
                <p className="text-sm text-gray-500">Total withdrawn</p>
              </div>
              <div className="text-3xl">💳</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">${earningsData.thisMonth}</p>
                <p className="text-sm text-gray-500">Current period</p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Affiliate Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Affiliate Links</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Add New Link
              </button>
            </div>
            
            <div className="space-y-4">
              {affiliateLinks.map((link) => (
                <div key={link.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{link.product}</h4>
                      <p className="text-sm text-gray-600">
                        {link.clicks} clicks • {link.conversions} conversions
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      link.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {link.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Revenue: <span className="font-medium text-green-600">${link.revenue}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Commission: <span className="font-medium text-blue-600">{link.commission}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h3>
            
            <div className="space-y-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.metric} className="flex justify-between items-center">
                  <span className="text-gray-700">{metric.metric}</span>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">{metric.value}</span>
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                Withdraw via Smart Contract
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h3>
          
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <h4 className="font-medium text-gray-900">{transaction.type}</h4>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EarningsAnalytics
