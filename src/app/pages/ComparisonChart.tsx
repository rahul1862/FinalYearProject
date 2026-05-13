import { Check, X, Star, TrendingUp } from 'lucide-react';

export function ComparisonChart() {
  const platforms = [
    {
      name: 'Vendr',
      icon: '🏪',
      rating: 4.8,
      reviews: 2450,
      price: 'Free - $59/mo',
      description: 'Modern curated marketplace',
      features: {
        'Wide Product Selection': true,
        'Competitive Pricing': true,
        '24/7 Support': true,
        'Mobile App': true,
        'Easy Returns': true,
        'Loyalty Program': true,
        'White Glove Service': true,
        'Personal Shopping': true,
        'Same-Day Delivery': false,
        'International Shipping': true,
        'Price Match Guarantee': true,
        'Live Support Chat': true,
      },
      highlights: ['Best for curated shopping', 'Premium experience', 'Loyalty rewards'],
    },
    {
      name: 'Amazon',
      icon: '📦',
      rating: 4.7,
      reviews: 5200000,
      price: '$0 - $14.99/mo',
      description: 'Largest online marketplace',
      features: {
        'Wide Product Selection': true,
        'Competitive Pricing': true,
        '24/7 Support': true,
        'Mobile App': true,
        'Easy Returns': true,
        'Loyalty Program': true,
        'White Glove Service': false,
        'Personal Shopping': false,
        'Same-Day Delivery': true,
        'International Shipping': true,
        'Price Match Guarantee': true,
        'Live Support Chat': true,
      },
      highlights: ['Fastest shipping', 'Massive selection', 'Prime membership'],
    },
    {
      name: 'eBay',
      icon: '🏷️',
      rating: 4.5,
      reviews: 1850000,
      price: 'Free - $27.95/mo',
      description: 'Auction & marketplace platform',
      features: {
        'Wide Product Selection': true,
        'Competitive Pricing': true,
        '24/7 Support': false,
        'Mobile App': true,
        'Easy Returns': true,
        'Loyalty Program': false,
        'White Glove Service': false,
        'Personal Shopping': false,
        'Same-Day Delivery': false,
        'International Shipping': true,
        'Price Match Guarantee': false,
        'Live Support Chat': false,
      },
      highlights: ['Best for deals', 'Auction options', 'Collector items'],
    },
    {
      name: 'Etsy',
      icon: '🎨',
      rating: 4.6,
      reviews: 920000,
      price: '$0.20 per listing',
      description: 'Handmade & vintage marketplace',
      features: {
        'Wide Product Selection': true,
        'Competitive Pricing': true,
        '24/7 Support': false,
        'Mobile App': true,
        'Easy Returns': true,
        'Loyalty Program': false,
        'White Glove Service': false,
        'Personal Shopping': false,
        'Same-Day Delivery': false,
        'International Shipping': true,
        'Price Match Guarantee': false,
        'Live Support Chat': true,
      },
      highlights: ['Unique items', 'Artisan goods', 'Sustainable shopping'],
    },
    {
      name: 'Shopify Store',
      icon: '💼',
      rating: 4.6,
      reviews: 450000,
      price: '$29 - $299/mo',
      description: 'Build your own store',
      features: {
        'Wide Product Selection': false,
        'Competitive Pricing': false,
        '24/7 Support': true,
        'Mobile App': true,
        'Easy Returns': true,
        'Loyalty Program': true,
        'White Glove Service': false,
        'Personal Shopping': false,
        'Same-Day Delivery': false,
        'International Shipping': true,
        'Price Match Guarantee': false,
        'Live Support Chat': true,
      },
      highlights: ['DIY selling', 'Full customization', 'Own brand building'],
    },
  ];

  const allFeatures = [
    'Wide Product Selection',
    'Competitive Pricing',
    '24/7 Support',
    'Mobile App',
    'Easy Returns',
    'Loyalty Program',
    'White Glove Service',
    'Personal Shopping',
    'Same-Day Delivery',
    'International Shipping',
    'Price Match Guarantee',
    'Live Support Chat',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            E-Commerce Comparison
          </h1>
          <p className="text-xl text-gray-400">
            See how Vendr stacks up against other major platforms
          </p>
        </div>

        {/* Platform Cards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className={`rounded-lg p-6 transition-all duration-300 hover:shadow-xl ${
                platform.name === 'Vendr'
                  ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white border-2 border-amber-500 shadow-lg'
                  : 'bg-[#141414] border border-white/10 shadow-md'
              }`}
            >
              <div className="text-5xl mb-4">{platform.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${platform.name === 'Vendr' ? 'text-white' : 'text-white'}`}>
                {platform.name}
              </h3>
              <p className={`text-sm mb-4 ${platform.name === 'Vendr' ? 'text-gray-300' : 'text-gray-400'}`}>
                {platform.description}
              </p>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 fill-red-500 text-red-500" />
                  <span className={`font-bold ${platform.name === 'Vendr' ? 'text-white' : 'text-white'}`}>
                    {platform.rating}
                  </span>
                </div>
                <p className={`text-xs ${platform.name === 'Vendr' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {platform.reviews.toLocaleString()} reviews
                </p>
              </div>

              <p className={`text-sm font-semibold mb-3 ${platform.name === 'Vendr' ? 'text-amber-300' : 'text-gray-300'}`}>
                {platform.price}
              </p>

              <ul className="space-y-1 text-xs">
                {platform.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className={`flex items-center gap-2 ${platform.name === 'Vendr' ? 'text-gray-300' : 'text-gray-400'}`}
                  >
                    <Check className="w-3 h-3 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-[#141414] rounded-lg shadow-lg overflow-hidden mb-12 border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-4 text-left font-bold">Feature</th>
                  {platforms.map((platform) => (
                    <th
                      key={platform.name}
                      className={`px-6 py-4 text-left font-bold text-center ${
                        platform.name === 'Vendr' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : ''
                      }`}
                    >
                      <div className="text-2xl mb-2">{platform.icon}</div>
                      <div>{platform.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {allFeatures.map((feature, featureIdx) => (
                  <tr key={feature} className={featureIdx % 2 === 0 ? 'bg-[#141414]' : 'bg-white/5'}>
                    <td className="px-6 py-4 font-medium text-white">{feature}</td>
                    {platforms.map((platform) => (
                      <td key={platform.name} className="px-6 py-4 text-center">
                        {platform.features[feature as keyof typeof platform.features] ? (
                          <div className="flex justify-center">
                            <div className="bg-red-600/15 rounded-full p-2">
                              <Check className="w-5 h-5 text-red-500" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="bg-red-100 rounded-full p-2">
                              <X className="w-5 h-5 text-red-600" />
                            </div>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white rounded-lg p-8 mb-12">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Choose Vendr?</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Curated Experience:</strong> Premium product selection with expert curation
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Personal Service:</strong> White-glove service & dedicated shopping assistance
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Loyalty Rewards:</strong> Generous cashback and VIP member benefits
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Always Available:</strong> 24/7 concierge support in multiple languages
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Quality Guaranteed:</strong> Price match guarantee & easy returns
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to shop smarter?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made Vendr their favorite shopping destination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-gradient-to-r from-gray-900 to-black text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
            >
              Start Shopping
            </a>
            <a
              href="/pricing"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition-all duration-300"
            >
              View Pricing Plans
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
