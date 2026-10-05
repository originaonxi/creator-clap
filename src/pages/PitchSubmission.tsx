import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Lightbulb,
  Upload,
  Shield,
  Sparkles,
  CheckCircle,
  AlertCircle,
  FileText,
  Video,
  Image,
  Music,
  Film,
  Camera,
  Users,
  Calendar,
  IndianRupee,
  Target,
  TrendingUp,
  Award,
  Eye,
  Heart,
  Share2,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const PitchSubmission = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    tagline: '',
    contentType: '',
    genre: [],
    targetAudience: {
      ageRange: [18, 35],
      gender: [],
      interests: []
    },
    language: '',
    
    // The Pitch
    oneLiner: '',
    synopsis: '',
    whyNow: '',
    uniquePoints: [],
    comparables: '',
    
    // Production Plan
    estimatedBudget: 500000,
    timeline: 30,
    crewNeeds: {
      director: 'self',
      cinematographer: '',
      editor: '',
      composer: ''
    },
    locations: '',
    specialRequirements: '',
    
    // Commercial Plan
    revenueModel: [],
    distributionStrategy: '',
    marketingIdeas: '',
    brandOpportunities: '',
    
    // Files
    script: null,
    moodBoard: null,
    sampleWork: []
  });

  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const contentTypes = [
    {
      id: 'music_video',
      name: 'Music Video',
      icon: Music,
      budget: '₹5L - ₹50L',
      timeline: '2-4 weeks',
      description: 'Professional music video production with top-tier equipment and crew'
    },
    {
      id: 'short_film',
      name: 'Short Film',
      icon: Film,
      budget: '₹10L - ₹1Cr',
      timeline: '4-8 weeks',
      description: 'Complete short film production from script to screen'
    },
    {
      id: 'web_series',
      name: 'Web Series Pilot',
      icon: Video,
      budget: '₹50L - ₹5Cr',
      timeline: '8-16 weeks',
      description: 'Multi-episode series pilot with full production support'
    },
    {
      id: 'documentary',
      name: 'Documentary',
      icon: Camera,
      budget: '₹20L - ₹2Cr',
      timeline: '6-12 weeks',
      description: 'In-depth documentary production with research support'
    }
  ];

  const genres = [
    'Drama', 'Comedy', 'Action', 'Romance', 'Thriller', 'Horror',
    'Sci-Fi', 'Fantasy', 'Documentary', 'Musical', 'Animation', 'Experimental'
  ];

  const languages = [
    'Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi',
    'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
  ];

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = {
        overallScore: Math.floor(Math.random() * 20) + 80, // 80-100
        components: {
          marketPotential: Math.floor(Math.random() * 20) + 75,
          originality: Math.floor(Math.random() * 20) + 80,
          feasibility: Math.floor(Math.random() * 20) + 85,
          audienceAppeal: Math.floor(Math.random() * 20) + 78
        },
        estimatedViewership: `${(Math.random() * 5 + 1).toFixed(1)}M - ${(Math.random() * 10 + 5).toFixed(1)}M`,
        revenueProjection: `₹${(Math.random() * 50 + 25).toFixed(0)}L - ₹${(Math.random() * 100 + 75).toFixed(0)}L`,
        suggestions: [
          'Consider adding more regional elements to increase local appeal',
          'The concept has strong viral potential - focus on shareable moments',
          'Budget allocation looks realistic for the proposed scope'
        ],
        competitorAnalysis: [
          'Similar content performed 23% above average in last 6 months',
          'Your target demographic shows 45% higher engagement with this genre',
          'Optimal release window: March-May for maximum impact'
        ]
      };
      
      setAiAnalysis(analysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep === 2 && !aiAnalysis && formData.synopsis.length > 100) {
      runAIAnalysis();
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addNotification({
        type: 'success',
        title: 'Pitch Submitted Successfully!',
        message: 'Your idea is now protected and under review. Voting opens in 24 hours.'
      });
      
      navigate('/creator/dashboard');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: 'Please try again or contact support.'
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Your Project</h3>
              <p className="text-gray-600">Every great story starts with a great idea. Let's capture yours.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Mumbai Dreams, The Last Chai, Tech Talks"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tagline *
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="A story of dreams, ambition, and the city that never sleeps"
                maxLength={100}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.tagline.length}/100
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Content Type *
              </label>
              <p className="text-sm text-gray-600 mb-4">Choose the format that best fits your vision</p>
              <div className="grid md:grid-cols-2 gap-4">
                {contentTypes.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleChange('contentType', type.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                      formData.contentType === type.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <type.icon className="w-6 h-6 text-purple-600" />
                      <h3 className="font-semibold text-gray-900">{type.name}</h3>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {type.budget} • {type.timeline}
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Genre *
                </label>
                <p className="text-sm text-gray-600 mb-3">Select all that apply to your content</p>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {genres.map(genre => (
                      <label key={genre} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.genre.includes(genre)}
                          onChange={() => handleArrayToggle('genre', genre)}
                          className="text-purple-600 focus:ring-purple-500 rounded"
                        />
                        <span className="text-sm text-gray-700">{genre}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Primary Language *
                </label>
                <p className="text-sm text-gray-600 mb-3">What language will your content be in?</p>
                <select
                  value={formData.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select language</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-purple-900">Pro Tip</h4>
                  <p className="text-sm text-purple-700">
                    Great titles are memorable and hint at the story. Think "3 Idiots" or "Zindagi Na Milegi Dobara"
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Story Matters</h3>
              <p className="text-gray-600">Help us understand your vision and why it deserves to be made</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                One-Line Pitch * (200 characters max)
              </label>
              <p className="text-sm text-gray-600 mb-3">If you had to describe your story in one sentence, what would it be?</p>
              <textarea
                value={formData.oneLiner}
                onChange={(e) => handleChange('oneLiner', e.target.value)}
                placeholder="A young musician from the slums of Mumbai fights against all odds to make it big in Bollywood, discovering that success comes with a price he never expected to pay."
                maxLength={200}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.oneLiner.length}/200
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Synopsis * (500-2000 words)
              </label>
              <p className="text-sm text-gray-600 mb-3">Tell us the complete story - beginning, middle, and end</p>
              <textarea
                value={formData.synopsis}
                onChange={(e) => handleChange('synopsis', e.target.value)}
                placeholder="Start with your main character and their world. What's their goal? What obstacles do they face? How do they change by the end? Include key scenes, emotional moments, and what makes your story unique..."
                rows={12}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.synopsis.split(' ').filter(word => word.length > 0).length} words
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Why This? Why Now? *
              </label>
              <p className="text-sm text-gray-600 mb-3">What makes this story relevant and timely?</p>
              <textarea
                value={formData.whyNow}
                onChange={(e) => handleChange('whyNow', e.target.value)}
                placeholder="With the rise of social media and the creator economy, stories about digital dreams and virtual success are more relevant than ever. This story explores how technology changes our relationships and what it means to be authentic in a filtered world..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Comparable Success Stories
              </label>
              <p className="text-sm text-gray-600 mb-3">What similar content has succeeded? How is yours different?</p>
              <textarea
                value={formData.comparables}
                onChange={(e) => handleChange('comparables', e.target.value)}
                placeholder="Like 'Gully Boy' but focused on the digital music scene rather than street rap. Similar to 'The Social Dilemma' but as a narrative story rather than documentary. Combines the authenticity of 'Scam 1992' with the youth appeal of 'Mismatched'..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* AI Analysis Results */}
            {isAnalyzing && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600 animate-spin" />
                  <h3 className="text-lg font-semibold text-gray-900">AI Analysis in Progress...</h3>
                </div>
                <p className="text-gray-600">
                  Our AI is analyzing your pitch for market potential, originality, and success probability.
                </p>
                <div className="mt-4 bg-white/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                    Analyzing story structure and character development...
                  </div>
                </div>
              </div>
            )}

            {aiAnalysis && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">AI Analysis Complete</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Overall Score</h4>
                    <div className="text-4xl font-bold text-green-600 mb-2">{aiAnalysis.overallScore}/100</div>
                    <div className="text-sm text-gray-600">
                      {aiAnalysis.overallScore >= 85 ? 'Excellent potential for success' :
                       aiAnalysis.overallScore >= 70 ? 'Good potential with some improvements' :
                       aiAnalysis.overallScore >= 55 ? 'Moderate potential, needs refinement' :
                       'Needs significant improvements'}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Projections</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Estimated Views:</span>
                        <span className="font-semibold ml-2">{aiAnalysis.estimatedViewership}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Revenue Potential:</span>
                        <span className="font-semibold ml-2">{aiAnalysis.revenueProjection}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  {Object.entries(aiAnalysis.components).map(([key, score]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{score}</div>
                      <div className="text-xs text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">AI Recommendations</h4>
                  <ul className="space-y-2">
                    {aiAnalysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Writing Tips */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-900">Writing Tips</h4>
                  <p className="text-sm text-blue-700">
                    Focus on character goals, conflicts, and transformation. Show don't tell. Make us care about your protagonist.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Production Planning</h3>
              <p className="text-gray-600">Help us understand what you need to bring your vision to life</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Estimated Budget * (₹)
                </label>
                <p className="text-sm text-gray-600 mb-3">What do you think it will cost to produce your content?</p>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="500000"
                    max="50000000"
                    step="100000"
                    value={formData.estimatedBudget}
                    onChange={(e) => handleChange('estimatedBudget', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-purple-600">
                      ₹{(formData.estimatedBudget / 100000).toFixed(1)}L
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {formData.estimatedBudget <= 1000000 ? 'Micro Budget' :
                       formData.estimatedBudget <= 5000000 ? 'Low Budget' :
                       formData.estimatedBudget <= 20000000 ? 'Medium Budget' :
                       'High Budget'}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Production Timeline * (days)
                </label>
                <p className="text-sm text-gray-600 mb-3">How long do you think production will take?</p>
                <input
                  type="number"
                  value={formData.timeline}
                  onChange={(e) => handleChange('timeline', parseInt(e.target.value))}
                  min="7"
                  max="365"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.timeline <= 14 ? 'Quick turnaround' :
                   formData.timeline <= 30 ? 'Standard timeline' :
                   formData.timeline <= 60 ? 'Extended production' :
                   'Long-form project'}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Key Crew Requirements
              </label>
              <p className="text-sm text-gray-600 mb-4">Tell us about the team you need</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Director</label>
                  <select
                    value={formData.crewNeeds.director}
                    onChange={(e) => handleChange('crewNeeds.director', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="self">I'll direct myself</option>
                    <option value="need_hiring">Need to hire director</option>
                    <option value="have_someone">I have someone in mind</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Cinematographer</label>
                  <select
                    value={formData.crewNeeds.cinematographer}
                    onChange={(e) => handleChange('crewNeeds.cinematographer', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select from Creator Clap marketplace</option>
                    <option value="premium">Premium (₹15K+/day)</option>
                    <option value="standard">Standard (₹8K-15K/day)</option>
                    <option value="budget">Budget (₹3K-8K/day)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Editor</label>
                  <select
                    value={formData.crewNeeds.editor}
                    onChange={(e) => handleChange('crewNeeds.editor', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select from Creator Clap marketplace</option>
                    <option value="premium">Premium (₹10K+/day)</option>
                    <option value="standard">Standard (₹5K-10K/day)</option>
                    <option value="budget">Budget (₹2K-5K/day)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Music Composer</label>
                  <select
                    value={formData.crewNeeds.composer}
                    onChange={(e) => handleChange('crewNeeds.composer', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Not needed</option>
                    <option value="original">Need original music</option>
                    <option value="licensed">Will use licensed music</option>
                    <option value="have_composer">I have a composer</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Locations Needed
              </label>
              <p className="text-sm text-gray-600 mb-3">Describe the locations you need for your shoot</p>
              <textarea
                value={formData.locations}
                onChange={(e) => handleChange('locations', e.target.value)}
                placeholder="Urban rooftop for opening scene, cozy cafe for dialogue scenes, recording studio for music sequences, busy Mumbai street for chase scene..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Special Requirements
              </label>
              <p className="text-sm text-gray-600 mb-3">Any special equipment, VFX, or unique needs?</p>
              <textarea
                value={formData.specialRequirements}
                onChange={(e) => handleChange('specialRequirements', e.target.value)}
                placeholder="Drone shots for aerial views, green screen for fantasy sequences, professional lighting for night scenes, special makeup for character transformation..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Budget Breakdown Preview */}
            {formData.estimatedBudget > 0 && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Estimated Budget Breakdown</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Crew (40%)</span>
                      <span className="font-medium">₹{Math.round(formData.estimatedBudget * 0.4 / 100000 * 100) / 100}L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Equipment (25%)</span>
                      <span className="font-medium">₹{Math.round(formData.estimatedBudget * 0.25 / 100000 * 100) / 100}L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Locations (15%)</span>
                      <span className="font-medium">₹{Math.round(formData.estimatedBudget * 0.15 / 100000 * 100) / 100}L</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Post-production (15%)</span>
                      <span className="font-medium">₹{Math.round(formData.estimatedBudget * 0.15 / 100000 * 100) / 100}L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contingency (5%)</span>
                      <span className="font-medium">₹{Math.round(formData.estimatedBudget * 0.05 / 100000 * 100) / 100}L</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Commercial Strategy</h3>
              <p className="text-gray-600">How will your content make money and reach audiences?</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Revenue Model *
              </label>
              <p className="text-sm text-gray-600 mb-4">Select all revenue streams that apply to your content</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Ad-supported streaming',
                  'Subscription revenue share',
                  'Licensing to other platforms',
                  'Merchandise opportunities',
                  'Brand partnerships',
                  'International distribution'
                ].map(model => (
                  <label key={model} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.revenueModel.includes(model)}
                      onChange={() => handleArrayToggle('revenueModel', model)}
                      className="text-purple-600 focus:ring-purple-500 rounded"
                    />
                    <span className="text-sm text-gray-700">{model}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Distribution Strategy
              </label>
              <p className="text-sm text-gray-600 mb-3">How do you plan to distribute your content after the CC TV exclusive period?</p>
              <textarea
                value={formData.distributionStrategy}
                onChange={(e) => handleChange('distributionStrategy', e.target.value)}
                placeholder="After 30-day CC TV exclusive, release on YouTube for wider reach, then license to Netflix/Amazon Prime for premium audience. Create shorter clips for Instagram and TikTok to drive viewership..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Marketing Ideas
              </label>
              <p className="text-sm text-gray-600 mb-3">How would you promote this content? What marketing angles do you see?</p>
              <textarea
                value={formData.marketingIdeas}
                onChange={(e) => handleChange('marketingIdeas', e.target.value)}
                placeholder="Behind-the-scenes content showing the real struggle, collaborate with music influencers for soundtrack promotion, create viral challenges related to the story theme, partner with music streaming platforms..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Brand Integration Opportunities
              </label>
              <p className="text-sm text-gray-600 mb-3">What brands could naturally fit into your content? Product placement ideas?</p>
              <textarea
                value={formData.brandOpportunities}
                onChange={(e) => handleChange('brandOpportunities', e.target.value)}
                placeholder="Music streaming apps as natural integration, smartphone brands for recording scenes, fashion brands for character styling, food delivery apps for lifestyle moments..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Revenue Projection */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Estimated Revenue Potential
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">₹{Math.round(formData.estimatedBudget * 1.5 / 100000)}L</div>
                  <div className="text-gray-600">Conservative</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">₹{Math.round(formData.estimatedBudget * 2.5 / 100000)}L</div>
                  <div className="text-gray-600">Realistic</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">₹{Math.round(formData.estimatedBudget * 4 / 100000)}L</div>
                  <div className="text-gray-600">Optimistic</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3 text-center">
                Based on similar content performance and your audience size
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Pitch</h3>
              <p className="text-gray-600">Double-check everything before submission</p>
            </div>

            {/* Pitch Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Pitch Overview</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Basic Information</h5>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Title:</span> {formData.title}</p>
                    <p><span className="text-gray-600">Type:</span> {contentTypes.find(t => t.id === formData.contentType)?.name}</p>
                    <p><span className="text-gray-600">Genre:</span> {formData.genre.join(', ')}</p>
                    <p><span className="text-gray-600">Language:</span> {formData.language}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Production Details</h5>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Budget:</span> ₹{(formData.estimatedBudget / 100000).toFixed(1)}L</p>
                    <p><span className="text-gray-600">Timeline:</span> {formData.timeline} days</p>
                    <p><span className="text-gray-600">Revenue Models:</span> {formData.revenueModel.length} selected</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="font-medium text-gray-900 mb-2">Tagline</h5>
                <p className="text-gray-700 italic">"{formData.tagline}"</p>
              </div>

              <div className="mt-6">
                <h5 className="font-medium text-gray-900 mb-2">One-Line Pitch</h5>
                <p className="text-gray-700">{formData.oneLiner}</p>
              </div>
            </div>

            {/* IP Protection */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-900">IP Protection Guarantee</h4>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <p>✓ Your idea will be blockchain-timestamped upon submission</p>
                <p>✓ You retain 100% intellectual property rights</p>
                <p>✓ Legal protection certificate will be generated</p>
                <p>✓ All submissions are confidential and secure</p>
              </div>
            </div>

            {/* Revenue Sharing */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue Sharing Terms</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-purple-600 mb-2">Year 1</h5>
                  <div className="text-3xl font-bold text-gray-900 mb-1">70%</div>
                  <div className="text-sm text-gray-600">Creator share of all revenue</div>
                </div>
                
                <div>
                  <h5 className="font-medium text-blue-600 mb-2">Year 2+</h5>
                  <div className="text-3xl font-bold text-gray-900 mb-1">80%</div>
                  <div className="text-sm text-gray-600">Creator share of all revenue</div>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span>AI analysis and initial review (24 hours)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span>Community voting opens (7 days)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span>Expert panel review (3 days)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <span>Selection results announced</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                  <span>Production begins (if selected)</span>
                </div>
              </div>
            </div>

            {/* Terms Acceptance */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 text-purple-600 focus:ring-purple-500 rounded"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I confirm that this is my original idea and I agree to the{' '}
                  <Link to="/terms" className="text-purple-600 hover:text-purple-700 underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-purple-600 hover:text-purple-700 underline">
                    Privacy Policy
                  </Link>. 
                  I understand that my submission will be reviewed by AI, community voting, and expert panel.
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to submit a pitch</p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/be-famous"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Be Famous</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Pitch</h1>
          <p className="text-gray-600">Turn your creative vision into funded reality</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { id: 1, name: 'Basic Info', icon: FileText },
              { id: 2, name: 'The Pitch', icon: Lightbulb },
              { id: 3, name: 'Production', icon: Camera },
              { id: 4, name: 'Commercial', icon: TrendingUp },
              { id: 5, name: 'Review', icon: CheckCircle }
            ].map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    currentStep >= step.id ? 'text-purple-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < 4 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Step {currentStep}: {
                currentStep === 1 ? 'Basic Information' :
                currentStep === 2 ? 'The Pitch' :
                currentStep === 3 ? 'Production Plan' :
                currentStep === 4 ? 'Commercial Plan' :
                'Review & Submit'
              }
            </h2>
          </div>

          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={currentStep === 5 ? handleSubmit : nextStep}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              {currentStep === 5 ? (
                <>
                  <Shield className="w-4 h-4" />
                  Submit Pitch
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchSubmission;