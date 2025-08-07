import { useState } from 'react'
import { Link } from 'react-router-dom'

function CreatorMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

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
            <CampaignCard key={campaign.id} campaign={campaign} />
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
    </div>
  )
}

function CampaignCard({ campaign }: { campaign: any }) {
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
              onClick={() => setShowDetails(!showDetails)}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              {showDetails ? 'Hide Details' : 'View Details'}
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
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Apply Now
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Save for Later
              </button>
            </div>
          </div>
        )}

        {!showDetails && (
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Apply Now
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Save
              </button>
            </div>
            <button
              onClick={() => setShowDetails(true)}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreatorMarketplace
