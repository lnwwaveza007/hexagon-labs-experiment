import { useState } from 'react'
import { Link } from 'react-router-dom'
import AIToolsPanel from '../components/AIToolsPanel'

function ContentCreation() {
  const [activeTab, setActiveTab] = useState('tools')
  const [generatedScript, setGeneratedScript] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAITools, setShowAITools] = useState(false)

  // Templates state
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [templateCustomization, setTemplateCustomization] = useState({
    title: '',
    description: '',
    duration: '',
    platform: 'Instagram'
  })

  // Scheduler state
  const [showSchedulerModal, setShowSchedulerModal] = useState(false)
  const [newScheduledContent, setNewScheduledContent] = useState({
    title: '',
    platform: 'Instagram',
    scheduledFor: '',
    description: ''
  })
  const [editingContent, setEditingContent] = useState<number | null>(null)

  // Projects state
  const [, setSelectedProject] = useState<string | null>(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    type: 'Video',
    description: '',
    deadline: ''
  })

  const tabs = [
    { id: 'tools', name: 'AI Tools', icon: '🤖' },
    { id: 'templates', name: 'Templates', icon: '📋' },
    { id: 'scheduler', name: 'Scheduler', icon: '📅' },
    { id: 'projects', name: 'My Projects', icon: '📁' }
  ]

  const aiTools = [
    {
      name: 'AI Script Generator',
      icon: '🤖',
      description: 'Generate engaging scripts for videos, posts, and stories',
      status: 'active',
      features: ['Multiple formats', 'Brand voice customization', 'Trending topics']
    },
    {
      name: 'AI Video Editor',
      icon: '🎬',
      description: 'Create professional videos with automatic editing',
      status: 'active',
      features: ['Auto-cut scenes', 'Background music', 'Transitions']
    },
    {
      name: 'Voiceover Tool',
      icon: '🎤',
      description: 'AI-powered voice synthesis in multiple languages',
      status: 'coming-soon',
      features: ['Multiple voices', 'Emotion control', 'Language support']
    },
    {
      name: 'Image Generator',
      icon: '🎨',
      description: 'Create stunning visuals with AI',
      status: 'active',
      features: ['Style customization', 'Brand integration', 'High resolution']
    }
  ]

  const templates = [
    {
      name: 'Product Review',
      category: 'Video',
      duration: '2-3 min',
      description: 'Professional product review template with call-to-action'
    },
    {
      name: 'Lifestyle Post',
      category: 'Social',
      duration: '30 sec',
      description: 'Engaging lifestyle content template'
    },
    {
      name: 'Tutorial Guide',
      category: 'Video',
      duration: '5-7 min',
      description: 'Step-by-step tutorial template'
    },
    {
      name: 'Story Highlight',
      category: 'Social',
      duration: '15 sec',
      description: 'Quick story template for social media'
    }
  ]

  const scheduledContent = [
    {
      id: 1,
      title: 'TechFlow Smartphone Review',
      platform: 'YouTube',
      scheduledFor: '2024-02-15 14:00',
      status: 'scheduled',
      thumbnail: '📱'
    },
    {
      id: 2,
      title: 'Summer Fashion Lookbook',
      platform: 'Instagram',
      scheduledFor: '2024-02-16 10:00',
      status: 'draft',
      thumbnail: '👗'
    },
    {
      id: 3,
      title: 'Workout Routine Demo',
      platform: 'TikTok',
      scheduledFor: '2024-02-17 18:00',
      status: 'scheduled',
      thumbnail: '💪'
    }
  ]

  const handleScriptGeneration = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedScript(`🎬 SCRIPT GENERATED

INTRO (0-10 seconds):
"Hey everyone! Today I'm super excited to share this amazing product with you..."

MAIN CONTENT (10-45 seconds):
"Let me show you the key features that make this product stand out..."

DEMONSTRATION (45-90 seconds):
"Here's how it works in real life..."

CALL TO ACTION (90-120 seconds):
"Don't forget to check out the link in my bio and use code CREATOR20 for 20% off!"

OUTRO (120-130 seconds):
"Thanks for watching! Make sure to like and subscribe for more content like this!"`)
      setIsGenerating(false)
    }, 3000)
  }

  // Template handlers
  const handleUseTemplate = (templateName: string) => {
    setSelectedTemplate(templateName)
    setTemplateCustomization({
      title: `${templateName} Content`,
      description: '',
      duration: templates.find(t => t.name === templateName)?.duration || '',
      platform: 'Instagram'
    })
    setShowTemplateModal(true)
  }

  const handleTemplateSubmit = () => {
    // Simulate template application
    alert(`✅ Template "${selectedTemplate}" applied successfully!\n\nCustomization:\n- Title: ${templateCustomization.title}\n- Platform: ${templateCustomization.platform}\n- Duration: ${templateCustomization.duration}`)
    setShowTemplateModal(false)
    setSelectedTemplate(null)
    setTemplateCustomization({ title: '', description: '', duration: '', platform: 'Instagram' })
  }

  // Scheduler handlers
  const handleScheduleNewContent = () => {
    setNewScheduledContent({
      title: '',
      platform: 'Instagram',
      scheduledFor: '',
      description: ''
    })
    setShowSchedulerModal(true)
  }

  const handleEditScheduledContent = (contentId: number) => {
    const content = scheduledContent.find(c => c.id === contentId)
    if (content) {
      setNewScheduledContent({
        title: content.title,
        platform: content.platform,
        scheduledFor: content.scheduledFor,
        description: ''
      })
      setEditingContent(contentId)
      setShowSchedulerModal(true)
    }
  }

  const handleSchedulerSubmit = () => {
    if (editingContent) {
      alert(`✅ Content "${newScheduledContent.title}" updated successfully!\n\nScheduled for: ${newScheduledContent.scheduledFor}\nPlatform: ${newScheduledContent.platform}`)
    } else {
      alert(`✅ New content "${newScheduledContent.title}" scheduled successfully!\n\nScheduled for: ${newScheduledContent.scheduledFor}\nPlatform: ${newScheduledContent.platform}`)
    }
    setShowSchedulerModal(false)
    setEditingContent(null)
    setNewScheduledContent({ title: '', platform: 'Instagram', scheduledFor: '', description: '' })
  }

  // Project handlers
  const handleContinueProject = (projectName: string) => {
    setSelectedProject(projectName)
    setProjectDetails({
      name: projectName,
      type: 'Video',
      description: '',
      deadline: ''
    })
    setShowProjectModal(true)
  }

  const handleProjectSubmit = () => {
    alert(`✅ Project "${projectDetails.name}" opened successfully!\n\nYou can now continue working on your content.`)
    setShowProjectModal(false)
    setSelectedProject(null)
    setProjectDetails({ name: '', type: 'Video', description: '', deadline: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Creation Studio</h1>
              <p className="text-lg text-gray-600">Create amazing content with AI-powered tools</p>
            </div>
            <Link
              to="/creator-dashboard"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Dashboard
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
                      ? 'border-purple-500 text-purple-600'
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
            {activeTab === 'tools' && <AITools tools={aiTools} onGenerateScript={handleScriptGeneration} generatedScript={generatedScript} isGenerating={isGenerating} onOpenAITools={() => setShowAITools(true)} />}
            {activeTab === 'templates' && <Templates templates={templates} onUseTemplate={handleUseTemplate} />}
            {activeTab === 'scheduler' && <Scheduler scheduledContent={scheduledContent} onScheduleNew={handleScheduleNewContent} onEditContent={handleEditScheduledContent} />}
            {activeTab === 'projects' && <Projects onContinueProject={handleContinueProject} />}
          </div>
        </div>
      </div>

      {/* AI Tools Panel */}
      {showAITools && (
        <AIToolsPanel onClose={() => setShowAITools(false)} />
      )}

      {/* Template Customization Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Customize Template</h3>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Title</label>
                <input
                  type="text"
                  value={templateCustomization.title}
                  onChange={(e) => setTemplateCustomization({...templateCustomization, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter content title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select
                  value={templateCustomization.platform}
                  onChange={(e) => setTemplateCustomization({...templateCustomization, platform: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Instagram</option>
                  <option>YouTube</option>
                  <option>TikTok</option>
                  <option>Twitter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={templateCustomization.duration}
                  onChange={(e) => setTemplateCustomization({...templateCustomization, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2-3 min"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleTemplateSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Template
                </button>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scheduler Modal */}
      {showSchedulerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingContent ? 'Edit Scheduled Content' : 'Schedule New Content'}
              </h3>
              <button
                onClick={() => setShowSchedulerModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Title</label>
                <input
                  type="text"
                  value={newScheduledContent.title}
                  onChange={(e) => setNewScheduledContent({...newScheduledContent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter content title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select
                  value={newScheduledContent.platform}
                  onChange={(e) => setNewScheduledContent({...newScheduledContent, platform: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>Instagram</option>
                  <option>YouTube</option>
                  <option>TikTok</option>
                  <option>Twitter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date & Time</label>
                <input
                  type="datetime-local"
                  value={newScheduledContent.scheduledFor}
                  onChange={(e) => setNewScheduledContent({...newScheduledContent, scheduledFor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSchedulerSubmit}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {editingContent ? 'Update Schedule' : 'Schedule Content'}
                </button>
                <button
                  onClick={() => setShowSchedulerModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Open Project</h3>
              <button
                onClick={() => setShowProjectModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Project: {projectDetails.name}</h4>
                <p className="text-sm text-gray-600">Ready to continue working on your content creation.</p>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleProjectSubmit}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Open Project
                </button>
                <button
                  onClick={() => setShowProjectModal(false)}
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

function AITools({ tools, onGenerateScript, generatedScript, isGenerating, onOpenAITools }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">AI-Powered Content Tools</h3>
        <button
          onClick={onOpenAITools}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <span>🤖</span>
          <span>Open Gemini AI Tools</span>
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((tool: any) => (
          <div key={tool.name} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">{tool.icon}</span>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">{tool.name}</h4>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                tool.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {tool.status === 'coming-soon' ? 'Coming Soon' : 'Active'}
              </span>
            </div>
            
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Features:</h5>
              <ul className="space-y-1">
                {tool.features.map((feature: string) => (
                  <li key={feature} className="text-sm text-gray-600 flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {tool.status === 'active' && (
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Use {tool.name}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Script Generator Demo */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Try AI Script Generator</h4>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Product Review</option>
                <option>Tutorial</option>
                <option>Lifestyle</option>
                <option>Story</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>30 seconds</option>
                <option>1 minute</option>
                <option>2 minutes</option>
                <option>5 minutes</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product/Brand</label>
            <input
              type="text"
              placeholder="e.g., TechFlow Smartphone"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <button
            onClick={onGenerateScript}
            disabled={isGenerating}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate Script'}
          </button>
        </div>

        {generatedScript && (
          <div className="mt-6">
            <h5 className="font-medium text-gray-900 mb-2">Generated Script:</h5>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">{generatedScript}</pre>
            </div>
            <div className="flex space-x-3 mt-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Use Script
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Regenerate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Templates({ templates, onUseTemplate }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Content Templates</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {templates.map((template: any) => (
          <div key={template.name} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                {template.category}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{template.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Duration: {template.duration}</span>
              <button 
                onClick={() => onUseTemplate(template.name)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>📋</span>
                <span>Use Template</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Scheduler({ scheduledContent, onScheduleNew, onEditContent }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Content Scheduler</h3>
        <button 
          onClick={onScheduleNew}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <span>📅</span>
          <span>Schedule New Content</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {scheduledContent.map((content: any) => (
          <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{content.thumbnail}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{content.title}</h4>
                  <p className="text-sm text-gray-600">{content.platform} • {content.scheduledFor}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  content.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {content.status}
                </span>
                <button 
                  onClick={() => onEditContent(content.id)}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1"
                >
                  <span>✏️</span>
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Projects({ onContinueProject }: any) {
  const projects = [
    { name: 'TechFlow Review', status: 'In Progress', progress: 75, type: 'Video' },
    { name: 'Fashion Lookbook', status: 'Completed', progress: 100, type: 'Photo' },
    { name: 'Workout Demo', status: 'Draft', progress: 25, type: 'Video' }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">My Projects</h3>
      
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{project.name}</h4>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                {project.type}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
                <button 
                  onClick={() => onContinueProject(project.name)}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1"
                >
                  <span>▶️</span>
                  <span>Continue</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContentCreation
