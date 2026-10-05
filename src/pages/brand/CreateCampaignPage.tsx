import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Target,
  Users,
  Calendar,
  IndianRupee,
  Lightbulb,
  Eye,
  Heart,
  Share2,
  Download,
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CreateCampaignPage = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Campaign Basics
    name: '',
    type: '',
    description: '',
    objectives: [],
    
    // Step 2: Target & Budget
    targetAudience: {
      ageRange: [18, 35],
      gender: [],
      locations: [],
      interests: []
    },
    creatorPreferences: {
      followerRange: [10000, 100000],
      categories: [],
      languages: []
    },
    budget: {
      total: '',
      perCreator: '',
      creatorCount: ''
    },
    
    // Step 3: Content Guidelines
    contentRequirements: '',
    dos: '',
    donts: '',
    hashtags: [],
    mentions: [],
    
    // Step 4: AI Matching
    useAI: true,
    aiCriteria: {
      engagement: 70,
      audienceMatch: 80,
      performance: 60,
      quality: 75
    },
    autoApprove: 80,
    
    // Step 5: Timeline
    startDate: '',
    endDate: '',
    applicationDeadline: '',
    submissionDeadline: '',
    postingSchedule: []
  });

  const steps = [
    { id: 1, name: 'Campaign Basics', icon: Target },
    { id: 2, name: 'Target & Budget', icon: Users },
    { id: 3, name: 'Content Guidelines', icon: Lightbulb },
    { id: 4, name: 'AI Matching', icon: Sparkles },
    { id: 5, name: 'Timeline', icon: Calendar },
    { id: 6, name: 'Review & Launch', icon: Eye }
  ];

  const campaignTypes = [
    {
      id: 'single_post',
      name: 'Single Post',
      description: 'One Instagram/Facebook post',
      icon: '📷'
    },
    {
      id: 'multiple_posts',
      name: 'Multiple Posts',
      description: '2-5 posts across platforms',
      icon: '📱'
    },
    {
      id: 'story',
      name: 'Stories',
      description: 'Instagram/Facebook stories',
      icon: '📖'
    },
    {
      id: 'reel',
      name: 'Reels',
      description: 'Short-form video content',
      icon: '🎬'
    },
    {
      id: 'video',
      name: 'Video Content',
      description: 'YouTube videos or IGTV',
      icon: '🎥'
    },
    {
      id: 'ugc',
      name: 'User Generated Content',
      description: 'Authentic user content',
      icon: '👥'
    }
  ];

  const objectives = [
    'Brand Awareness',
    'Engagement',
    'Website Traffic',
    'Lead Generation',
    'Sales & Conversions',
    'App Downloads'
  ];

  const categories = [
    'Fashion & Beauty',
    'Lifestyle',
    'Food & Beverage',
    'Technology',
    'Travel',
    'Fitness & Health',
    'Entertainment',
    'Gaming',
    'Education',
    'Business'
  ];

  const languages = [
    'English',
    'Hindi',
    'Marathi',
    'Bengali',
    'Tamil',
    'Telugu',
    'Gujarati',
    'Kannada'
  ];

  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow'
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

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Campaign Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter campaign name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Campaign Type *</label>
              <div className="grid md:grid-cols-3 gap-4">
                {campaignTypes.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleChange('type', type.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.type === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <h3 className="font-semibold text-gray-900">{type.name}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Campaign Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe your campaign goals and requirements..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Campaign Objectives *</label>
              <div className="grid md:grid-cols-3 gap-3">
                {objectives.map(objective => (
                  <label
                    key={objective}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.objectives.includes(objective)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.objectives.includes(objective)}
                      onChange={() => handleArrayToggle('objectives', objective)}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm font-medium">{objective}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Target Audience */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Audience</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age Range: {formData.targetAudience.ageRange[0]} - {formData.targetAudience.ageRange[1]} years
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="13"
                        max="65"
                        value={formData.targetAudience.ageRange[0]}
                        onChange={(e) => handleChange('targetAudience.ageRange', [parseInt(e.target.value), formData.targetAudience.ageRange[1]])}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="13"
                        max="65"
                        value={formData.targetAudience.ageRange[1]}
                        onChange={(e) => handleChange('targetAudience.ageRange', [formData.targetAudience.ageRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <div className="flex gap-4">
                      {['Male', 'Female', 'All'].map(gender => (
                        <label key={gender} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.targetAudience.gender.includes(gender)}
                            onChange={() => {
                              const currentGender = formData.targetAudience.gender;
                              if (gender === 'All') {
                                handleChange('targetAudience.gender', gender === 'All' && currentGender.length === 0 ? ['All'] : []);
                              } else {
                                handleChange('targetAudience.gender', 
                                  currentGender.includes(gender)
                                    ? currentGender.filter(g => g !== gender)
                                    : [...currentGender.filter(g => g !== 'All'), gender]
                                );
                              }
                            }}
                            className="text-blue-600 focus:ring-blue-500 rounded"
                          />
                          <span className="text-sm">{gender}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Cities</label>
                    <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-2">
                        {cities.map(city => (
                          <label key={city} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.targetAudience.locations.includes(city)}
                              onChange={() => {
                                const currentLocations = formData.targetAudience.locations;
                                handleChange('targetAudience.locations',
                                  currentLocations.includes(city)
                                    ? currentLocations.filter(l => l !== city)
                                    : [...currentLocations, city]
                                );
                              }}
                              className="text-blue-600 focus:ring-blue-500 rounded"
                            />
                            <span className="text-sm">{city}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Creator Preferences */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Creator Preferences</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Follower Range: {formData.creatorPreferences.followerRange[0].toLocaleString()} - {formData.creatorPreferences.followerRange[1].toLocaleString()}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1000"
                        max="1000000"
                        step="1000"
                        value={formData.creatorPreferences.followerRange[0]}
                        onChange={(e) => handleChange('creatorPreferences.followerRange', [parseInt(e.target.value), formData.creatorPreferences.followerRange[1]])}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="1000"
                        max="1000000"
                        step="1000"
                        value={formData.creatorPreferences.followerRange[1]}
                        onChange={(e) => handleChange('creatorPreferences.followerRange', [formData.creatorPreferences.followerRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Categories</label>
                    <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      <div className="grid gap-2">
                        {categories.map(category => (
                          <label key={category} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.creatorPreferences.categories.includes(category)}
                              onChange={() => {
                                const currentCategories = formData.creatorPreferences.categories;
                                handleChange('creatorPreferences.categories',
                                  currentCategories.includes(category)
                                    ? currentCategories.filter(c => c !== category)
                                    : [...currentCategories, category]
                                );
                              }}
                              className="text-blue-600 focus:ring-blue-500 rounded"
                            />
                            <span className="text-sm">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    <div className="grid grid-cols-2 gap-2">
                      {languages.map(language => (
                        <label key={language} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.creatorPreferences.languages.includes(language)}
                            onChange={() => {
                              const currentLanguages = formData.creatorPreferences.languages;
                              handleChange('creatorPreferences.languages',
                                currentLanguages.includes(language)
                                  ? currentLanguages.filter(l => l !== language)
                                  : [...currentLanguages, language]
                              );
                            }}
                            className="text-blue-600 focus:ring-blue-500 rounded"
                          />
                          <span className="text-sm">{language}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Section */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Allocation</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget (₹) *</label>
                  <input
                    type="number"
                    value={formData.budget.total}
                    onChange={(e) => handleChange('budget.total', e.target.value)}
                    placeholder="500000"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Per Creator Budget (₹)</label>
                  <input
                    type="number"
                    value={formData.budget.perCreator}
                    onChange={(e) => handleChange('budget.perCreator', e.target.value)}
                    placeholder="25000"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Creators</label>
                  <input
                    type="number"
                    value={formData.budget.creatorCount}
                    onChange={(e) => handleChange('budget.creatorCount', e.target.value)}
                    placeholder="20"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {formData.budget.total && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Budget Breakdown:</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Creator Payments:</span>
                      <span className="font-medium ml-2">₹{(formData.budget.total * 0.85).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Platform Fee (15%):</span>
                      <span className="font-medium ml-2">₹{(formData.budget.total * 0.15).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Est. Reach:</span>
                      <span className="font-medium ml-2">2.5M+ users</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Campaign</h3>
              <p className="text-gray-600">Double-check everything before launching</p>
            </div>

            {/* Campaign Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Campaign Overview</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Basic Information</h5>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Name:</span> {formData.name}</p>
                    <p><span className="text-gray-600">Type:</span> {campaignTypes.find(t => t.id === formData.type)?.name}</p>
                    <p><span className="text-gray-600">Objectives:</span> {formData.objectives.join(', ')}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Budget & Scale</h5>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Total Budget:</span> ₹{formData.budget.total}</p>
                    <p><span className="text-gray-600">Per Creator:</span> ₹{formData.budget.perCreator}</p>
                    <p><span className="text-gray-600">Target Creators:</span> {formData.budget.creatorCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Predictions */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                AI Performance Predictions
              </h4>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">2.8M</span>
                  </div>
                  <p className="text-sm text-gray-600">Estimated Reach</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Heart className="w-4 h-4 text-pink-600" />
                    <span className="text-2xl font-bold text-gray-900">4.2%</span>
                  </div>
                  <p className="text-sm text-gray-600">Avg Engagement</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Share2 className="w-4 h-4 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">850</span>
                  </div>
                  <p className="text-sm text-gray-600">Expected Shares</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span className="text-2xl font-bold text-gray-900">12%</span>
                  </div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 text-blue-600 focus:ring-blue-500 rounded"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <Link to="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link> and 
                  confirm that all campaign content complies with platform policies and applicable laws.
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return <div>Step {currentStep} content goes here...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/brand/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create AI-Powered Campaign</h1>
          <p className="text-gray-600">Let AI find the perfect creators for your brand</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
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
              Step {currentStep}: {steps.find(s => s.id === currentStep)?.name}
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
              onClick={currentStep === 6 ? () => console.log('Launch campaign') : nextStep}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              {currentStep === 6 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Launch Campaign
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

export default CreateCampaignPage;