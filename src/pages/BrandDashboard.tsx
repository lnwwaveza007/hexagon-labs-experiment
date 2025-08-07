import { useState } from 'react'
import { Link } from 'react-router-dom'

function BrandDashboard() {
  const [activeTab, setActiveTab] = useState('discovery')
  const [selectedCreators, setSelectedCreators] = useState<string[]>([])
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [campaignStep, setCampaignStep] = useState(1)
  const [campaignDetails, setCampaignDetails] = useState({
    name: '',
    goal: 'Sales',
    budget: '',
    description: '',
    startDate: '',
    endDate: '',
    targetAudience: '',
    platforms: [] as string[],
    contentType: '',
    requirements: '',
    selectedCreators: [] as string[]
  })

  const tabs = [
    { id: 'discovery', name: 'Creator Discovery', icon: '🔍' },
    { id: 'campaigns', name: 'Campaigns', icon: '📊' },
    { id: 'affiliate', name: 'Affiliate', icon: '💰' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'reports', name: 'Reports', icon: '📋' }
  ]

  const creators = [
    {
      id: '1',
      name: 'Sarah Tech',
      followers: '125K',
      engagement: '4.2%',
      category: 'Technology',
      authenticity: '98%',
      platforms: ['YouTube', 'Instagram'],
      avatar: '👩‍💻',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Mike Fitness',
      followers: '89K',
      engagement: '5.1%',
      category: 'Fitness',
      authenticity: '95%',
      platforms: ['TikTok', 'Instagram'],
      avatar: '💪',
      rating: 4.6
    },
    {
      id: '3',
      name: 'Emma Fashion',
      followers: '210K',
      engagement: '3.8%',
      category: 'Fashion',
      authenticity: '92%',
      platforms: ['Instagram', 'YouTube'],
      avatar: '👗',
      rating: 4.9
    },
    {
      id: '4',
      name: 'Alex Gaming',
      followers: '156K',
      engagement: '6.2%',
      category: 'Gaming',
      authenticity: '97%',
      platforms: ['Twitch', 'YouTube'],
      avatar: '🎮',
      rating: 4.7
    }
  ]

  const campaigns = [
    {
      id: '1',
      name: 'TechFlow Smartphone Launch',
      status: 'Active',
      creators: 8,
      budget: '$15,000',
      performance: 'Excellent',
      roi: '320%',
      endDate: '2024-03-15'
    },
    {
      id: '2',
      name: 'Summer Fashion Collection',
      status: 'Planning',
      creators: 5,
      budget: '$8,000',
      performance: 'Pending',
      roi: 'N/A',
      endDate: '2024-04-01'
    }
  ]

  const handleCreatorSelect = (creatorId: string) => {
    setSelectedCreators(prev => 
      prev.includes(creatorId) 
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    )
  }

  const handleCreateCampaign = () => {
    setCampaignDetails({
      name: '',
      goal: 'Sales',
      budget: '',
      description: '',
      startDate: '',
      endDate: '',
      targetAudience: '',
      platforms: [],
      contentType: '',
      requirements: '',
      selectedCreators: []
    })
    setCampaignStep(1)
    setShowCampaignModal(true)
  }

  const handleCampaignSubmit = () => {
    alert(`✅ Campaign "${campaignDetails.name}" created successfully!\n\nGoal: ${campaignDetails.goal}\nBudget: $${campaignDetails.budget}\nCreators: ${campaignDetails.selectedCreators.length}\nPlatforms: ${campaignDetails.platforms.join(', ')}`)
    setShowCampaignModal(false)
    setCampaignStep(1)
  }

  const handleNextStep = () => {
    if (campaignStep < 4) {
      setCampaignStep(campaignStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (campaignStep > 1) {
      setCampaignStep(campaignStep - 1)
    }
  }

  const handlePlatformToggle = (platform: string) => {
    setCampaignDetails(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }))
  }

  const handleCreatorToggle = (creatorId: string) => {
    setCampaignDetails(prev => ({
      ...prev,
      selectedCreators: prev.selectedCreators.includes(creatorId)
        ? prev.selectedCreators.filter(id => id !== creatorId)
        : [...prev.selectedCreators, creatorId]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Brand Dashboard</h1>
              <p className="text-lg text-gray-600">Discover creators, manage campaigns, and track performance</p>
            </div>
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
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
                      ? 'border-blue-500 text-blue-600'
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
            {activeTab === 'discovery' && (
              <CreatorDiscovery 
                creators={creators} 
                selectedCreators={selectedCreators}
                onCreatorSelect={handleCreatorSelect}
              />
            )}
            {activeTab === 'campaigns' && (
              <Campaigns 
                campaigns={campaigns}
                onCreateCampaign={handleCreateCampaign}
              />
            )}
            {activeTab === 'affiliate' && <AffiliateIntegration />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'reports' && <Reports />}
          </div>
        </div>
      </div>

      {/* Campaign Creation Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Campaign Setup Wizard</h3>
                <p className="text-sm text-gray-600">Step {campaignStep} of 4</p>
              </div>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex-1">
                    <div className={`h-2 rounded-full ${
                      step <= campaignStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Step 1: Basic Information */}
              {campaignStep === 1 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Campaign Basics</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                      <input
                        type="text"
                        value={campaignDetails.name}
                        onChange={(e) => setCampaignDetails({...campaignDetails, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter campaign name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Goal</label>
                      <select
                        value={campaignDetails.goal}
                        onChange={(e) => setCampaignDetails({...campaignDetails, goal: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Sales</option>
                        <option>Awareness</option>
                        <option>Affiliate</option>
                        <option>Lead Generation</option>
                        <option>Brand Awareness</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                      <input
                        type="number"
                        value={campaignDetails.budget}
                        onChange={(e) => setCampaignDetails({...campaignDetails, budget: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter budget amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                      <input
                        type="text"
                        value={campaignDetails.targetAudience}
                        onChange={(e) => setCampaignDetails({...campaignDetails, targetAudience: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Tech-savvy millennials"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Description</label>
                    <textarea
                      value={campaignDetails.description}
                      onChange={(e) => setCampaignDetails({...campaignDetails, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Describe your campaign objectives and requirements..."
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Timeline & Platforms */}
              {campaignStep === 2 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Timeline & Platforms</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={campaignDetails.startDate}
                        onChange={(e) => setCampaignDetails({...campaignDetails, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        value={campaignDetails.endDate}
                        onChange={(e) => setCampaignDetails({...campaignDetails, endDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Target Platforms</label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {['Instagram', 'YouTube', 'TikTok', 'Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                        <button
                          key={platform}
                          onClick={() => handlePlatformToggle(platform)}
                          className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                            campaignDetails.platforms.includes(platform)
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                    <select
                      value={campaignDetails.contentType}
                      onChange={(e) => setCampaignDetails({...campaignDetails, contentType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select content type</option>
                      <option>Video Review</option>
                      <option>Product Showcase</option>
                      <option>Story/Reel</option>
                      <option>Live Stream</option>
                      <option>Blog Post</option>
                      <option>Podcast</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Creator Selection */}
              {campaignStep === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Creator Selection</h4>
                  <p className="text-sm text-gray-600">Select creators for your campaign. You can select multiple creators.</p>
                  
                  <div className="grid gap-4">
                    {creators.map((creator) => (
                      <div
                        key={creator.id}
                        onClick={() => handleCreatorToggle(creator.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          campaignDetails.selectedCreators.includes(creator.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{creator.avatar}</span>
                            <div>
                              <h5 className="font-semibold text-gray-900">{creator.name}</h5>
                              <p className="text-sm text-gray-600">{creator.category} • {creator.followers} followers</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">⭐ {creator.rating}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                campaignDetails.selectedCreators.includes(creator.id)
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {campaignDetails.selectedCreators.includes(creator.id) ? 'Selected' : 'Select'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Requirements & Review */}
              {campaignStep === 4 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Requirements & Review</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Requirements</label>
                    <textarea
                      value={campaignDetails.requirements}
                      onChange={(e) => setCampaignDetails({...campaignDetails, requirements: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Specify any specific requirements, guidelines, or deliverables..."
                    />
                  </div>

                  {/* Campaign Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">Campaign Summary</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><span className="font-medium">Name:</span> {campaignDetails.name || 'Not specified'}</p>
                        <p><span className="font-medium">Goal:</span> {campaignDetails.goal}</p>
                        <p><span className="font-medium">Budget:</span> ${campaignDetails.budget || 'Not specified'}</p>
                        <p><span className="font-medium">Target Audience:</span> {campaignDetails.targetAudience || 'Not specified'}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Platforms:</span> {campaignDetails.platforms.join(', ') || 'None selected'}</p>
                        <p><span className="font-medium">Content Type:</span> {campaignDetails.contentType || 'Not specified'}</p>
                        <p><span className="font-medium">Selected Creators:</span> {campaignDetails.selectedCreators.length}</p>
                        <p><span className="font-medium">Timeline:</span> {campaignDetails.startDate && campaignDetails.endDate ? `${campaignDetails.startDate} to ${campaignDetails.endDate}` : 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevStep}
                  disabled={campaignStep === 1}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    campaignStep === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Previous
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCampaignModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  {campaignStep < 4 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleCampaignSubmit}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Create Campaign
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CreatorDiscovery({ creators, selectedCreators, onCreatorSelect }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Creator Discovery & Matching</h3>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            AI Matching Engine
          </button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            Build Shortlist
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Performance Filters (30+ criteria)</h4>
        <div className="grid md:grid-cols-4 gap-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Category</option>
            <option>Technology</option>
            <option>Fashion</option>
            <option>Fitness</option>
            <option>Gaming</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Followers</option>
            <option>10K - 50K</option>
            <option>50K - 100K</option>
            <option>100K+</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Engagement</option>
            <option>3%+</option>
            <option>5%+</option>
            <option>7%+</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Authenticity</option>
            <option>90%+</option>
            <option>95%+</option>
            <option>98%+</option>
          </select>
        </div>
      </div>

      {/* Creators Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {creators.map((creator: any) => (
          <div 
            key={creator.id} 
            className={`border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer ${
              selectedCreators.includes(creator.id) 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200'
            }`}
            onClick={() => onCreatorSelect(creator.id)}
          >
            <div className="flex items-start space-x-4">
              <span className="text-3xl">{creator.avatar}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{creator.name}</h4>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-medium">{creator.rating}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Followers</p>
                    <p className="font-semibold text-gray-900">{creator.followers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Engagement</p>
                    <p className="font-semibold text-gray-900">{creator.engagement}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Authenticity</p>
                    <p className="font-semibold text-gray-900">{creator.authenticity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-900">{creator.category}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {creator.platforms.map((platform: string) => (
                    <span key={platform} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCreators.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            Selected Creators ({selectedCreators.length})
          </h4>
          <p className="text-blue-700 text-sm mb-3">
            Ready to create a campaign with these creators
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create Campaign
          </button>
        </div>
      )}
    </div>
  )
}

function Campaigns({ campaigns, onCreateCampaign }: any) {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [showQuickActions, setShowQuickActions] = useState<string | null>(null)
  const [showCreatorPerformance, setShowCreatorPerformance] = useState<string | null>(null)

  // Mock creator performance data for each campaign
  const creatorPerformanceData = {
    '1': [
      {
        id: '1',
        name: 'Sarah Tech',
        avatar: '👩‍💻',
        followers: '125K',
        platform: 'YouTube',
        content: 'Product Review',
        views: '45.2K',
        clicks: '1,234',
        conversions: '89',
        revenue: '$2,450',
        commission: '$245',
        roi: '156%',
        status: 'Active',
        lastActivity: '2 hours ago'
      },
      {
        id: '2',
        name: 'Mike Fitness',
        avatar: '💪',
        followers: '89K',
        platform: 'Instagram',
        content: 'Story Feature',
        views: '12.8K',
        clicks: '567',
        conversions: '34',
        revenue: '$890',
        commission: '$89',
        roi: '112%',
        status: 'Active',
        lastActivity: '1 hour ago'
      },
      {
        id: '3',
        name: 'Emma Fashion',
        avatar: '👗',
        followers: '210K',
        platform: 'TikTok',
        content: 'Tutorial Video',
        views: '89.5K',
        clicks: '2,156',
        conversions: '156',
        revenue: '$4,200',
        commission: '$420',
        roi: '189%',
        status: 'Active',
        lastActivity: '30 min ago'
      }
    ],
    '2': [
      {
        id: '4',
        name: 'Alex Gaming',
        avatar: '🎮',
        followers: '156K',
        platform: 'Twitch',
        content: 'Live Stream',
        views: '23.4K',
        clicks: '789',
        conversions: '45',
        revenue: '$1,120',
        commission: '$112',
        roi: '134%',
        status: 'Scheduled',
        lastActivity: 'Tomorrow'
      }
    ]
  }

  const handleViewDetails = (campaignId: string) => {
    alert(`📊 Campaign Details for ${campaigns.find((c: any) => c.id === campaignId)?.name}\n\nStatus: Active\nCreators: 8\nBudget: $15,000\nROI: 320%\nPerformance: Excellent`)
  }

  const handleEditCampaign = (campaignId: string) => {
    alert(`✏️ Edit Campaign: ${campaigns.find((c: any) => c.id === campaignId)?.name}\n\nRedirecting to campaign editor...`)
  }

  const handleDuplicateCampaign = (campaignId: string) => {
    alert(`📋 Campaign duplicated: ${campaigns.find((c: any) => c.id === campaignId)?.name}\n\nNew campaign created with same settings!`)
  }

  const handlePauseCampaign = (campaignId: string) => {
    alert(`⏸️ Campaign paused: ${campaigns.find((c: any) => c.id === campaignId)?.name}`)
  }

  const handleDeleteCampaign = (campaignId: string) => {
    if (confirm(`🗑️ Are you sure you want to delete "${campaigns.find((c: any) => c.id === campaignId)?.name}"?`)) {
      alert('Campaign deleted successfully!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Campaign Setup & Briefing</h3>
        <button 
          onClick={onCreateCampaign}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>New Campaign</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <span className="text-green-500 text-2xl">📈</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">$28K</p>
            </div>
            <span className="text-blue-500 text-2xl">💰</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. ROI</p>
              <p className="text-2xl font-bold text-gray-900">245%</p>
            </div>
            <span className="text-purple-500 text-2xl">📊</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Creators</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <span className="text-orange-500 text-2xl">👥</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {campaigns.map((campaign: any) => (
          <div 
            key={campaign.id} 
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
            onMouseEnter={() => setShowQuickActions(campaign.id)}
            onMouseLeave={() => setShowQuickActions(null)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {campaign.status}
                </span>
              </div>
              
              {/* Quick Actions Menu */}
              {showQuickActions === campaign.id && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewDetails(campaign.id)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    👁️
                  </button>
                  <button 
                    onClick={() => handleEditCampaign(campaign.id)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Campaign"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDuplicateCampaign(campaign.id)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Duplicate Campaign"
                  >
                    📋
                  </button>
                  <button 
                    onClick={() => handlePauseCampaign(campaign.id)}
                    className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                    title="Pause Campaign"
                  >
                    ⏸️
                  </button>
                  <button 
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Campaign"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Creators</p>
                <p className="font-semibold text-gray-900">{campaign.creators}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Budget</p>
                <p className="font-semibold text-gray-900">{campaign.budget}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Performance</p>
                <p className="font-semibold text-gray-900">{campaign.performance}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">ROI</p>
                <p className="font-semibold text-gray-900">{campaign.roi}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">End Date: {campaign.endDate}</span>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowCreatorPerformance(showCreatorPerformance === campaign.id ? null : campaign.id)}
                  className="text-green-600 hover:text-green-700 text-sm font-medium hover:bg-green-50 px-3 py-1 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <span>📊</span>
                  <span>{showCreatorPerformance === campaign.id ? 'Hide' : 'Track'} Performance</span>
                </button>
                <button 
                  onClick={() => handleViewDetails(campaign.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleEditCampaign(campaign.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
                >
                  Edit Campaign
                </button>
              </div>
            </div>

            {/* Creator Performance Tracking Section */}
            {showCreatorPerformance === campaign.id && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-lg font-semibold text-gray-900">Creator Performance Tracking</h5>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Real-time</button>
                    <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Affiliate</button>
                    <button className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Analytics</button>
                  </div>
                </div>

                {/* Performance Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">Total Revenue</p>
                    <p className="text-lg font-bold text-blue-900">$7,660</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-600 font-medium">Total Conversions</p>
                    <p className="text-lg font-bold text-green-900">324</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-purple-600 font-medium">Avg. CTR</p>
                    <p className="text-lg font-bold text-purple-900">2.8%</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-xs text-orange-600 font-medium">Total Clicks</p>
                    <p className="text-lg font-bold text-orange-900">4,746</p>
                  </div>
                </div>

                {/* Individual Creator Performance */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-500 border-b border-gray-200 pb-2">
                    <span className="w-32">Creator</span>
                    <span className="w-20">Platform</span>
                    <span className="w-24">Views</span>
                    <span className="w-20">Clicks</span>
                    <span className="w-24">Conversions</span>
                    <span className="w-24">Revenue</span>
                    <span className="w-20">ROI</span>
                    <span className="w-24">Status</span>
                    <span className="w-20">Actions</span>
                  </div>
                  
                  {creatorPerformanceData[campaign.id]?.map((creator: any) => (
                    <div key={creator.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-2 w-32">
                        <span className="text-lg">{creator.avatar}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{creator.name}</p>
                          <p className="text-xs text-gray-500">{creator.followers}</p>
                        </div>
                      </div>
                      <div className="w-20 text-center">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{creator.platform}</span>
                      </div>
                      <div className="w-24 text-center">
                        <p className="text-sm font-medium text-gray-900">{creator.views}</p>
                        <p className="text-xs text-gray-500">{creator.content}</p>
                      </div>
                      <div className="w-20 text-center">
                        <p className="text-sm font-medium text-gray-900">{creator.clicks}</p>
                        <p className="text-xs text-gray-500">CTR: {((parseInt(creator.clicks.replace(',', '')) / parseInt(creator.views.replace('K', '000').replace('.', ''))) * 100).toFixed(1)}%</p>
                      </div>
                      <div className="w-24 text-center">
                        <p className="text-sm font-medium text-gray-900">{creator.conversions}</p>
                        <p className="text-xs text-gray-500">Rate: {((creator.conversions / parseInt(creator.clicks.replace(',', ''))) * 100).toFixed(1)}%</p>
                      </div>
                      <div className="w-24 text-center">
                        <p className="text-sm font-medium text-gray-900">{creator.revenue}</p>
                        <p className="text-xs text-green-600">+{creator.commission}</p>
                      </div>
                      <div className="w-20 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          parseInt(creator.roi) > 150 ? 'bg-green-100 text-green-700' :
                          parseInt(creator.roi) > 120 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {creator.roi}
                        </span>
                      </div>
                      <div className="w-24 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          creator.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {creator.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{creator.lastActivity}</p>
                      </div>
                      <div className="w-20 flex space-x-1">
                        <button 
                          onClick={() => alert(`📊 Detailed analytics for ${creator.name}\n\nPlatform: ${creator.platform}\nContent: ${creator.content}\nViews: ${creator.views}\nClicks: ${creator.clicks}\nConversions: ${creator.conversions}\nRevenue: ${creator.revenue}\nCommission: ${creator.commission}\nROI: ${creator.roi}`)}
                          className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                          title="View Analytics"
                        >
                          📊
                        </button>
                        <button 
                          onClick={() => alert(`💰 Affiliate tracking for ${creator.name}\n\nUnique Links: 3\nClick-through Rate: 2.8%\nConversion Rate: 7.2%\nCommission Earned: ${creator.commission}\nPending Payout: $0\nNext Payout: March 15, 2024`)}
                          className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                          title="Affiliate Details"
                        >
                          💰
                        </button>
                        <button 
                          onClick={() => alert(`📱 Contact ${creator.name}\n\nEmail: ${creator.name.toLowerCase().replace(' ', '.')}@email.com\nPhone: +1 (555) 123-4567\nPreferred Contact: Email\nResponse Time: 2-4 hours`)}
                          className="p-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded transition-colors"
                          title="Contact Creator"
                        >
                          📱
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance Actions */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alert('📊 Generating detailed performance report...\n\nReport will include:\n• Individual creator analytics\n• Affiliate tracking data\n• ROI calculations\n• Performance trends\n• Recommendations')}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      📊 Generate Report
                    </button>
                    <button 
                      onClick={() => alert('💰 Exporting affiliate data...\n\nData includes:\n• Click tracking\n• Conversion rates\n• Commission calculations\n• Payout schedules\n• Performance metrics')}
                      className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      💰 Export Affiliate Data
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Campaign Features */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Campaign Features</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
            <span className="text-blue-600">📋</span>
            <span className="text-sm">Brief Upload</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
            <span className="text-blue-600">🤖</span>
            <span className="text-sm">AI Script Generator</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
            <span className="text-blue-600">👆</span>
            <span className="text-sm">Swipe-style Matching UX</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
            <span className="text-blue-600">🎯</span>
            <span className="text-sm">Goal Selection (Sales/Awareness/Affiliate)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AffiliateIntegration() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Affiliate Integration</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Auto-generated Affiliate Links</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">TechFlow Smartphone</span>
              <span className="text-xs text-gray-500">techflow.com/ref/brand123</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Fashion Collection</span>
              <span className="text-xs text-gray-500">fashion.com/ref/brand123</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Discount Code Management</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">SUMMER20</span>
              <span className="text-xs text-green-600">20% off</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">NEWUSER15</span>
              <span className="text-xs text-green-600">15% off</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Tier-based Commission System</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Bronze Tier</span>
              <span className="text-sm font-medium">5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Silver Tier</span>
              <span className="text-sm font-medium">8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Gold Tier</span>
              <span className="text-sm font-medium">12%</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Creator ROI Dashboard</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Total Sales</span>
              <span className="text-sm font-medium">$45,230</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Commission Paid</span>
              <span className="text-sm font-medium">$3,617</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">ROI</span>
              <span className="text-sm font-medium text-green-600">320%</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Smart Contract</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm">Automated Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm">Performance Tracking</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm">Transparent Reporting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Analytics() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Campaign Analytics & Optimization</h3>
      
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Total Reach</h4>
          <p className="text-2xl font-bold text-gray-900">2.4M</p>
          <p className="text-sm text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Engagement Rate</h4>
          <p className="text-2xl font-bold text-gray-900">4.8%</p>
          <p className="text-sm text-green-600">+0.3% from last month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Conversions</h4>
          <p className="text-2xl font-bold text-gray-900">1,247</p>
          <p className="text-sm text-green-600">+18% from last month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">ROI</h4>
          <p className="text-2xl font-bold text-gray-900">320%</p>
          <p className="text-sm text-green-600">+45% from last month</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Real-time Performance Dashboard</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Campaign Performance</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Creator Performance</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-sm font-medium">92%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">A/B Testing Results</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Version A</span>
              <span className="text-sm font-medium text-green-600">+15% better</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Version B</span>
              <span className="text-sm font-medium text-red-600">-8% worse</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Positive</span>
              <span className="text-sm font-medium text-green-600">78%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Neutral</span>
              <span className="text-sm font-medium text-gray-600">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Negative</span>
              <span className="text-sm font-medium text-red-600">4%</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Content Heatmap</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">High Engagement</span>
              <span className="text-sm font-medium text-green-600">Hot</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Medium Engagement</span>
              <span className="text-sm font-medium text-yellow-600">Warm</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Low Engagement</span>
              <span className="text-sm font-medium text-red-600">Cold</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Optimization Suggestions</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-blue-500">💡</span>
              <span className="text-sm">Post during peak hours (6-8 PM)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500">💡</span>
              <span className="text-sm">Use more video content</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500">💡</span>
              <span className="text-sm">Include call-to-action buttons</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Export Reports (CSV)</h4>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Export Performance Data
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Export Creator Analytics
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Export ROI Report
          </button>
        </div>
      </div>
    </div>
  )
}

function Reports() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Reports & Insights</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Follower Authenticity Check</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Real Followers</span>
              <span className="text-sm font-medium text-green-600">98.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bot Detection</span>
              <span className="text-sm font-medium text-red-600">1.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Engagement Quality</span>
              <span className="text-sm font-medium text-green-600">High</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Demographics & Engagement</h4>
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

      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Cross-platform Report Support</h4>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">📱</span>
            <div>
              <p className="font-medium text-sm">Instagram</p>
              <p className="text-xs text-gray-600">Connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">📺</span>
            <div>
              <p className="font-medium text-sm">YouTube</p>
              <p className="text-xs text-gray-600">Connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🎵</span>
            <div>
              <p className="font-medium text-sm">TikTok</p>
              <p className="text-xs text-gray-600">Connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🐦</span>
            <div>
              <p className="font-medium text-sm">Twitter</p>
              <p className="text-xs text-gray-600">Connected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandDashboard
