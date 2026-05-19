import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';

const LINKS: Record<string, { label: string; path: string }[]> = {
  Company: [
    { label: 'About',    path: '/about' },
    { label: 'Careers',  path: '/about' },
    { label: 'Press',    path: '/about' },
  ],
  Products: [
    { label: 'All Products', path: '/products' },
    { label: 'Deals',        path: '/deals' },
    { label: 'Pricing',      path: '/pricing' },
    { label: 'Compare',      path: '/comparison' },
  ],
  Support: [
    { label: 'Help Center', path: '/help' },
    { label: 'Shipping',    path: '/help' },
    { label: 'Returns',     path: '/help' },
    { label: 'Contact',     path: '/contact' },
  ],
};

export function Footer() {
  const [email,      setEmail]      = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  return (
    <footer className="bg-[#fafafa] border-t border-[#e4e4e7]">
      {/* Newsletter */}
      <div className="border-b border-[#e4e4e7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="text-lg font-bold text-[#0a0a0a] mb-1">Stay in the loop</h3>
              <p className="text-sm text-[#71717a]">New products and occasional deals. One email a week, max.</p>
            </div>
            {subscribed ? (
              <p className="text-sm font-medium text-[#0a0a0a]">You're subscribed.</p>
            ) : (
              <div className="flex gap-2 w-full lg:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && email.trim()) { setSubscribed(true); setEmail(''); } }}
                  placeholder="your@email.com"
                  className="flex-1 lg:w-64 px-4 py-2.5 border border-[#e4e4e7] rounded-lg text-sm text-[#0a0a0a] placeholder-[#a1a1aa] outline-none focus:border-[#0a0a0a] bg-white transition-colors"
                />
                <button
                  onClick={() => { if (email.trim()) { setSubscribed(true); setEmail(''); } }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg hover:bg-[#2a2a2a] transition-colors whitespace-nowrap"
                >
                  Subscribe <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <p className="text-xl font-bold text-[#0a0a0a] mb-3 tracking-tight">Vendr</p>
            <p className="text-sm text-[#71717a] leading-relaxed">
              Authentic products from makers and sellers in 14 countries.
            </p>
          </div>
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#a1a1aa] mb-4">{heading}</p>
              <ul className="space-y-3">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <button
                      onClick={() => navigate(path)}
                      className="text-sm text-[#71717a] hover:text-[#0a0a0a] transition-colors"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e4e4e7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#a1a1aa]">© 2026 Vendr. All rights reserved.</p>
            <div className="flex items-center gap-2">
              {['Visa', 'MC', 'PayPal', 'AMEX'].map(m => (
                <div key={m} className="px-2.5 py-1 rounded border border-[#e4e4e7] text-[10px] font-semibold text-[#71717a]">
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
