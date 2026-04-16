import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ShoppingBag, HelpCircle, Phone, Mail } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'product_recommendation';
  options?: string[];
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! 👋 Welcome to Vendr! I\'m your shopping assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'quick_reply',
      options: ['Browse Products', 'Track Order', 'Customer Support', 'Size Guide']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show welcome notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();

    // Product recommendations
    if (message.includes('recommend') || message.includes('suggest') || message.includes('looking for')) {
      return {
        id: Date.now().toString(),
        text: 'Based on your interests, here are some popular items you might like:',
        sender: 'bot',
        timestamp: new Date(),
        type: 'product_recommendation'
      };
    }

    // Order tracking
    if (message.includes('order') || message.includes('track') || message.includes('status')) {
      return {
        id: Date.now().toString(),
        text: 'I can help you track your order! Please provide your order number, and I\'ll check the status for you.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'quick_reply',
        options: ['I have an order number', 'How do I find my order number?']
      };
    }

    // Customer support
    if (message.includes('help') || message.includes('support') || message.includes('problem')) {
      return {
        id: Date.now().toString(),
        text: 'I\'m here to help! What specific assistance do you need?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'quick_reply',
        options: ['Return/Exchange', 'Payment Issues', 'Shipping Info', 'Speak to Human']
      };
    }

    // Size guide
    if (message.includes('size') || message.includes('fit') || message.includes('measurement')) {
      return {
        id: Date.now().toString(),
        text: 'Our size guide is designed to help you find the perfect fit. Check out our detailed size charts for each product category. Would you like me to show you how to measure yourself?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'quick_reply',
        options: ['Show me the size guide', 'How to measure', 'Size recommendations']
      };
    }

    // Shipping
    if (message.includes('shipping') || message.includes('delivery') || message.includes('when')) {
      return {
        id: Date.now().toString(),
        text: 'We offer fast, reliable shipping worldwide! Standard delivery takes 3-5 business days, express 1-2 days. Free shipping on orders over $100. International shipping available to 150+ countries.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'quick_reply',
        options: ['Calculate shipping', 'International rates', 'Express options']
      };
    }

    // Returns
    if (message.includes('return') || message.includes('exchange') || message.includes('refund')) {
      return {
        id: Date.now().toString(),
        text: 'We offer a 30-day return policy on all items. Items must be unused with original tags. Free return shipping for defective items. How can I help with your return?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'quick_reply',
        options: ['Start return process', 'Return policy details', 'Return shipping']
      };
    }

    // Default responses
    const defaultResponses = [
      'That\'s a great question! Let me help you with that.',
      'I\'d be happy to assist you with that.',
      'Let me check that for you.',
      'Thanks for asking! Here\'s what I can tell you:',
      'I understand. Let me provide you with the information you need.'
    ];

    return {
      id: Date.now().toString(),
      text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)] + ' Could you please provide more details about what you\'re looking for?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'quick_reply',
      options: ['Browse Products', 'Customer Support', 'Contact Us']
    };
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message with animation
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Visual feedback
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 100);
    }

    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = generateResponse(messageText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (option: string) => {
    handleSendMessage(option);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Welcome Notification */}
      {showNotification && !isOpen && (
        <div className="fixed bottom-24 right-6 bg-[#141414] rounded-xl shadow-lg border border-neutral-800 p-4 max-w-xs z-40 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white font-medium mb-1">Need help shopping?</p>
              <p className="text-xs text-gray-400">I'm here to assist you with product recommendations and support!</p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-500 hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setShowNotification(false);
                setIsOpen(true);
              }}
              className="flex-1 bg-red-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Chat Now
            </button>
            <button
              onClick={() => setShowNotification(false)}
              className="text-xs text-gray-500 hover:text-gray-300 px-3 py-2"
            >
              Later
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-3.5 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
        >
          <MessageCircle className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
            ?
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-[#141414] rounded-xl shadow-lg border border-neutral-800 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Vendr Assistant</h3>
                <p className="text-xs text-red-200">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.sender === 'bot' ? (
                      <Bot className="w-4 h-4 text-red-500" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.text}</p>

                  {/* Quick Reply Options */}
                  {message.type === 'quick_reply' && message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(option)}
                          className="block w-full text-left bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-2 rounded-lg transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Product Recommendations */}
                  {message.type === 'product_recommendation' && (
                    <div className="mt-3 space-y-2">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <ShoppingBag className="w-4 h-4" />
                          <span className="text-xs font-semibold">Recommended for you</span>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Premium Leather Wallet</span>
                            <span className="font-semibold">$89.99</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Designer Sunglasses</span>
                            <span className="font-semibold">$149.99</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Luxury Watch</span>
                            <span className="font-semibold">$299.99</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-4 py-3 max-w-[80%]">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-gray-500">Typing...</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleSendMessage('Help with order')}
                className="flex-1 bg-white/5 border border-white/10 text-gray-300 px-3 py-2 rounded-lg text-xs hover:bg-white/10 transition-colors"
              >
                <HelpCircle className="w-3 h-3 inline mr-1" />
                Order Help
              </button>
              <button
                onClick={() => handleSendMessage('Size guide')}
                className="flex-1 bg-white/5 border border-white/10 text-gray-300 px-3 py-2 rounded-lg text-xs hover:bg-white/10 transition-colors"
              >
                <ShoppingBag className="w-3 h-3 inline mr-1" />
                Size Guide
              </button>
              <button
                onClick={() => handleSendMessage('Contact support')}
                className="flex-1 bg-white/5 border border-white/10 text-gray-300 px-3 py-2 rounded-lg text-xs hover:bg-white/10 transition-colors"
              >
                <Phone className="w-3 h-3 inline mr-1" />
                Support
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}