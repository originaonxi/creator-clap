import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ToggleLeft,
  ToggleRight,
  Calendar,
  Clock,
  User,
  MapPin,
  IndianRupee,
  CheckCircle,
  XCircle,
  MessageCircle,
  Star,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);

  const stats = [
    {
      label: 'This Week Earnings',
      value: '₹35,000',
      color: 'green',
      icon: IndianRupee
    },
    {
      label: 'This Month Earnings',
      value: '₹1,20,000',
      color: 'blue',
      icon: TrendingUp
    },
    {
      label: 'Pending Payments',
      value: '₹15,000',
      color: 'yellow',
      icon: Clock
    },
    {
      label: 'Completed Bookings',
      value: '23',
      color: 'purple',
      icon: CheckCircle
    }
  ];

  const pendingRequests = [
    {
      id: '1',
      creator: {
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=50&h=50&fit=crop&crop=face',
        followers: '125K'
      },
      service: 'Photography',
      date: 'Dec 28, 2024',
      time: '2:00 PM',
      location: 'Bandra, Mumbai',
      duration: '4 hours',
      budget: '₹8,000',
      requirements: 'Fashion photography for Instagram posts. Need natural lighting and urban backdrop.',
      responseDeadline: '2 hours'
    },
    {
      id: '2',
      creator: {
        name: 'Arjun Patel',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        followers: '89K'
      },
      service: 'Videography',
      date: 'Dec 30, 2024',
      time: '10:00 AM',
      location: 'Juhu Beach, Mumbai',
      duration: '6 hours',
      budget: '₹15,000',
      requirements: 'Product launch video for tech startup. Need drone shots and multiple angles.',
      responseDeadline: '4 hours'
    }
  ];

  const todaysSchedule = [
    {
      time: '10:00 AM',
      creator: 'Sneha Kapoor',
      service: 'Photo Shoot',
      location: 'Film City',
      status: 'confirmed'
    },
    {
      time: '3:00 PM',
      creator: 'Rohit Mehta',
      service: 'Video Production',
      location: 'Linking Road',
      status: 'in-progress'
    }
  ];

  const recentReviews = [
    {
      id: '1',
      creator: 'Meera Singh',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      rating: 5,
      review: 'Excellent work! Very professional and delivered exactly what I needed.',
      date: '2 days ago'
    },
    {
      id: '2',
      creator: 'Vikash Kumar',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      rating: 4,
      review: 'Great photographer with amazing equipment. Highly recommended!',
      date: '5 days ago'
    }
  ];

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
    // Handle accept/decline logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Good morning, {user?.name}! 👋
              </h1>
              <p className="text-gray-600">Manage your bookings and grow your business</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Availability Toggle */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Available</span>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`transition-colors ${isAvailable ? 'text-green-600' : 'text-gray-400'}`}
                >
                  {isAvailable ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className={`text-xs ${isAvailable ? 'text-green-600' : 'text-gray-500'}`}>
                    {isAvailable ? 'Available now' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Availability Status */}
        {isAvailable && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">You're currently available</span>
            </div>
            <p className="text-sm text-green-600 mt-1">Next available slot: Today, 3 PM</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pending Requests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Booking Requests</h2>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    {pendingRequests.length} pending
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Request Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={request.creator.avatar}
                          alt={request.creator.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.creator.name}</h3>
                          <p className="text-sm text-gray-600">{request.creator.followers} followers</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-lg">{request.budget}</p>
                        <p className="text-sm text-gray-600">{request.duration}</p>
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{request.date} at {request.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{request.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-end">
                        <div className="flex items-center gap-2 text-sm text-orange-600">
                          <AlertCircle className="w-4 h-4" />
                          <span>Reply within {request.responseDeadline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {request.requirements}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleRequestAction(request.id, 'accept')}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                      >
                        <CheckCircle className="w-4 h-4 inline mr-2" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleRequestAction(request.id, 'decline')}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        <XCircle className="w-4 h-4 inline mr-2" />
                        Decline
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {todaysSchedule.map((appointment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{appointment.time}</p>
                        <p className="text-sm text-gray-600">{appointment.creator}</p>
                        <p className="text-xs text-gray-500">{appointment.location}</p>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Reviews</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.avatar}
                          alt={review.creator}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-gray-900 text-sm">{review.creator}</p>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{review.review}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link
                  to="/provider/reviews"
                  className="block text-center mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  View All Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;