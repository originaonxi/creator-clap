import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Briefcase, 
  Rocket, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Sparkles,
  Lightbulb
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Creator Clap
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#for-creators" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                For Creators
              </a>
              <a href="#for-providers" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                For Service Providers
              </a>
              <a href="#for-brands" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                For Brands
              </a>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup/creator"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            India's First{' '}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Creator Economy Platform
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Hire professional crews in 24 hours. Match with perfect brands. 
            Automate everything with AI. The future of content creation is here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              to="/signup/creator"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Camera className="w-5 h-5" />
              I'm a Creator
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/signup/provider"
              className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-teal-200 hover:bg-teal-50 transition-all duration-300 flex items-center gap-2"
            >
              <Briefcase className="w-5 h-5" />
              I'm a Service Provider
            </Link>
            <Link 
              to="/signup/brand"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-blue-200 hover:bg-blue-50 transition-all duration-300 flex items-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              I'm a Brand
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4M+</div>
                  <div className="text-gray-600 font-medium">Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">50K+</div>
                  <div className="text-gray-600 font-medium">Service Providers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-gray-600 font-medium">Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">₹100Cr+</div>
                  <div className="text-gray-600 font-medium">Transactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* For Creators */}
            <div id="for-creators" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-purple-200/50">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Creators</h3>
                <h4 className="text-xl font-semibold text-purple-600 mb-4">Book Crews Instantly</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Find verified camera operators, stylists, and support staff within 24 hours. 
                  Create professional content without the hassle.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Instant booking in 100+ cities</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Verified professionals only</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Transparent pricing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Secure payments</span>
                  </li>
                </ul>
                
                <Link 
                  to="/signup/creator"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Start Creating
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* For Service Providers */}
            <div id="for-providers" className="group">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-teal-200/50">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Service Providers</h3>
                <h4 className="text-xl font-semibold text-teal-600 mb-4">Grow Your Business</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Connect with thousands of creators needing your expertise. 
                  Build a sustainable business with steady income.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Steady income stream</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Set your own rates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Flexible schedule</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Direct payments</span>
                  </li>
                </ul>
                
                <Link 
                  to="/signup/provider"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Join as Provider
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* For Brands */}
            <div id="for-brands" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-blue-200/50">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Brands</h3>
                <h4 className="text-xl font-semibold text-blue-600 mb-4">AI-Powered Campaigns</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Launch influencer campaigns with 10x efficiency. 
                  Let AI find perfect creators for maximum ROI.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">AI creator matching</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Bulk campaign management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Real-time analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Automated workflows</span>
                  </li>
                </ul>
                
                <Link 
                  to="/signup/brand"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Launch Campaign
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Be Famous Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              NEW: Be Famous
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Your Story Deserves the{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Spotlight
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Pitch your original ideas. Get full production funding. Premiere on CC TV. 
              Keep 100% IP rights and earn from multiple revenue streams.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                to="/be-famous/pitch"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <Lightbulb className="w-5 h-5" />
                Submit Your Idea
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/cc-tv"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch CC TV
              </Link>
            </div>
          </div>

          {/* Success Stories */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">From Pitch to Profit</h3>
              <p className="text-gray-300 mb-4">
                "My music video idea got ₹15 lakh funding and earned ₹45 lakh in first month"
              </p>
              <div className="text-sm text-gray-400">- Arjun, Mumbai Creator</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Growth</h3>
              <p className="text-gray-300 mb-4">
                "Working with industry mentors elevated my content quality 10x"
              </p>
              <div className="text-sm text-gray-400">- Priya, Delhi Creator</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Recognition</h3>
              <p className="text-gray-300 mb-4">
                "My short film premiered on CC TV and got picked up by Netflix"
              </p>
              <div className="text-sm text-gray-400">- Vikash, Bangalore Creator</div>
            </div>
          </div>

          {/* How Be Famous Works */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-8">How Be Famous Works</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  1
                </div>
                <h4 className="font-semibold mb-2">Submit Your Idea</h4>
                <p className="text-gray-300 text-sm">
                  Pitch original concepts with IP protection. AI analyzes potential.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  2
                </div>
                <h4 className="font-semibold mb-2">Community Votes</h4>
                <p className="text-gray-300 text-sm">
                  Public voting + expert panel. Top 5% selected monthly.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  3
                </div>
                <h4 className="font-semibold mb-2">Full Production</h4>
                <p className="text-gray-300 text-sm">
                  ₹5L-₹5Cr funding. Professional crew. Industry mentors.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  4
                </div>
                <h4 className="font-semibold mb-2">Premiere & Earn</h4>
                <p className="text-gray-300 text-sm">
                  Exclusive on CC TV. Multiple revenue streams. Keep 100% IP.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">₹500Cr+</div>
                <div className="text-gray-300 text-sm">Content Investment</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">2000+</div>
                <div className="text-gray-300 text-sm">Projects Funded</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">50M+</div>
                <div className="text-gray-300 text-sm">Monthly Views</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">85%</div>
                <div className="text-gray-300 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Creator Clap Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, powerful, and designed for the modern creator economy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Creator Flow */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-purple-600 mb-4">Creator Journey</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span className="text-gray-700">Sign up and verify profile</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span className="text-gray-700">Browse and book services</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span className="text-gray-700">Create amazing content</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <span className="text-gray-700">Get matched with brands</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Flow */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-teal-600 mb-4">Provider Journey</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span className="text-gray-700">Create professional profile</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span className="text-gray-700">Set availability and rates</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span className="text-gray-700">Accept bookings</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <span className="text-gray-700">Get paid instantly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Flow */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Brand Journey</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span className="text-gray-700">Define campaign goals</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span className="text-gray-700">AI selects perfect creators</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span className="text-gray-700">Manage everything in one place</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <span className="text-gray-700">Track real-time results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Creator Clap</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                India's first AI-powered creator economy platform. 
                Connecting creators, service providers, and brands for the future of content.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="https://www.snapchat.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Snapchat</a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">TikTok</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/press" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Creator Clap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;