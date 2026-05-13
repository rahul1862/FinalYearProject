import { Mail, Phone, MessageSquare, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  { q: 'How long does shipping usually take?', a: 'Depends on where you are, but most orders arrive in 5–10 business days. Express shipping is available at checkout if you need it sooner.' },
  { q: 'Can I return something?', a: '30-day returns on everything. Just reach out and we\'ll sort it. We cover return shipping too.' },
  { q: 'How do I know products are real?', a: 'We verify every seller and product before listing. If we ever get it wrong, we\'ll refund you and fix it.' },
  { q: 'Do you ship internationally?', a: 'We ship to over 150 countries. Duties and taxes get calculated at checkout so there are no surprises.' },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sent! We\'ll get back to you within a day.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Get in touch
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl">
            Have a question about an order, a product, or something else? Send us a message and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'support@vendr.com', detail: 'General inquiries' },
                { icon: Phone, label: 'Phone', value: '083 012 9990', detail: 'Rahul Pohwani' },
                { icon: MessageSquare, label: 'Live chat', value: 'Available 24/7', detail: 'Usually under 5 min' },
                { icon: MapPin, label: 'Office', value: 'National College of Ireland', detail: 'Mayor Street Lower, Dublin 1' },
              ].map((item) => (
                <div key={item.label} className="bg-[#141414] rounded-lg p-5 border border-neutral-800">
                  <div className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium">{item.label}</p>
                      <p className="text-neutral-400 text-sm">{item.value}</p>
                      <p className="text-neutral-600 text-xs mt-1">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-[#141414] rounded-lg p-5 border border-neutral-800">
                <p className="text-white text-sm font-medium mb-3">Hours</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-neutral-500">Mon – Fri</span><span className="text-neutral-300">9am – 6pm</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Saturday</span><span className="text-neutral-300">10am – 4pm</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Sunday</span><span className="text-neutral-600">Closed</span></div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#141414] rounded-lg p-6 lg:p-8 border border-neutral-800">
                <h2 className="text-xl font-semibold text-white mb-6">Send a message</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-neutral-400 mb-1.5">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 border border-neutral-700 rounded-lg bg-neutral-900 text-white focus:outline-none focus:border-red-600 placeholder-neutral-600 text-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-400 mb-1.5">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 border border-neutral-700 rounded-lg bg-neutral-900 text-white focus:outline-none focus:border-red-600 placeholder-neutral-600 text-sm"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-1.5">What's this about?</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-neutral-700 rounded-lg bg-neutral-900 text-white focus:outline-none focus:border-red-600 text-sm appearance-none"
                    >
                      <option value="" className="bg-neutral-900">Pick a topic...</option>
                      <option value="order" className="bg-neutral-900">Order issue</option>
                      <option value="shipping" className="bg-neutral-900">Shipping</option>
                      <option value="return" className="bg-neutral-900">Return or refund</option>
                      <option value="product" className="bg-neutral-900">Product question</option>
                      <option value="other" className="bg-neutral-900">Something else</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3.5 py-2.5 border border-neutral-700 rounded-lg bg-neutral-900 text-white focus:outline-none focus:border-red-600 placeholder-neutral-600 text-sm resize-none"
                      placeholder="What can we help with?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-red-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Common questions</h2>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#141414] rounded-lg border border-neutral-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                >
                  <span className="text-white text-sm font-medium">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 pb-4 text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
