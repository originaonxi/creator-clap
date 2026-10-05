import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, MessageCircle, Users, Heart, Share2, Gift, Calendar, Clock, Star, Archive as Live, Eye, Sparkles, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CCTVPage = () => {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [viewerCount, setViewerCount] = useState(45234);

  const currentProgram = {
    title: 'Creator Spotlight Hour',
    creator: 'Arjun Patel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    type: 'Music Video Premiere',
    startTime: '8:00 PM',
    endTime: '9:00 PM',
    description: 'Exclusive premiere of "Mumbai Dreams" - a story of ambition and hope in the city of dreams.',
    isLive: true
  };

  const upcomingShows = [
    {
      time: '9:00 PM',
      title: 'Comedy Central',
      creator: 'Priya Sharma',
      type: 'Stand-up Special',
      duration: '60 min',
      isLive: false
    },
    {
      time: '10:00 PM',
      title: 'Tech Talk Tuesday',
      creator: 'Vikash Kumar',
      type: 'Web Series',
      duration: '30 min',
      isLive: true
    },
    {
      time: '10:30 PM',
      title: 'Midnight Music',
      creator: 'Various Artists',
      type: 'Music Block',
      duration: '90 min',
      isLive: false
    }
  ];

  const chatMessages = [
    {
      id: 1,
      user: 'MumbaiVibes',
      message: 'This music video is incredible! 🔥',
      timestamp: '8:23 PM',
      isSuper: false
    },
    {
      id: 2,
      user: 'CreatorFan2024',
      message: 'Arjun deserves all the success! Amazing work 👏',
      timestamp: '8:24 PM',
      isSuper: true,
      amount: '₹100'
    },
    {
      id: 3,
      user: 'FilmBuff',
      message: 'The cinematography is next level',
      timestamp: '8:24 PM',
      isSuper: false
    },
    {
      id: 4,
      user: 'DreamChaser',
      message: 'This is why I love CC TV - real stories, real talent',
      timestamp: '8:25 PM',
      isSuper: false
    }
  ];

  const featuredContent = [
    {
      id: 1,
      title: 'Street Food Stories',
      creator: 'Food Explorer',
      thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop',
      views: '2.3M',
      rating: 4.8,
      type: 'Documentary'
    },
    {
      id: 2,
      title: 'Chai Chronicles',
      creator: 'Storyteller',
      thumbnail: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop',
      views: '1.8M',
      rating: 4.9,
      type: 'Short Film'
    },
    {
      id: 3,
      title: 'Urban Beats',
      creator: 'Music Collective',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      views: '3.1M',
      rating: 4.7,
      type: 'Music Video'
    }
  ];

  useEffect(() => {
    // Simulate viewer count changes
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 20) - 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Handle message sending
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Live className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">CC TV</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Eye className="w-4 h-4" />
                <span>{viewerCount.toLocaleString()} watching</span>
              </div>
              
              {user && (
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Main Video Player */}
        <div className={`flex-1 relative ${showChat ? 'mr-80' : ''} transition-all duration-300`}>
          {/* Video Container */}
          <div className="relative h-full bg-gray-900">
            {/* Placeholder Video */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Play className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Live Stream</h2>
                <p className="text-gray-300">CC TV is broadcasting live content</p>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              {/* Current Program Info */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={currentProgram.avatar}
                    alt={currentProgram.creator}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{currentProgram.title}</h3>
                    <p className="text-sm text-gray-300">by {currentProgram.creator}</p>
                  </div>
                  {currentProgram.isLive && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      LIVE
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-300 mb-2">{currentProgram.description}</p>
                <div className="text-xs text-gray-400">
                  {currentProgram.startTime} - {currentProgram.endTime} • {currentProgram.type}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">12.3K</span>
                    </button>
                    
                    <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Chat</span>
                  </button>
                  
                  <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Live Chat</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{viewerCount.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">Be respectful and follow community guidelines</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`${msg.isSuper ? 'bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-2' : ''}`}>
                  {msg.isSuper && (
                    <div className="flex items-center gap-2 mb-1">
                      <Gift className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs text-yellow-500 font-semibold">Super Chat {msg.amount}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <div className="text-xs text-gray-400 mt-1">{msg.timestamp}</div>
                    <div className="flex-1">
                      <span className={`font-semibold text-sm ${msg.isSuper ? 'text-yellow-400' : 'text-blue-400'}`}>
                        {msg.user}
                      </span>
                      <p className="text-sm text-gray-300 mt-1">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-800">
              {user ? (
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                    >
                      <Gift className="w-4 h-4" />
                      Super
                    </button>
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Say something..."
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-3">Login to join the conversation</p>
                  <Link
                    to="/login"
                    className="block bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Program Guide Overlay */}
      <div className="fixed bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Coming Up Next
          </h3>
          <Link
            to="/cc-tv/schedule"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            View Full Schedule
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {upcomingShows.map((show, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-purple-400">{show.time}</span>
                {show.isLive && (
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    LIVE
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-sm mb-1">{show.title}</h4>
              <p className="text-xs text-gray-400 mb-1">by {show.creator}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{show.type}</span>
                <span>{show.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Content Sidebar (when chat is hidden) */}
      {!showChat && (
        <div className="fixed right-4 top-20 w-80 bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Featured Content
          </h3>
          
          <div className="space-y-4">
            {featuredContent.map((content) => (
              <div key={content.id} className="flex gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-16 h-12 rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{content.title}</h4>
                  <p className="text-xs text-gray-400 mb-1">by {content.creator}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {content.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {content.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CCTVPage;