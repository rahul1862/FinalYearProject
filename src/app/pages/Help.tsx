import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const faqs = [
  {
    q: 'How do I place an order?',
    a: "Find something you like, add it to your cart, and go through checkout. If something breaks mid-way, reach out and we'll sort it manually.",
  },
  {
    q: 'What payment methods are accepted?',
    a: 'Cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and bank transfer. All the standard stuff.',
  },
  {
    q: 'How long does shipping take?',
    a: "Most orders arrive in 5–10 business days. Express is usually 2–3. International destinations can sometimes take longer — we'll tell you at checkout.",
  },
  {
    q: 'Can I return something?',
    a: "30 days, unused, tags on. Email us and we'll send a return label. No interrogation about why you changed your mind.",
  },
  {
    q: 'How do I track my order?',
    a: "We email a tracking link once your order ships. If you didn't get one, check your spam folder or drop us a message.",
  },
  {
    q: 'Is my payment info safe?',
    a: "Yes — we don't store card details ourselves. All payments go through Stripe. We never see the actual numbers.",
  },
  {
    q: 'Do you ship internationally?',
    a: "Yes. Over 150 countries. Import duties and taxes are calculated at checkout so there's no surprise bill at the door.",
  },
  {
    q: 'I received something damaged. What do I do?',
    a: "Take a photo and send it to us. We'll get a replacement out or refund you — whichever you prefer.",
  },
];

export function Help() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0a0a0a] mb-4 tracking-tight">Help</h1>
          <p className="text-[#71717a] text-lg max-w-xl">
            Answers to the most common questions. If something's not here, use the contact form.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
            <Link to="/contact" className="bg-white rounded-lg p-5 border border-[#e4e4e7] hover:border-[#0a0a0a] transition-colors">
              <p className="text-[#0a0a0a] text-sm font-medium mb-1">Orders</p>
              <p className="text-[#a1a1aa] text-xs">Track or change an order</p>
            </Link>
            <Link to="/contact" className="bg-white rounded-lg p-5 border border-[#e4e4e7] hover:border-[#0a0a0a] transition-colors">
              <p className="text-[#0a0a0a] text-sm font-medium mb-1">Returns</p>
              <p className="text-[#a1a1aa] text-xs">Start a return or exchange</p>
            </Link>
            <Link to="/contact" className="bg-white rounded-lg p-5 border border-[#e4e4e7] hover:border-[#0a0a0a] transition-colors">
              <p className="text-[#0a0a0a] text-sm font-medium mb-1">Shipping</p>
              <p className="text-[#a1a1aa] text-xs">Rates and delivery times</p>
            </Link>
            <Link to="/contact" className="bg-white rounded-lg p-5 border border-[#e4e4e7] hover:border-[#0a0a0a] transition-colors">
              <p className="text-[#0a0a0a] text-sm font-medium mb-1">Account</p>
              <p className="text-[#a1a1aa] text-xs">Profile and payment settings</p>
            </Link>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-6 tracking-tight">Common questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-lg border border-[#e4e4e7] overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  >
                    <span className="text-[#0a0a0a] text-sm font-medium">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#a1a1aa] shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="px-5 pb-4 text-[#71717a] text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#fafafa] rounded-lg border border-[#e4e4e7] p-8 max-w-2xl">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Still stuck?</h3>
            <p className="text-[#71717a] text-sm mb-5">
              Our support team usually responds within a few hours. You can also reach us on live chat.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-[#2a2a2a] transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
