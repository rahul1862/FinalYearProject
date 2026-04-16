import { Link } from 'react-router';
import { Globe, Headphones, ShieldCheck, Truck } from 'lucide-react';

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', to: '/products' },
      { label: 'Deals', to: '/deals' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Comparison', to: '/comparison' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Help center', to: '/help' },
      { label: 'Checkout', to: '/checkout' },
    ],
  },
];

const assurances = [
  {
    icon: Globe,
    title: '14 curated markets',
    description: 'Sourced from independent makers and standout global brands.',
  },
  {
    icon: ShieldCheck,
    title: 'Authenticated selection',
    description: 'Every listing is reviewed for quality, provenance, and consistency.',
  },
  {
    icon: Truck,
    title: 'Fast global delivery',
    description: 'Clear shipping timelines and live tracking where available.',
  },
  {
    icon: Headphones,
    title: 'Human support',
    description: 'Real help for sizing, orders, and product guidance.',
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:px-8">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs text-neutral-500 uppercase tracking-wider">Vendr</p>
            <h2 className="text-2xl font-bold text-white leading-snug max-w-lg">
              Curated products from around the world, with straightforward shopping and real support.
            </h2>
            <p className="max-w-md text-sm text-neutral-500 leading-relaxed">
              We bring together standout goods with a browsing experience that actually makes sense.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {assurances.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                <Icon className="h-4 w-4 text-red-500 mb-2" />
                <h3 className="text-sm font-medium text-white">{title}</h3>
                <p className="mt-1 text-xs text-neutral-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 rounded-xl border border-neutral-800 bg-[#111] p-6 sm:grid-cols-2 lg:grid-cols-1">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                {section.title}
              </h3>
              <div className="mt-4 grid gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-gray-400 transition-colors hover:text-red-500"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-xl bg-red-600 px-5 py-5 text-white">
            <p className="text-xs font-medium text-white/60 uppercase tracking-wider">Need help?</p>
            <p className="mt-2 text-lg font-semibold leading-snug">
              Our team can help you compare products, check shipping, and figure out sizing.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Link to="/contact" className="rounded-lg bg-white px-4 py-2 font-medium text-red-600">
                Contact us
              </Link>
              <Link to="/help" className="rounded-lg border border-white/30 px-4 py-2 font-medium text-white hover:bg-white/10 transition-colors">
                Help center
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2025 Vendr</p>
          <div className="flex gap-4">
            <span>Secure checkout</span>
            <span>Tracked delivery</span>
            <span>Global support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}