import { Link } from 'react-router';
import { Clock, ArrowRight } from 'lucide-react';

export function Deals() {
  const deals = [
    { id: 1, title: 'Summer Clearance', discount: '50% off', description: 'End-of-season items from across our catalog. Limited stock.', ends: 'June 30', highlight: false },
    { id: 2, title: 'New Arrivals', discount: '20% off', description: 'Just-added products from our latest sourcing trip to South Korea and Japan.', ends: 'June 15', highlight: false },
    { id: 3, title: 'Flash Sale', discount: 'Up to 70% off', description: 'One-day clearout. These are past-season items and we need the warehouse space.', ends: 'Today', highlight: true },
    { id: 4, title: 'Bundle Deal', discount: 'Buy 2, get 1 free', description: 'Works across categories. Mix a candle with some skincare, we don\'t judge.', ends: 'June 25', highlight: false },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Current deals
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl">
            Actual discounts — we don't inflate the original price first. What you see is what you save.
          </p>
        </div>
      </section>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {deals.map((deal) => (
            <div key={deal.id} className={`bg-[#141414] rounded-lg overflow-hidden border ${deal.highlight ? 'border-red-600/40' : 'border-neutral-800'} p-6`}>
              <div className="flex items-center gap-2 mb-4 text-neutral-500 text-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>Ends {deal.ends}</span>
                {deal.highlight && <span className="ml-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded font-medium">Ending soon</span>}
              </div>
              <p className="text-3xl font-bold text-white mb-1">{deal.discount}</p>
              <h3 className="text-lg font-semibold text-white mb-2">{deal.title}</h3>
              <p className="text-neutral-400 text-sm mb-5 leading-relaxed">{deal.description}</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
              >
                Shop deal
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Email signup */}
        <div className="mt-16 bg-[#141414] rounded-lg p-8 border border-neutral-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Get deal alerts</h3>
            <p className="text-neutral-400 text-sm mb-6">
              We'll email you when we run sales. No more than once a week.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 text-sm"
              />
              <button className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm whitespace-nowrap">
                Notify me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
