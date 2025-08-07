import { useState } from 'react'
import { geminiService, type ScriptGenerationParams, type ContentIdeaParams, type HashtagParams } from '../services/geminiService'

interface AIToolsPanelProps {
  onClose: () => void
}

// Script Result Component
const ScriptResult = ({ script, onCopy, onClear }: { script: string; onCopy: () => void; onClear: () => void }) => (
  <div className="mt-6">
    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
      <span className="text-purple-600 mr-2">🎬</span>
      Generated Script
    </h4>
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200 shadow-sm">
      <div className="bg-white p-4 rounded-lg border border-purple-100">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-mono">{script}</pre>
      </div>
      <div className="flex space-x-3 mt-4">
        <button 
          onClick={onCopy}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Script
        </button>
        <button 
          onClick={onClear}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
)

// Content Ideas Result Component
const ContentIdeasResult = ({ ideas, onCopy, onClear }: { ideas: string[]; onCopy: () => void; onClear: () => void }) => (
  <div className="mt-6">
    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
      <span className="text-blue-600 mr-2">💡</span>
      Content Ideas
    </h4>
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 shadow-sm">
      <div className="space-y-4">
        {ideas.map((idea, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-1">
                #{index + 1}
              </span>
              <p className="text-gray-700 leading-relaxed">{idea}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-3 mt-4">
        <button 
          onClick={onCopy}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy All Ideas
        </button>
        <button 
          onClick={onClear}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
)

// Hashtag Result Component
const HashtagResult = ({ hashtags, onCopy, onClear }: { hashtags: string[]; onCopy: () => void; onClear: () => void }) => (
  <div className="mt-6">
    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
      <span className="text-green-600 mr-2">🏷️</span>
      Generated Hashtags
    </h4>
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 shadow-sm">
      <div className="bg-white p-4 rounded-lg border border-green-100">
        <div className="flex flex-wrap gap-2">
          {hashtags.map((hashtag, index) => (
            <span 
              key={index}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition-colors cursor-pointer"
              onClick={() => navigator.clipboard.writeText(hashtag)}
              title="Click to copy individual hashtag"
            >
              {hashtag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex space-x-3 mt-4">
        <button 
          onClick={onCopy}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy All Hashtags
        </button>
        <button 
          onClick={onClear}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
)

export default function AIToolsPanel({ onClose }: AIToolsPanelProps) {
  const [activeTool, setActiveTool] = useState('script')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [showApiKeyNotice, setShowApiKeyNotice] = useState(!import.meta.env.VITE_GEMINI_API_KEY)

  // Separate result states for each tool
  const [scriptResult, setScriptResult] = useState<string>('')
  const [ideasResult, setIdeasResult] = useState<string[]>([])
  const [hashtagsResult, setHashtagsResult] = useState<string[]>([])

  // Script Generation State
  const [scriptParams, setScriptParams] = useState<ScriptGenerationParams>({
    contentType: 'Product Review',
    duration: '2 minutes',
    product: '',
    brand: '',
    targetAudience: 'General audience',
    tone: 'Engaging and professional'
  })

  // Content Ideas State
  const [ideaParams, setIdeaParams] = useState<ContentIdeaParams>({
    niche: '',
    platform: 'Instagram',
    contentType: 'Video'
  })

  // Hashtag Generation State
  const [hashtagParams, setHashtagParams] = useState<HashtagParams>({
    content: '',
    platform: 'Instagram',
    count: 10
  })

  // Content Analysis State
  const [contentToAnalyze, setContentToAnalyze] = useState('')
  const [analysisResult, setAnalysisResult] = useState<{
    sentiment: string
    engagement: string
    suggestions: string[]
  } | null>(null)

  const tools = [
    { id: 'script', name: 'Script Generator', icon: '🎬', description: 'Generate video scripts with AI' },
    { id: 'ideas', name: 'Content Ideas', icon: '💡', description: 'Get creative content suggestions' },
    { id: 'hashtags', name: 'Hashtag Generator', icon: '🏷️', description: 'Generate optimized hashtags' },
    { id: 'analyze', name: 'Content Analyzer', icon: '📊', description: 'Analyze content performance' }
  ]

  const handleScriptGeneration = async () => {
    if (!scriptParams.product || !scriptParams.brand) {
      setError('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    setError('')
    setScriptResult('')

    try {
      const generatedScript = await geminiService.generateScript(scriptParams)
      setScriptResult(generatedScript)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate script')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContentIdeas = async () => {
    if (!ideaParams.niche) {
      setError('Please enter your niche')
      return
    }

    setIsLoading(true)
    setError('')
    setIdeasResult([])

    try {
      const ideas = await geminiService.generateContentIdeas(ideaParams)
      setIdeasResult(ideas)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content ideas')
    } finally {
      setIsLoading(false)
    }
  }

  const handleHashtagGeneration = async () => {
    if (!hashtagParams.content) {
      setError('Please enter your content')
      return
    }

    setIsLoading(true)
    setError('')
    setHashtagsResult([])

    try {
      const hashtags = await geminiService.generateHashtags(hashtagParams)
      setHashtagsResult(hashtags)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate hashtags')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContentAnalysis = async () => {
    if (!contentToAnalyze) {
      setError('Please enter content to analyze')
      return
    }

    setIsLoading(true)
    setError('')
    setAnalysisResult(null)

    try {
      const analysis = await geminiService.analyzeContent(contentToAnalyze)
      setAnalysisResult(analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze content')
    } finally {
      setIsLoading(false)
    }
  }

  // Content Analysis Result Component
  const ContentAnalysisResult = ({ analysis, onClear }: { 
    analysis: { sentiment: string; engagement: string; suggestions: string[] }; 
    onClear: () => void 
  }) => (
    <div className="mt-6">
      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
        <span className="text-orange-600 mr-2">📊</span>
        Content Analysis Results
      </h4>
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200 shadow-sm">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg border border-orange-100">
            <h5 className="font-medium text-gray-900 mb-2 flex items-center">
              <span className="text-orange-600 mr-2">😊</span>
              Sentiment Analysis
            </h5>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              analysis.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
              analysis.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {analysis.sentiment.charAt(0).toUpperCase() + analysis.sentiment.slice(1)}
            </span>
          </div>
          <div className="bg-white p-4 rounded-lg border border-orange-100">
            <h5 className="font-medium text-gray-900 mb-2 flex items-center">
              <span className="text-orange-600 mr-2">📈</span>
              Engagement Potential
            </h5>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              analysis.engagement === 'high' ? 'bg-green-100 text-green-800' :
              analysis.engagement === 'low' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {analysis.engagement.charAt(0).toUpperCase() + analysis.engagement.slice(1)}
            </span>
          </div>
        </div>
        
        {analysis.suggestions && analysis.suggestions.length > 0 && (
          <div className="bg-white p-4 rounded-lg border border-orange-100">
            <h5 className="font-medium text-gray-900 mb-3 flex items-center">
              <span className="text-orange-600 mr-2">💡</span>
              Improvement Suggestions
            </h5>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-orange-500 text-sm mt-1">•</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex space-x-3 mt-4">
          <button 
            onClick={() => {
              const analysisText = `Sentiment: ${analysis.sentiment}\nEngagement: ${analysis.engagement}\n\nSuggestions:\n${analysis.suggestions.map(s => `• ${s}`).join('\n')}`
              navigator.clipboard.writeText(analysisText)
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Analysis
          </button>
          <button 
            onClick={onClear}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )

  const renderScriptGenerator = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">AI Script Generator</h3>
      <p className="text-sm text-gray-600">Generate professional scripts for your content</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
          <select 
            value={scriptParams.contentType}
            onChange={(e) => setScriptParams({...scriptParams, contentType: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Product Review</option>
            <option>Tutorial</option>
            <option>Lifestyle</option>
            <option>Story</option>
            <option>Vlog</option>
            <option>Educational</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <select 
            value={scriptParams.duration}
            onChange={(e) => setScriptParams({...scriptParams, duration: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>30 seconds</option>
            <option>1 minute</option>
            <option>2 minutes</option>
            <option>5 minutes</option>
            <option>10 minutes</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product/Brand *</label>
          <input
            type="text"
            value={scriptParams.product}
            onChange={(e) => setScriptParams({...scriptParams, product: e.target.value})}
            placeholder="e.g., TechFlow Smartphone"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
          <input
            type="text"
            value={scriptParams.brand}
            onChange={(e) => setScriptParams({...scriptParams, brand: e.target.value})}
            placeholder="e.g., TechFlow"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
          <input
            type="text"
            value={scriptParams.targetAudience}
            onChange={(e) => setScriptParams({...scriptParams, targetAudience: e.target.value})}
            placeholder="e.g., Tech enthusiasts aged 18-35"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
          <select 
            value={scriptParams.tone}
            onChange={(e) => setScriptParams({...scriptParams, tone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Engaging and professional</option>
            <option>Casual and friendly</option>
            <option>Educational and informative</option>
            <option>Entertaining and humorous</option>
            <option>Inspirational and motivational</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleScriptGeneration}
        disabled={isLoading}
        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Generating Script...' : 'Generate Script'}
      </button>
    </div>
  )

  const renderContentIdeas = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Content Ideas Generator</h3>
      <p className="text-sm text-gray-600">Get creative content suggestions for your niche</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Niche *</label>
        <input
          type="text"
          value={ideaParams.niche}
          onChange={(e) => setIdeaParams({...ideaParams, niche: e.target.value})}
          placeholder="e.g., Fitness, Tech, Fashion, Cooking"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
          <select 
            value={ideaParams.platform}
            onChange={(e) => setIdeaParams({...ideaParams, platform: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Instagram</option>
            <option>YouTube</option>
            <option>TikTok</option>
            <option>Twitter</option>
            <option>LinkedIn</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
          <select 
            value={ideaParams.contentType}
            onChange={(e) => setIdeaParams({...ideaParams, contentType: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Video</option>
            <option>Post</option>
            <option>Story</option>
            <option>Reel</option>
            <option>Article</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleContentIdeas}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Generating Ideas...' : 'Generate Content Ideas'}
      </button>
    </div>
  )

  const renderHashtagGenerator = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Hashtag Generator</h3>
      <p className="text-sm text-gray-600">Generate optimized hashtags for your content</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Content *</label>
        <textarea
          value={hashtagParams.content}
          onChange={(e) => setHashtagParams({...hashtagParams, content: e.target.value})}
          placeholder="Describe your content or paste your caption..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
          <select 
            value={hashtagParams.platform}
            onChange={(e) => setHashtagParams({...hashtagParams, platform: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Instagram</option>
            <option>TikTok</option>
            <option>Twitter</option>
            <option>LinkedIn</option>
            <option>YouTube</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Hashtags</label>
          <select 
            value={hashtagParams.count}
            onChange={(e) => setHashtagParams({...hashtagParams, count: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={5}>5 hashtags</option>
            <option value={10}>10 hashtags</option>
            <option value={15}>15 hashtags</option>
            <option value={20}>20 hashtags</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleHashtagGeneration}
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Generating Hashtags...' : 'Generate Hashtags'}
      </button>
    </div>
  )

  const renderContentAnalyzer = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Content Analyzer</h3>
      <p className="text-sm text-gray-600">Analyze your content for engagement and improvement</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content to Analyze *</label>
        <textarea
          value={contentToAnalyze}
          onChange={(e) => setContentToAnalyze(e.target.value)}
          placeholder="Paste your content, caption, or script here..."
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        onClick={handleContentAnalysis}
        disabled={isLoading}
        className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Analyzing Content...' : 'Analyze Content'}
      </button>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Content Tools</h2>
            <p className="text-sm text-gray-600">Powered by Google Gemini AI</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* API Key Notice */}
          {showApiKeyNotice && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-yellow-800">Demo Mode Active</h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    Add your Gemini API key to enable real AI-powered features. 
                    <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-medium underline ml-1">
                      Get API Key
                    </a>
                  </p>
                </div>
                <button
                  onClick={() => setShowApiKeyNotice(false)}
                  className="text-yellow-400 hover:text-yellow-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Sidebar */}
          <div className="w-64 bg-gray-50 p-4 border-r border-gray-200">
            <nav className="space-y-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTool === tool.id
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{tool.icon}</span>
                    <div>
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-xs text-gray-500">{tool.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl">
              {activeTool === 'script' && renderScriptGenerator()}
              {activeTool === 'ideas' && renderContentIdeas()}
              {activeTool === 'hashtags' && renderHashtagGenerator()}
              {activeTool === 'analyze' && renderContentAnalyzer()}

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {activeTool === 'script' && scriptResult && <ScriptResult script={scriptResult} onCopy={() => navigator.clipboard.writeText(scriptResult)} onClear={() => setScriptResult('')} />}
              {activeTool === 'ideas' && ideasResult.length > 0 && <ContentIdeasResult ideas={ideasResult} onCopy={() => navigator.clipboard.writeText(ideasResult.join('\n\n'))} onClear={() => setIdeasResult([])} />}
              {activeTool === 'hashtags' && hashtagsResult.length > 0 && <HashtagResult hashtags={hashtagsResult} onCopy={() => navigator.clipboard.writeText(hashtagsResult.join(' '))} onClear={() => setHashtagsResult([])} />}
              {activeTool === 'analyze' && analysisResult && <ContentAnalysisResult analysis={analysisResult} onClear={() => setAnalysisResult(null)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
