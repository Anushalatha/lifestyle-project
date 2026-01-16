import { useState } from 'react'
import Layout from '../components/Layout'

/**
 * AI Outfit Recommendation Component
 * Shows mock weather and suggests outfits based on weather and occasion
 */
const OutfitRecommendations = () => {
  const [selectedOccasion, setSelectedOccasion] = useState('casual')

  // Mock weather data
  const weather = {
    condition: 'Sunny',
    temperature: 72,
    humidity: 45,
    windSpeed: 8,
  }

  // Mock wardrobe items
  const wardrobe = [
    { id: 1, name: 'White T-Shirt', type: 'top', color: 'White' },
    { id: 2, name: 'Blue Jeans', type: 'bottom', color: 'Blue' },
    { id: 3, name: 'Light Jacket', type: 'outerwear', color: 'Beige' },
    { id: 4, name: 'Sneakers', type: 'shoes', color: 'White' },
    { id: 5, name: 'Dress Shirt', type: 'top', color: 'Navy' },
    { id: 6, name: 'Chinos', type: 'bottom', color: 'Khaki' },
    { id: 7, name: 'Blazer', type: 'outerwear', color: 'Navy' },
    { id: 8, name: 'Dress Shoes', type: 'shoes', color: 'Black' },
  ]

  // Generate outfit recommendations based on weather and occasion
  const getOutfitRecommendation = () => {
    if (selectedOccasion === 'casual') {
      return {
        outfit: ['White T-Shirt', 'Blue Jeans', 'Light Jacket', 'Sneakers'],
        explanation: 'Perfect for a sunny day! The light jacket provides just enough warmth for the mild temperature, while the casual jeans and sneakers keep you comfortable.',
      }
    } else if (selectedOccasion === 'business') {
      return {
        outfit: ['Dress Shirt', 'Chinos', 'Blazer', 'Dress Shoes'],
        explanation: 'Professional yet comfortable. The blazer adds a polished look while the chinos keep it modern. Ideal for business meetings or professional settings.',
      }
    } else {
      return {
        outfit: ['Dress Shirt', 'Blue Jeans', 'Blazer', 'Sneakers'],
        explanation: 'Smart casual look that works for most occasions. The blazer elevates the outfit while maintaining comfort.',
      }
    }
  }

  const recommendation = getOutfitRecommendation()

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Outfit Recommendations</h1>
          <p className="text-gray-600">Get AI-powered outfit suggestions based on weather and occasion</p>
        </div>

        {/* Weather Display */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Current Weather</h2>
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-5xl font-bold">{weather.temperature}°F</div>
                  <div className="text-lg opacity-90">{weather.condition}</div>
                </div>
                <div className="text-6xl">☀️</div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-sm opacity-90">Humidity: {weather.humidity}%</div>
              <div className="text-sm opacity-90">Wind: {weather.windSpeed} mph</div>
            </div>
          </div>
        </div>

        {/* Occasion Selector */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Occasion</h3>
          <div className="flex space-x-3">
            {['casual', 'business', 'smart-casual'].map((occasion) => (
              <button
                key={occasion}
                onClick={() => setSelectedOccasion(occasion)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedOccasion === occasion
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {occasion.charAt(0).toUpperCase() + occasion.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Outfit Recommendation Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recommended Outfit</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {recommendation.outfit.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
              >
                <div className="text-4xl mb-2">👕</div>
                <div className="font-medium text-gray-900">{item}</div>
              </div>
            ))}
          </div>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Why this outfit?</h3>
            <p className="text-gray-700">{recommendation.explanation}</p>
          </div>
        </div>

        {/* Virtual Wardrobe */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Virtual Wardrobe</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wardrobe.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary-300 transition-colors"
              >
                <div className="text-3xl mb-2 text-center">👔</div>
                <div className="text-center">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500 capitalize">{item.type}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.color}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OutfitRecommendations

