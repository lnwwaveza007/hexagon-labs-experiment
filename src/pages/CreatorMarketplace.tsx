import { useState } from 'react'
import { Link } from 'react-router-dom'

function CreatorMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Interactive state
  const [appliedCampaigns, setAppliedCampaigns] = useState<number[]>([])
  const [savedCampaigns, setSavedCampaigns] = useState<number[]>([])
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [applicationForm, setApplicationForm] = useState({
    portfolio: '',
    pitch: '',
    timeline: '',
    experience: ''
  })

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🏪' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'fashion', name: 'Fashion & Beauty', icon: '👗' },
    { id: 'fitness', name: 'Fitness & Health', icon: '💪' },
    { id: 'food', name: 'Food & Cooking', icon: '🍳' },
    { id: 'travel', name: 'Travel', icon: '✈️' }
  ]

  const campaigns = [
    {
      id: 1,
      brand: 'TechFlow',
      title: 'Smartphone Review Campaign',
      description: 'Create engaging content showcasing the latest smartphone features and performance.',
      reward: '$500',
      category: 'tech',
      status: 'active',
      deadline: '2024-02-15',
      applications: 24,
      requirements: ['10K+ followers', 'Tech content focus', 'Video format'],
      tags: ['Technology', 'Review', 'Video']
    },
    {
      id: 2,
      brand: 'FashionForward',
      title: 'Summer Collection Launch',
      description: 'Showcase our new summer fashion line with creative styling and lifestyle content.',
      reward: '$300',
      category: 'fashion',
      status: 'active',
      deadline: '2024-02-20',
      applications: 18,
      requirements: ['5K+ followers', 'Fashion content', 'Photo/Video'],
      tags: ['Fashion', 'Lifestyle', 'Summer']
    },
    {
      id: 3,
      brand: 'FitnessPro',
      title: 'Workout Equipment Demo',
      description: 'Demonstrate our new fitness equipment with workout routines and tips.',
      reward: '$750',
      category: 'fitness',
      status: 'active',
      deadline: '2024-02-10',
      applications: 31,
      requirements: ['15K+ followers', 'Fitness content', 'Video format'],
      tags: ['Fitness', 'Equipment', 'Workout']
    },
    {
      id: 4,
      brand: 'CulinaryCraft',
      title: 'Recipe Creation Challenge',
      description: 'Create unique recipes using our premium ingredients and cooking tools.',
      reward: '$400',
      category: 'food',
      status: 'pending',
      deadline: '2024-02-25',
      applications: 12,
      requirements: ['8K+ followers', 'Food content', 'Photo/Video'],
      tags: ['Food', 'Cooking', 'Recipes']
    },
    {
      id: 5,
      brand: 'Wanderlust',
      title: 'Travel Destination Guide',
      description: 'Create travel guides and tips for popular destinations using our travel essentials.',
      reward: '$600',
      category: 'travel',
      status: 'active',
      deadline: '2024-02-18',
      applications: 22,
      requirements: ['12K+ followers', 'Travel content', 'Photo/Video'],
      tags: ['Travel', 'Guide', 'Destinations']
    }
  ]

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.brand.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Campaign interaction handlers
  const handleApplyToCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setApplicationForm({
      portfolio: '',
      pitch: '',
      timeline: '2 weeks',
      experience: ''
    })
    setShowApplicationModal(true)
  }

  const handleSaveCampaign = (campaignId: number) => {
    if (savedCampaigns.includes(campaignId)) {
      setSavedCampaigns(savedCampaigns.filter(id => id !== campaignId))
      alert('❌ Campaign removed from saved list')
    } else {
      setSavedCampaigns([...savedCampaigns, campaignId])
      alert('✅ Campaign saved to your list')
    }
  }

  const handleViewCampaignDetails = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowCampaignModal(true)
  }

  const handleSubmitApplication = () => {
    if (!applicationForm.portfolio || !applicationForm.pitch || !applicationForm.experience) {
      alert('⚠️ Please fill in all required fields')
      return
    }

    // Simulate application submission
    alert(`✅ Application submitted successfully!\n\nCampaign: ${selectedCampaign.title}\nBrand: ${selectedCampaign.brand}\n\nYour application has been sent to the brand for review. You'll receive a response within 3-5 business days.`)
    
    setAppliedCampaigns([...appliedCampaigns, selectedCampaign.id])
    setShowApplicationModal(false)
    setSelectedCampaign(null)
    setApplicationForm({ portfolio: '', pitch: '', timeline: '', experience: '' })
  }

  const handleQuickApply = (campaign: any) => {
    if (appliedCampaigns.includes(campaign.id)) {
      alert('ℹ️ You have already applied to this campaign')
      return
    }
    
    // Simulate quick application
    alert(`✅ Quick application submitted!\n\nCampaign: ${campaign.title}\nBrand: ${campaign.brand}\n\nYour profile has been sent to the brand. They will review your content and get back to you soon.`)
    setAppliedCampaigns([...appliedCampaigns, campaign.id])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Creator Marketplace</h1>
              <p className="text-lg text-gray-600">Discover and apply for exciting brand campaigns</p>
            </div>
            <Link
              to="/creator-dashboard"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search campaigns or brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center space-x-2 transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign Grid */}
        <div className="grid gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign}
              onApply={handleApplyToCampaign}
              onSave={handleSaveCampaign}
              onViewDetails={handleViewCampaignDetails}
              onQuickApply={handleQuickApply}
              isApplied={appliedCampaigns.includes(campaign.id)}
              isSaved={savedCampaigns.includes(campaign.id)}
            />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
            <div className="p-6 space-y-6">
              {/* Campaign Info */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{selectedCampaign.title}</h4>
                <p className="text-sm text-gray-600 mb-2">by {selectedCampaign.brand}</p>
                <p className="text-sm text-gray-600">{selectedCampaign.description}</p>
                <div className="mt-3 flex items-center space-x-4 text-sm">
                  <span className="text-green-600 font-semibold">{selectedCampaign.reward}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">Deadline: {selectedCampaign.deadline}</span>
                </div>
              </div>

              {/* Application Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Previous Work *</label>
                  <textarea
                    value={applicationForm.portfolio}
                    onChange={(e) => setApplicationForm({...applicationForm, portfolio: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Share links to your best content or describe your relevant experience..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Pitch *</label>
                  <textarea
                    value={applicationForm.pitch}
                    onChange={(e) => setApplicationForm({...applicationForm, pitch: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Explain your creative approach and why you're perfect for this campaign..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                  <select
                    value={applicationForm.timeline}
                    onChange={(e) => setApplicationForm({...applicationForm, timeline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>1 week</option>
                    <option>2 weeks</option>
                    <option>3 weeks</option>
                    <option>1 month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Experience *</label>
                  <textarea
                    value={applicationForm.experience}
                    onChange={(e) => setApplicationForm({...applicationForm, experience: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Describe your experience with similar campaigns or content..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSubmitApplication}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📤</span>
                  <span>Submit Application</span>
                </button>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Details Modal */}
      {showCampaignModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Campaign Details</h3>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Campaign Info */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedCampaign.title}</h4>
                    <p className="text-lg text-gray-600 mb-4">by {selectedCampaign.brand}</p>
                    <p className="text-gray-700 leading-relaxed">{selectedCampaign.description}</p>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">{selectedCampaign.reward}</div>
                    <div className="text-sm text-gray-600">Reward for successful completion</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Applications</div>
                      <div className="text-lg font-semibold text-gray-900">{selectedCampaign.applications}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Deadline</div>
                      <div className="text-lg font-semibold text-gray-900">{selectedCampaign.deadline}</div>
                    </div>
                  </div>
                </div>

                {/* Requirements & Tags */}
                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Requirements</h5>
                    <ul className="space-y-2">
                      {selectedCampaign.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-indigo-500 mt-1">•</span>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Tags</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCampaign.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => {
                          setShowCampaignModal(false)
                          handleApplyToCampaign(selectedCampaign)
                        }}
                        disabled={isApplied}
                        className={`flex-1 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                          isApplied 
                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        <span>📝</span>
                        <span>{isApplied ? 'Already Applied' : 'Apply Now'}</span>
                      </button>
                      <button 
                        onClick={() => onSave(selectedCampaign.id)}
                        className={`border py-3 px-4 rounded-lg transition-colors flex items-center space-x-2 ${
                          isSaved 
                            ? 'border-green-500 text-green-600 bg-green-50' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{isSaved ? '💾' : '🔖'}</span>
                        <span>{isSaved ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CampaignCard({ 
  campaign, 
  onApply, 
  onSave, 
  onViewDetails, 
  onQuickApply, 
  isApplied, 
  isSaved 
}: { 
  campaign: any
  onApply: (campaign: any) => void
  onSave: (campaignId: number) => void
  onViewDetails: (campaign: any) => void
  onQuickApply: (campaign: any) => void
  isApplied: boolean
  isSaved: boolean
}) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{campaign.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {campaign.status}
              </span>
              {isApplied && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Applied
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-3">{campaign.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <span>by <span className="font-medium text-gray-900">{campaign.brand}</span></span>
              <span>•</span>
              <span>{campaign.applications} applications</span>
              <span>•</span>
              <span>Deadline: {campaign.deadline}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {campaign.tags.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-green-600 mb-2">{campaign.reward}</div>
            <button
              onClick={() => onViewDetails(campaign)}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1"
            >
              <span>👁️</span>
              <span>View Details</span>
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mb-4">
              {campaign.requirements.map((req: string) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => onApply(campaign)}
                disabled={isApplied}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  isApplied 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <span>📝</span>
                <span>{isApplied ? 'Already Applied' : 'Apply Now'}</span>
              </button>
              <button 
                onClick={() => onSave(campaign.id)}
                className={`border px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  isSaved 
                    ? 'border-green-500 text-green-600 bg-green-50' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{isSaved ? '💾' : '🔖'}</span>
                <span>{isSaved ? 'Saved' : 'Save for Later'}</span>
              </button>
            </div>
          </div>
        )}

        {!showDetails && (
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button 
                onClick={() => onQuickApply(campaign)}
                disabled={isApplied}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  isApplied 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <span>⚡</span>
                <span>{isApplied ? 'Applied' : 'Quick Apply'}</span>
              </button>
              <button 
                onClick={() => onSave(campaign.id)}
                className={`border px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  isSaved 
                    ? 'border-green-500 text-green-600 bg-green-50' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{isSaved ? '💾' : '🔖'}</span>
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
            <button
              onClick={() => setShowDetails(true)}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1"
            >
              <span>📋</span>
              <span>View Details</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreatorMarketplace
