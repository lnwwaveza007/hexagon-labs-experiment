import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export interface ScriptGenerationParams {
  contentType: string
  duration: string
  product: string
  brand: string
  targetAudience?: string
  tone?: string
}

export interface ContentIdeaParams {
  niche: string
  platform: string
  contentType: string
}

export interface HashtagParams {
  content: string
  platform: string
  count?: number
}

export class GeminiService {
  private model = genAI?.getGenerativeModel({ model: 'gemini-2.0-flash' })

  async generateScript(params: ScriptGenerationParams): Promise<string> {
    try {
      if (!this.model) {
        // Demo mode - return a sample script
        return this.generateDemoScript(params)
      }

      const prompt = `Create a professional content script for a ${params.contentType} video that is ${params.duration} long.
      
Product/Brand: ${params.product}
Brand: ${params.brand}
Target Audience: ${params.targetAudience || 'General audience'}
Tone: ${params.tone || 'Engaging and professional'}

Please structure the script with:
1. Hook/Intro (10-15 seconds)
2. Main content with key points
3. Demonstration or explanation
4. Call to action
5. Outro

Make it engaging, authentic, and optimized for social media. Include timing suggestions and natural speaking patterns.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error generating script:', error)
      throw new Error('Failed to generate script. Please try again.')
    }
  }

  private generateDemoScript(params: ScriptGenerationParams): string {
    return `🎬 AI-GENERATED SCRIPT (DEMO MODE)

INTRO (0-15 seconds):
"Hey everyone! Welcome back to my channel. Today I'm super excited to share this amazing ${params.product} with you. If you're looking for ${params.contentType.toLowerCase()} content, you're in the right place!"

MAIN CONTENT (15-45 seconds):
"Let me tell you what makes ${params.brand} stand out from the competition. First, the quality is absolutely incredible. I've been testing this for the past week, and I'm genuinely impressed.

The features are exactly what you'd expect from a premium brand like ${params.brand}. From the design to the functionality, everything has been thoughtfully crafted."

DEMONSTRATION (45-90 seconds):
"Here's how it works in real life... [Demonstrate key features]

As you can see, it's incredibly user-friendly and the results speak for themselves. I love how ${params.brand} has focused on making this accessible to everyone."

CALL TO ACTION (90-105 seconds):
"Don't forget to check out the link in my bio and use code CREATOR20 for 20% off your first purchase! This is a limited-time offer, so make sure to grab yours before it's gone."

OUTRO (105-120 seconds):
"Thanks for watching! Make sure to like and subscribe for more ${params.contentType.toLowerCase()} content like this. Drop a comment below if you've tried ${params.brand} products before!"

---
Note: This is a demo script. Add your Gemini API key to generate real AI-powered scripts!`
  }

  async generateContentIdeas(params: ContentIdeaParams): Promise<string[]> {
    try {
      if (!this.model) {
        // Demo mode - return sample ideas
        return this.generateDemoContentIdeas(params)
      }

      const prompt = `Generate 5 creative content ideas for a ${params.niche} creator on ${params.platform}.
      
Content Type: ${params.contentType}
Platform: ${params.platform}
Niche: ${params.niche}

Please provide:
1. Engaging title/headline
2. Brief description of the content
3. Key talking points or angles
4. Estimated engagement potential

Format each idea as a numbered list with clear sections.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Parse the response into individual ideas
      return text.split(/\d+\./).filter(idea => idea.trim()).map(idea => idea.trim())
    } catch (error) {
      console.error('Error generating content ideas:', error)
      throw new Error('Failed to generate content ideas. Please try again.')
    }
  }

  private generateDemoContentIdeas(params: ContentIdeaParams): string[] {
    return [
      `"The Ultimate ${params.niche} Guide for Beginners" - Perfect for newcomers to ${params.niche}, this comprehensive guide covers all the basics. Key points: essential tools, common mistakes to avoid, step-by-step process. High engagement potential.`,
      `"5 ${params.niche} Hacks That Will Change Your Life" - Share insider tips and tricks that most people don't know about. Key points: practical applications, time-saving techniques, expert insights. Viral potential.`,
      `"A Day in the Life of a ${params.niche} Enthusiast" - Behind-the-scenes look at your daily routine and workflow. Key points: morning routine, tools used, challenges faced, achievements. Relatable content.`,
      `"${params.niche} Trends to Watch in 2024" - Stay ahead of the curve with upcoming trends and innovations. Key points: emerging technologies, market predictions, actionable insights. Authority building.`,
      `"Common ${params.niche} Mistakes and How to Fix Them" - Help your audience avoid pitfalls and improve their skills. Key points: real examples, practical solutions, prevention tips. Educational value.`
    ]
  }

  async generateHashtags(params: HashtagParams): Promise<string[]> {
    try {
      if (!this.model) {
        // Demo mode - return sample hashtags
        return this.generateDemoHashtags(params)
      }

      const prompt = `Generate ${params.count || 10} relevant hashtags for this content on ${params.platform}:
      
Content: ${params.content}
Platform: ${params.platform}

Please provide:
- Mix of popular and niche hashtags
- Platform-specific optimization
- Relevant trending hashtags
- Brand-friendly options

Return only the hashtags separated by spaces, starting with #.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Extract hashtags from the response
      const hashtags = text.match(/#\w+/g) || []
      return hashtags.slice(0, params.count || 10)
    } catch (error) {
      console.error('Error generating hashtags:', error)
      throw new Error('Failed to generate hashtags. Please try again.')
    }
  }

  private generateDemoHashtags(params: HashtagParams): string[] {
    const platformHashtags: Record<string, string[]> = {
      'Instagram': ['#instagram', '#instagood', '#photooftheday', '#love', '#fashion'],
      'TikTok': ['#tiktok', '#fyp', '#foryou', '#viral', '#trending'],
      'Twitter': ['#twitter', '#tweeting', '#socialmedia', '#digital', '#content'],
      'LinkedIn': ['#linkedin', '#professional', '#business', '#networking', '#career'],
      'YouTube': ['#youtube', '#youtuber', '#video', '#content', '#creator']
    }
    
    const baseHashtags = platformHashtags[params.platform] || platformHashtags['Instagram']
    const contentHashtags = ['#content', '#creator', '#socialmedia', '#digital', '#trending']
    
    return [...baseHashtags, ...contentHashtags].slice(0, params.count || 10)
  }

  async analyzeContent(content: string): Promise<{
    sentiment: string
    engagement: string
    suggestions: string[]
  }> {
    try {
      if (!this.model) {
        // Demo mode - return sample analysis
        return this.generateDemoAnalysis(content)
      }

      const prompt = `Analyze this content for a social media creator:
      
Content: ${content}

Please provide:
1. Sentiment analysis (positive, neutral, negative)
2. Engagement potential (high, medium, low)
3. 3 specific suggestions for improvement
4. Best posting time recommendations
5. Target audience insights

Format as a structured analysis.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Parse the analysis (simplified parsing)
      return {
        sentiment: text.includes('positive') ? 'positive' : text.includes('negative') ? 'negative' : 'neutral',
        engagement: text.includes('high') ? 'high' : text.includes('low') ? 'low' : 'medium',
        suggestions: text.split('\n').filter(line => line.includes('•') || line.includes('-')).map(s => s.replace(/^[•\-\s]+/, ''))
      }
    } catch (error) {
      console.error('Error analyzing content:', error)
      throw new Error('Failed to analyze content. Please try again.')
    }
  }

  private generateDemoAnalysis(content: string): {
    sentiment: string
    engagement: string
    suggestions: string[]
  } {
    const wordCount = content.split(' ').length
    const hasEmojis = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(content)
    
    return {
      sentiment: wordCount > 50 ? 'positive' : 'neutral',
      engagement: hasEmojis ? 'high' : 'medium',
      suggestions: [
        'Add more emojis to increase engagement',
        'Include a call-to-action to encourage interaction',
        'Consider adding relevant hashtags for better discoverability'
      ]
    }
  }
}

export const geminiService = new GeminiService()
