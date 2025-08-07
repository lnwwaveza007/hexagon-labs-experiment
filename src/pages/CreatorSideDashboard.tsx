import { useState } from 'react'
import { Link } from 'react-router-dom'

function CreatorSideDashboard() {
  const [activeTab, setActiveTab] = useState('opportunities')
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)

  const tabs = [
    { id: 'opportunities', name: 'Campaign Opportunities', icon: '🎯' },
    { id: 'earnings', name: 'Earnings', icon: '💰' },
    { id: 'content', name: 'Content Management', icon: '📱' },
    { id: 'analytics', name: 'Performance Analytics', icon: '📈' },
    { id: 'profile', name: 'Profile & Settings', icon: '⚙️' }
  ]

  const campaignOpportunities = [
    {
      id: '1',
      brand: 'TechFlow',
      title: 'Smartphone Review Campaign',
      category: 'Technology',
      budget: '$2,000 - $5,000',
      requirements: 'Video review, 2-3 min, Instagram + YouTube',
      deadline: '2024-03-15',
      status: 'Open',
      matchScore: 95,
      type: 'Sponsored Content'
    },
    {
      id: '2',
      brand: 'FashionForward',
      title: 'Summer Collection Showcase',
      category: 'Fashion',
      budget: '$1,500 - $3,000',
      requirements: 'Photo series, Instagram posts, Stories',
      deadline: '2024-03-20',
      status: 'Open',
      matchScore: 88,
      type: 'Affiliate'
    },
    {
      id: '3',
      brand: 'FitLife',
      title: 'Workout Equipment Demo',
      category: 'Fitness',
      budget: '$1,000 - $2,500',
      requirements: 'Video tutorial, TikTok + Instagram',
      deadline: '2024-03-25',
      status: 'Open',
      matchScore: 92,
      type: 'Sponsored Content'
    }
  ]

  const activeCampaigns = [
    {
      id: '1',
      brand: 'TechFlow',
      title: 'Smartphone Review',
      status: 'In Progress',
      progress: 75,
      earnings: '$2,500',
      dueDate: '2024-03-10'
    },
    {
      id: '2',
      brand: 'FashionForward',
      title: 'Summer Collection',
      status: 'Completed',
      progress: 100,
      earnings: '$1,800',
      dueDate: '2024-02-28'
    }
  ]

  const earningsData = {
    totalEarnings: '$8,450',
    thisMonth: '$2,300',
    pendingPayments: '$1,200',
    averagePerCampaign: '$2,113'
  }

  const performanceMetrics = {
    totalFollowers: '125K',
    engagementRate: '4.2%',
    averageViews: '45K',
    conversionRate: '3.8%'
  }

  const handleApplyToCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowApplicationModal(true)
  }

  const handleApplicationSubmit = () => {
    alert(`✅ Application submitted successfully for ${selectedCampaign?.title}!\n\nYou'll be notified within 48 hours.`)
    setShowApplicationModal(false)
    setSelectedCampaign(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Creator Dashboard</h1>
              <p className="text-lg text-gray-600">Find opportunities, track earnings, and grow your brand</p>
            </div>
            <Link
              to="/"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Earnings</h3>
            <p className="text-2xl font-bold text-gray-900">{earningsData.totalEarnings}</p>
            <p className="text-sm text-green-600">+15% this month</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-2">This Month</h3>
            <p className="text-2xl font-bold text-gray-900">{earningsData.thisMonth}</p>
            <p className="text-sm text-green-600">+8% from last month</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Payments</h3>
            <p className="text-2xl font-bold text-gray-900">{earningsData.pendingPayments}</p>
            <p className="text-sm text-blue-600">3 campaigns</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avg. per Campaign</h3>
            <p className="text-2xl font-bold text-gray-900">{earningsData.averagePerCampaign}</p>
            <p className="text-sm text-green-600">+12% increase</p>
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
                      ? 'border-green-500 text-green-600'
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
            {activeTab === 'opportunities' && (
              <CampaignOpportunities 
                opportunities={campaignOpportunities}
                onApplyToCampaign={handleApplyToCampaign}
              />
            )}
            {activeTab === 'earnings' && <Earnings earningsData={earningsData} />}
            {activeTab === 'content' && <ContentManagement activeCampaigns={activeCampaigns} />}
            {activeTab === 'analytics' && <PerformanceAnalytics performanceMetrics={performanceMetrics} />}
            {activeTab === 'profile' && <ProfileSettings />}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Apply to Campaign</h3>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{selectedCampaign.title}</h4>
                <p className="text-sm text-gray-600">Brand: {selectedCampaign.brand}</p>
                <p className="text-sm text-gray-600">Budget: {selectedCampaign.budget}</p>
                <p className="text-sm text-gray-600">Match Score: {selectedCampaign.matchScore}%</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Proposal</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                  placeholder="Describe your approach to this campaign..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Links</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Instagram, YouTube, etc."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleApplicationSubmit}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit Application
                </button>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CampaignOpportunities({ opportunities, onApplyToCampaign }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Campaign Opportunities</h3>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            AI Matching
          </button>
          <button className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
            Filter Opportunities
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {opportunities.map((opportunity: any) => (
          <div key={opportunity.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{opportunity.title}</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    {opportunity.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Brand: {opportunity.brand} • Category: {opportunity.category}</p>
                <p className="text-sm text-gray-600 mb-3">Requirements: {opportunity.requirements}</p>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Budget:</span>
                    <span className="text-sm font-semibold text-gray-900">{opportunity.budget}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Deadline:</span>
                    <span className="text-sm font-semibold text-gray-900">{opportunity.deadline}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Match Score:</span>
                    <span className="text-sm font-semibold text-green-600">{opportunity.matchScore}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  opportunity.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {opportunity.status}
                </span>
                <button 
                  onClick={() => onApplyToCampaign(opportunity)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Earnings({ earningsData }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Earnings & Payments</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">TechFlow Campaign</p>
                <p className="text-xs text-gray-600">Completed on Feb 28, 2024</p>
              </div>
              <span className="font-semibold text-green-600">$2,500</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">FashionForward Campaign</p>
                <p className="text-xs text-gray-600">Completed on Feb 15, 2024</p>
              </div>
              <span className="font-semibold text-green-600">$1,800</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">FitLife Campaign</p>
                <p className="text-xs text-gray-600">Completed on Feb 5, 2024</p>
              </div>
              <span className="font-semibold text-green-600">$1,200</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Pending Payments</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">TechFlow Review</p>
                <p className="text-xs text-gray-600">Due on Mar 10, 2024</p>
              </div>
              <span className="font-semibold text-yellow-600">$2,500</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Fashion Collection</p>
                <p className="text-xs text-gray-600">Due on Mar 15, 2024</p>
              </div>
              <span className="font-semibold text-yellow-600">$1,800</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Affiliate Earnings</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">$1,247</p>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">$3,450</p>
            <p className="text-sm text-gray-600">Total Affiliate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">12%</p>
            <p className="text-sm text-gray-600">Commission Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContentManagement({ activeCampaigns }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Content Management</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Create New Content
        </button>
      </div>

      <div className="grid gap-4">
        {activeCampaigns.map((campaign: any) => (
          <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{campaign.title}</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                campaign.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {campaign.status}
              </span>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{campaign.progress}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Earnings</p>
                <p className="font-semibold text-gray-900">{campaign.earnings}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-semibold text-gray-900">{campaign.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Brand</p>
                <p className="font-semibold text-gray-900">{campaign.brand}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View Details
              </button>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Upload Content
              </button>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Track Performance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PerformanceAnalytics({ performanceMetrics }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Performance Analytics</h3>
      
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Total Followers</h4>
          <p className="text-2xl font-bold text-gray-900">{performanceMetrics.totalFollowers}</p>
          <p className="text-sm text-green-600">+5% this month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Engagement Rate</h4>
          <p className="text-2xl font-bold text-gray-900">{performanceMetrics.engagementRate}</p>
          <p className="text-sm text-green-600">+0.3% this month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Average Views</h4>
          <p className="text-2xl font-bold text-gray-900">{performanceMetrics.averageViews}</p>
          <p className="text-sm text-green-600">+12% this month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Conversion Rate</h4>
          <p className="text-2xl font-bold text-gray-900">{performanceMetrics.conversionRate}</p>
          <p className="text-sm text-green-600">+0.5% this month</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Video Content</span>
              <span className="text-sm font-medium text-green-600">+25% engagement</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Photo Content</span>
              <span className="text-sm font-medium text-green-600">+18% engagement</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Story Content</span>
              <span className="text-sm font-medium text-green-600">+32% engagement</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Audience Insights</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Age 18-24</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Age 25-34</span>
              <span className="text-sm font-medium">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Age 35+</span>
              <span className="text-sm font-medium">23%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Profile & Settings</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Creator Profile</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                defaultValue="Sarah Tech"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                defaultValue="Tech enthusiast and content creator sharing the latest in technology and lifestyle."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Technology</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Lifestyle</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Connected Platforms</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-medium text-sm">Instagram</p>
                  <p className="text-xs text-gray-600">@sarahtech</p>
                </div>
              </div>
              <span className="text-green-600 text-sm">Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📺</span>
                <div>
                  <p className="font-medium text-sm">YouTube</p>
                  <p className="text-xs text-gray-600">Sarah Tech Channel</p>
                </div>
              </div>
              <span className="text-green-600 text-sm">Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎵</span>
                <div>
                  <p className="font-medium text-sm">TikTok</p>
                  <p className="text-xs text-gray-600">@sarahtech</p>
                </div>
              </div>
              <span className="text-gray-400 text-sm">Not Connected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>PayPal</option>
              <option>Bank Transfer</option>
              <option>Stripe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Email</label>
            <input
              type="email"
              defaultValue="sarah@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorSideDashboard
