import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Lightbulb,
  Play,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  Eye,
  Heart,
  Share2,
  Award,
  Clock,
  Shield,
  Zap,
  Camera,
  Film,
  Music,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BeFamousLanding = () => {
  const { user } = useAuth();

  const contentTypes = [
    {
      icon: Music,
      title: 'Music Videos',
      budget: '₹5L - ₹50L',
      duration: '2-4 weeks',
      description: 'Professional music video production with top-tier equipment and crew'
    },
    {
      icon: Film,
      title: 'Short Films',
      budget: '₹10L - ₹1Cr',
      duration: '4-8 weeks',
      description: 'Complete short film production from script to screen'
    },
    {
      icon: Camera,
      title: 'Web Series',
      budget: '₹50L - ₹5Cr',
      duration: '8-16 weeks',
      description: 'Multi-episode series with full production support'
    },
    {
      icon: FileText,
      title: 'Documentaries',
      budget: '₹20L - ₹2Cr',
      duration: '6-12 weeks',
      description: 'In-depth documentary production with research support'
    }
  ];

  const successStories = [
    {
      creator: 'Arjun Patel',
      project: 'Mumbai Dreams',
      type: 'Music Video',
      investment: '₹15L',
      returns: '₹45L',
      views: '2.3M',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      creator: 'Priya Sharma',
      project: 'Chai Chronicles',
      type: 'Short Film',
      investment: '₹25L',
      returns: '₹78L',
      views: '5.1M',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=150&h=150&fit=crop&crop=face'
    },
    {
      creator: 'Vikash Kumar',
      project: 'Tech Talks',
      type: 'Web Series',
      investment: '₹1.2Cr',
      returns: '₹4.5Cr',
      views: '12M',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'IP Protection',
      description: 'Blockchain-secured intellectual property rights from day one'
    },
    {
      icon: Zap,
      title: 'AI Analysis',
      description: 'Advanced AI evaluates your pitch for success potential'
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Industry veterans guide your production journey'
    },
    {
      icon: TrendingUp,
      title: 'Revenue Sharing',
      description: '70% creator share in year 1, 80% thereafter'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-semibold mb-8">
              <Sparkles className="w-4 h-4" />
              India's First Creator Production Platform
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              Your Story Deserves the{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Spotlight
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Pitch your original ideas. Get full production funding up to ₹5 crores. 
              Premiere on CC TV. Keep 100% IP rights and earn from multiple revenue streams.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link 
                to="/be-famous/pitch"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <Lightbulb className="w-6 h-6" />
                Submit Your Pitch
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/cc-tv"
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
              >
                <Play className="w-6 h-6" />
                Watch CC TV
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">₹500Cr+</div>
                <div className="text-gray-300">Content Investment</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">2,000+</div>
                <div className="text-gray-300">Projects Funded</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">50M+</div>
                <div className="text-gray-300">Monthly Views</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">85%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Be Famous Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From idea to income in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Your Idea</h3>
              <p className="text-gray-600 leading-relaxed">
                Pitch original concepts with detailed synopsis. AI analyzes market potential 
                and provides instant feedback on success probability.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community + Expert Vote</h3>
              <p className="text-gray-600 leading-relaxed">
                Public voting period followed by expert panel review. 
                Top 5% of submissions selected monthly for production funding.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Full Production Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive ₹5 lakh to ₹5 crore funding. Professional crew from Creator Clap marketplace. 
                Industry mentor assigned throughout production.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Premiere & Earn</h3>
              <p className="text-gray-600 leading-relaxed">
                Exclusive 30-day premiere on CC TV. Multiple revenue streams including 
                ads, subscriptions, and licensing. Keep 100% IP ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Can You Create?</h2>
            <p className="text-xl text-gray-600">
              We fund all types of original content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contentTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <type.icon className="w-8 h-8 text-purple-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <div className="text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span>{type.budget}</span>
                    <span>•</span>
                    <span>{type.duration}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Creator Success Stories</h2>
            <p className="text-xl text-gray-600">
              Real creators, real results, real earnings
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={story.image}
                    alt={story.creator}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{story.creator}</h3>
                    <p className="text-sm text-gray-600">{story.type} Creator</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">"{story.project}"</h4>
                  <p className="text-sm text-gray-600">{story.type}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{story.investment}</div>
                    <div className="text-xs text-gray-500">Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{story.returns}</div>
                    <div className="text-xs text-gray-500">Returns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{story.views}</div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>Featured on CC TV Prime Time</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Be Famous?</h2>
            <p className="text-xl text-gray-600">
              The most creator-friendly production platform in India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make Your Mark?</h2>
          <p className="text-xl mb-12 opacity-90">
            Join thousands of creators who've turned their ideas into successful productions. 
            Your story deserves the spotlight.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/be-famous/pitch"
              className="bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Lightbulb className="w-6 h-6" />
              Submit Your Pitch Now
            </Link>
            <Link 
              to="/cc-tv"
              className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6" />
              Explore CC TV
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BeFamousLanding;