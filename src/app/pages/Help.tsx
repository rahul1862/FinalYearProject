import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function Help() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I place an order?',
      answer: 'Browse through our products, add items to your cart, and proceed to checkout. Follow the payment and shipping instructions to complete your order.'
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, debit cards, digital wallets (Apple Pay, Google Pay), and bank transfers. All transactions are secure and encrypted.'
    },
    {
      id: 3,
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 5-10 business days. Express shipping options are available for faster delivery. International orders may take 2-4 weeks depending on the destination.'
    },
    {
      id: 4,
      question: 'Can I return a product?',
      answer: 'Yes, we offer 30-day returns on most products. Items must be unused and in original packaging. Contact our support team to initiate a return.'
    },
    {
      id: 5,
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this number to track your package in real-time.'
    },
    {
      id: 6,
      question: 'Is my personal information secure?',
      answer: 'Absolutely! We use industry-leading encryption and security measures to protect your personal and payment information. Your privacy is our top priority.'
    },
    {
      id: 7,
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 150 countries worldwide. Shipping costs and times vary by location. Check our shipping policy for more details.'
    },
    {
      id: 8,
      question: 'What should I do if I received a damaged item?',
      answer: 'Contact us immediately with photos of the damage. We\'ll arrange a replacement or refund at no additional cost to you.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Help & Support</h1>
          <p className="mt-2 text-red-200">Find answers to your questions and get support when you need it</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#141414] rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow border border-white/10">
            <h3 className="font-bold text-white mb-2">Order Status</h3>
            <p className="text-sm text-gray-400">Track your order in real-time</p>
          </div>
          <div className="bg-[#141414] rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow border border-white/10">
            <h3 className="font-bold text-white mb-2">Returns</h3>
            <p className="text-sm text-gray-400">Learn about our return policy</p>
          </div>
          <div className="bg-[#141414] rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow border border-white/10">
            <h3 className="font-bold text-white mb-2">Shipping</h3>
            <p className="text-sm text-gray-400">Shipping info and rates</p>
          </div>
          <div className="bg-[#141414] rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow border border-white/10">
            <h3 className="font-bold text-white mb-2">Account</h3>
            <p className="text-sm text-gray-400">Manage your account</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-[#141414] rounded-lg shadow-md p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-white/10 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-red-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 py-4 bg-white/5 border-t border-white/10">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-red-600 text-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Need More Help?</h3>
          <p className="mb-6">Can't find what you're looking for? Our support team is here to help!</p>
          <button className="bg-white text-red-600 font-medium px-6 py-2 rounded-lg hover:bg-white/90 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
