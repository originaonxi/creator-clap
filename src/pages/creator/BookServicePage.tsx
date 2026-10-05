import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Star,
  Calendar,
  Clock,
  Camera,
  User,
  Eye,
  MessageCircle,
  Heart,
  Verified,
  Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';

const BookServicePage = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [filters, setFilters] = useState({
    serviceType: '',
    date: '',
    time: '',
    location: '',
    minBudget: 1000,
    maxBudget: 100000
  });

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const serviceProviders = [
    {
      id: '1',
      name: 'Raj Photography',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      serviceType: 'Photography',
      rating: 4.8,
      reviews: 234,
      location: 'Mumbai',
      hourlyRate: 2500,
      dailyRate: 18000,
      verified: true,
      availableIn: '2 hours',
      equipment: ['DSLR Camera', 'Lighting Kit', 'Tripod', 'Reflectors'],
      portfolio: [
        'https://images.unsplash.com/photo-1606103819526-7dd6b07823ee?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1609979739437-f0da7f48158d?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=200&h=200&fit=crop'
      ],
      bio: 'Professional photographer with 8+ years experience in fashion and lifestyle photography.',
      completedBookings: 156,
      responseTime: '< 1 hour'
    },
    {
      id: '2',
      name: 'Creative Films Studio',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      serviceType: 'Videography',
      rating: 4.9,
      reviews: 189,
      location: 'Mumbai',
      hourlyRate: 3500,
      dailyRate: 25000,
      verified: true,
      availableIn: '4 hours',
      equipment: ['4K Camera', 'Drone', 'Stabilizer', 'Audio Kit'],
      portfolio: [
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop'
      ],
      bio: 'Award-winning video production house specializing in brand commercials and content creation.',
      completedBookings: 203,
      responseTime: '< 2 hours'
    },
    {
      id: '3',
      name: 'Styling by Priya',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=150&h=150&fit=crop&crop=face',
      serviceType: 'Styling',
      rating: 4.7,
      reviews: 167,
      location: 'Mumbai',
      hourlyRate: 1800,
      dailyRate: 12000,
      verified: true,
      availableIn: '1 hour',
      equipment: ['Wardrobe Collection', 'Accessories', 'Makeup Kit'],
      portfolio: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1582610285985-a42d9193f2fd?w=200&h=200&fit=crop'
      ],
      bio: 'Fashion stylist and consultant with expertise in commercial and editorial styling.',
      completedBookings: 89,
      responseTime: '< 30 mins'
    }
  ];

  const handleBookNow = (provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/creator/dashboard"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Professional Services</h1>
          <p className="text-gray-600">Find and hire verified professionals for your content creation needs</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <select
                value={filters.serviceType}
                onChange={(e) => setFilters(prev => ({ ...prev, serviceType: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Services</option>
                <option value="videographer_editor">Videographer with Editor</option>
                <option value="videographer">Only Videographer</option>
                <option value="editor">Only Editor</option>
                <option value="photography">Photography</option>
                <option value="styling">Styling</option>
                <option value="makeup">Makeup</option>
                <option value="location">Location Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <select
                value={filters.time}
                onChange={(e) => setFilters(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Any Time</option>
                <option value="morning">Morning (9-12)</option>
                <option value="afternoon">Afternoon (12-17)</option>
                <option value="evening">Evening (17-20)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                Search
              </button>
            </div>
          </div>

          {/* Budget Range */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Budget Range: ₹{filters.minBudget.toLocaleString('en-IN')} - ₹{filters.maxBudget.toLocaleString('en-IN')} (up to ₹1 lakh)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={filters.minBudget}
                onChange={(e) => setFilters(prev => ({ ...prev, minBudget: parseInt(e.target.value) }))}
                className="flex-1"
              />
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={filters.maxBudget}
                onChange={(e) => setFilters(prev => ({ ...prev, maxBudget: parseInt(e.target.value) }))}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Service Providers Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {serviceProviders.map((provider) => (
            <div key={provider.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
              {/* Provider Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={provider.profileImage}
                      alt={provider.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                        {provider.verified && <Verified className="w-4 h-4 text-blue-500" />}
                      </div>
                      <p className="text-sm text-gray-600">{provider.serviceType}</p>
                    </div>
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{provider.rating}</span>
                    <span>({provider.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.location}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-bold text-gray-900">₹{provider.hourlyRate}/hour</p>
                    <p className="text-sm text-gray-600">₹{provider.dailyRate}/day</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-medium">Available in {provider.availableIn}</p>
                    <p className="text-xs text-gray-500">Response: {provider.responseTime}</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{provider.bio}</p>
              </div>

              {/* Portfolio Preview */}
              <div className="px-6 pb-4">
                <div className="flex gap-2 mb-4">
                  {provider.portfolio.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Equipment (collapsible) */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Equipment Available:</p>
                  <div className="flex flex-wrap gap-1">
                    {provider.equipment.slice(0, 3).map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {item}
                      </span>
                    ))}
                    {provider.equipment.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{provider.equipment.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-3">
                <button
                  onClick={() => handleBookNow(provider)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Book Now
                </button>
                
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <User className="w-4 h-4" />
                    View Profile
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white text-purple-600 border border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Load More Providers
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Book Service</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Selected Provider */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <img
                  src={selectedProvider.profileImage}
                  alt={selectedProvider.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedProvider.name}</h3>
                  <p className="text-gray-600">{selectedProvider.serviceType}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{selectedProvider.rating} ({selectedProvider.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowBookingModal(false);
                  addNotification({ type: 'success', title: 'Booking requested', message: `${selectedProvider.name} will confirm within their response time.` });
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">Select duration</option>
                    <option value="2">2 hours - ₹{selectedProvider.hourlyRate * 2}</option>
                    <option value="4">4 hours - ₹{selectedProvider.hourlyRate * 4}</option>
                    <option value="8">Full day - ₹{selectedProvider.dailyRate}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    placeholder="Enter shoot location"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                  <textarea
                    placeholder="Describe your project requirements..."
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Needed</label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProvider.equipment.map((item, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input type="checkbox" className="text-purple-600 focus:ring-purple-500" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Price Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service Cost (4 hours)</span>
                      <span>₹{selectedProvider.hourlyRate * 4}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee (15%)</span>
                      <span>₹{Math.round(selectedProvider.hourlyRate * 4 * 0.15)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span>₹{Math.round(selectedProvider.hourlyRate * 4 * 1.15 * 0.18)}</span>
                    </div>
                    <div className="border-t border-purple-200 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{Math.round(selectedProvider.hourlyRate * 4 * 1.15 * 1.18)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookServicePage;