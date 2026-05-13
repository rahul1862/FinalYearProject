import { Check, ArrowRight, Crown, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router';

export function PricingChart() {
  const plans = [
    {
      name: 'SILVER',
      description: 'For discerning shoppers',
      price: '12',
      period: '/month',
      color: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      borderColor: 'border-white/10',
      accentColor: 'from-gray-400 to-gray-500',
      highlight: false,
      icon: Shield,
      features: [
        'Browse premium collections',
        'Advanced product filters',
        'Curated recommendations',
        '8% luxury cashback',
        'Priority email support',
        'Exclusive member events',
      ],
      cta: 'Select Plan',
    },
    {
      name: 'GOLD',
      description: 'The pinnacle of luxury shopping',
      price: '29',
      period: '/month',
      color: 'bg-gradient-to-br from-amber-50 via-white to-amber-50',
      borderColor: 'border-amber-300',
      accentColor: 'from-amber-400 to-amber-600',
      highlight: true,
      icon: Crown,
      features: [
        'Everything in Silver +',
        '24/7 concierge service',
        'Personal style consultant',
        '18% luxury cashback',
        'Free priority shipping worldwide',
        'Exclusive access to limited editions',
        'VIP event invitations',
        'Dedicated account specialist',
      ],
      cta: 'Claim Your Crown',
    },
    {
      name: 'PLATINUM',
      description: 'Ultimate excellence',
      price: '59',
      period: '/month',
      color: 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900',
      borderColor: 'border-slate-600',
      accentColor: 'from-slate-300 to-slate-400',
      highlight: false,
      icon: Zap,
      textColor: 'text-white',
      features: [
        'Everything in Gold +',
        'White-glove service',
        'Private shopping sessions',
        '25% ultra-premium cashback',
        'Complimentary gift wrapping',
        'First access to all launches',
        'Personal shopping agent',
        'Annual luxury retreat invitation',
      ],
      cta: 'Ascend to Platinum',
    },
  ];

  const addOns = [
    {
      name: 'White Glove Delivery',
      description: 'Premium white-glove installation & setup',
      price: '49.99',
      icon: '🎁',
    },
    {
      name: 'Concierge Protection',
      description: 'Lifetime replacement guarantee on eligible items',
      price: '19.99',
      icon: '🛡️',
    },
    {
      name: 'VIP Access Pass',
      description: 'Early access to sales, private events & more',
      price: '9.99',
      icon: '⭐',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block mb-6">
            <span className="inline-block bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-transparent bg-clip-text text-sm font-black uppercase tracking-widest">
              ✨ Luxury Membership ✨
            </span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter">
            Elevate Your <br /> Shopping Experience
          </h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Discover exclusive access to premium collections, concierge service, and rewards designed for the most discerning shoppers.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {plans.map((plan, idx) => {
            const IconComponent = plan.icon;
            const textColorClass = plan.textColor || 'text-white';
            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl backdrop-blur-2xl transition-all duration-700 group overflow-hidden ${
                  plan.highlight
                    ? `${plan.color} ${plan.borderColor} border-2 shadow-2xl scale-105 md:scale-100 md:z-20`
                    : `${plan.color} ${plan.borderColor} border-2 shadow-xl hover:shadow-2xl hover:scale-105`
                } p-1`}
              >
                {/* Gradient Border Animation */}
                <div className={`absolute inset-0 bg-gradient-to-r ${plan.accentColor} opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl`}></div>

                {plan.highlight && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-black px-8 py-3 rounded-full text-xs font-black tracking-widest uppercase shadow-2xl">
                      <Crown className="w-4 h-4" />
                      Most Coveted
                    </span>
                  </div>
                )}

                <div className={`relative ${plan.color} rounded-3xl p-10 flex flex-col h-full`}>
                  <div className="mb-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.accentColor} flex items-center justify-center mb-6 shadow-lg`}>
                      <IconComponent className={`w-7 h-7 ${textColorClass === 'text-white' ? 'text-amber-300' : 'text-white'}`} />
                    </div>
                    <h3 className={`text-3xl font-black ${textColorClass} mb-2 tracking-wider uppercase`}>
                      {plan.name}
                    </h3>
                    <p className={`${textColorClass === 'text-white' ? 'text-gray-300' : 'text-gray-300'} text-sm leading-relaxed mb-8 font-light`}>
                      {plan.description}
                    </p>
                    <div className="mb-8 pb-8 border-b border-opacity-20 border-current">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-6xl font-black ${textColorClass}`}>
                          ${plan.price}
                        </span>
                        <span className={`${textColorClass === 'text-white' ? 'text-gray-400' : 'text-gray-400'} font-light`}>{plan.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 group/item">
                        <div className={`flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-gray-300'}`}>
                          <Check className={`w-3 h-3 ${textColorClass === 'text-white' ? 'text-gray-900' : 'text-white'}`} />
                        </div>
                        <span className={`${textColorClass === 'text-white' ? 'text-gray-200' : 'text-gray-300'} font-medium leading-relaxed group-hover/item:translate-x-1 transition-transform`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center justify-center gap-2 uppercase tracking-widest group/btn overflow-hidden relative ${
                      plan.highlight
                        ? `bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-black hover:shadow-2xl active:scale-95 shadow-xl`
                        : textColorClass === 'text-white'
                        ? `bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-600 hover:to-slate-700 active:scale-95`
                        : `bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 active:scale-95`
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {plan.cta}
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons Section */}
        <div className="py-32 border-t border-gray-800">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="inline-block bg-gradient-to-r from-amber-400 to-amber-300 text-transparent bg-clip-text text-sm font-black uppercase tracking-widest">
                Premium Enhancements
              </span>
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              Personalize Your Experience
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              Add bespoke services to your membership for an even more refined shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {addOns.map((addon, idx) => (
              <div
                key={idx}
                className="rounded-2xl border-2 border-gray-700 p-8 hover:border-amber-400 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 to-gray-950 group hover:from-gray-800 hover:to-gray-900"
              >
                <div className="text-4xl mb-4">{addon.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-wide group-hover:text-amber-300 transition-colors">
                  {addon.name}
                </h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
                  {addon.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
                    ${addon.price}
                  </span>
                  <span className="text-gray-500 font-light">/month</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-32 border-t border-gray-800">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="inline-block bg-gradient-to-r from-amber-400 to-amber-300 text-transparent bg-clip-text text-sm font-black uppercase tracking-widest">
                Questions & Clarity
              </span>
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                q: 'Can I upgrade or downgrade at any time?',
                a: 'Absolutely. Modify your plan anytime with immediate effect. Premium features activate instantly upon upgrade.',
              },
              {
                q: 'Do you offer a complimentary trial?',
                a: 'Yes - enjoy 14 days of any plan absolutely free. Experience all features risk-free before committing.',
              },
              {
                q: 'What payment methods are accepted?',
                a: 'We accept all major credit cards, premium digital wallets, bank transfers, and cryptocurrency for elite members.',
              },
              {
                q: 'Is there a cancellation policy?',
                a: 'Cancel with complete flexibility at any time. No penalties, no complications. Access continues through your billing period.',
              },
              {
                q: 'Do annual memberships include special benefits?',
                a: 'Yes - annual subscribers receive 3 months complimentary, exclusive VIP events, and additional premium perks.',
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl border-2 border-gray-700 p-8 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 hover:border-amber-400 hover:shadow-2xl transition-all duration-500 group">
                <h3 className="text-lg font-black text-white mb-4 flex items-start gap-4 group-hover:text-amber-300 transition-colors uppercase">
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300 text-2xl">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {item.q}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light ml-16">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 opacity-20 blur-3xl"></div>
          <div className="relative rounded-3xl border-2 border-amber-500/50 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 p-16 text-center">
            <h2 className="text-6xl font-black text-white mb-6 leading-tight">
              Begin Your Luxury Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Experience shopping redefined. Discover curated collections, white-glove service, and exclusive rewards designed for you.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-black px-12 py-5 rounded-2xl hover:shadow-2xl active:scale-95 transition-all duration-300 font-black text-lg uppercase tracking-widest shadow-xl"
            >
              Enter the Exclusive Marketplace
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
