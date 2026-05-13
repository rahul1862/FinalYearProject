import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, ArrowRight, Star, TrendingUp } from 'lucide-react';

const SUGGESTIONS = [
  "What's trending in Japan right now?",
  'Find me luxury watches under $500',
  'Best Korean skincare for dry skin',
  'Italian leather bags for travel',
];

const AI_RESPONSES: Record<string, { text: string; cards: { flag: string; name: string; price: string; rating: number; color: string }[] }> = {
  default: {
    text: "Based on your browsing history and global trends, I've curated these picks for you. These are hot right now across our 195-country network.",
    cards: [
      { flag: '🇯🇵', name: 'Sony WF-1000XM5', price: '$279', rating: 4.9, color: '#00d4ff' },
      { flag: '🇰🇷', name: 'Laneige Water Bank', price: '$38', rating: 4.8, color: '#f472b6' },
      { flag: '🇨🇭', name: 'Hamilton Khaki', price: '$495', rating: 4.7, color: '#38bdf8' },
    ],
  },
};

interface RecommendCard {
  flag: string;
  name: string;
  price: string;
  rating: number;
  color: string;
}

function RecommendCardEl({ card, index }: { card: RecommendCard; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="px-4 py-4 rounded-2xl cursor-pointer"
      style={{
        background: `${card.color}10`,
        border: `1px solid ${card.color}25`,
        backdropFilter: 'blur(12px)',
        minWidth: '180px',
      }}
    >
      <div className="text-3xl mb-3">{card.flag}</div>
      <div className="text-sm font-semibold text-white mb-1 leading-tight">{card.name}</div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-base font-bold" style={{ color: card.color }}>{card.price}</span>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" style={{ color: '#f59e0b' }} />
          <span className="text-xs text-white/60">{card.rating}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function AISection() {
  const [input, setInput] = useState('');
  const [active, setActive] = useState(false);
  const [aiText, setAiText] = useState('');
  const [cards, setCards] = useState<RecommendCard[]>([]);
  const [typing, setTyping] = useState(false);

  const triggerAI = (_query?: string, scrollAfter?: boolean) => {
    const response = AI_RESPONSES.default;
    setInput('');
    setTyping(true);
    setCards([]);
    setAiText('');
    setActive(true);
    setTimeout(() => {
      setTyping(false);
      setAiText(response.text);
      setCards(response.cards);
      if (scrollAfter) {
        setTimeout(() => {
          const el = document.getElementById('featured');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }, 1400);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    triggerAI(input);
  };

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: '#070718' }}
    >
      {/* Mesh gradient bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Animated orb */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}
            >
              <Bot className="w-3.5 h-3.5" />
              AI-Powered Shopping
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Where Should You{' '}
              <span style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Shop Next?
              </span>
            </h2>

            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-md">
              Our AI analyses 12 million products across 195 countries in real time to surface exactly what you'll love — before you even know you want it.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { label: 'Personalised for you', color: '#8b5cf6' },
                { label: 'Real-time pricing', color: '#00d4ff' },
                { label: 'Cultural curation', color: '#ec4899' },
              ].map(f => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white/70"
                  style={{ background: `${f.color}10`, border: `1px solid ${f.color}25` }}
                >
                  <Sparkles className="w-3 h-3" style={{ color: f.color }} />
                  {f.label}
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(139,92,246,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => triggerAI(undefined, true)}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)' }}
            >
              <Sparkles className="w-5 h-5" />
              Get My AI Picks
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Right: AI interface */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 80px rgba(139,92,246,0.12)',
              }}
            >
              {/* AI Chat header */}
              <div
                className="px-6 py-5 flex items-center gap-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}
              >
                {/* Animated orb icon */}
                <div className="relative w-10 h-10">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="absolute inset-0 rounded-full opacity-50"
                    style={{ background: 'radial-gradient(circle, #8b5cf6, #00d4ff)', filter: 'blur(6px)' }}
                  />
                  <div
                    className="relative w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#8b5cf6,#00d4ff)' }}
                  >
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">GlobeCart AI</div>
                  <div className="text-xs text-white/40">Your personal global shopping guide</div>
                </div>
                <div
                  className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                  style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.25)' }}
                >
                  <TrendingUp className="w-3 h-3" />
                  GPT-4o Powered
                </div>
              </div>

              {/* Messages area */}
              <div className="px-6 py-6 min-h-[280px]">
                {/* Suggestion chips */}
                {!active && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                    <p className="text-xs text-white/30 mb-4 uppercase tracking-widest font-medium">Try asking</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTIONS.map(s => (
                        <button
                          key={s}
                          onClick={() => triggerAI(s)}
                          className="px-3 py-2 rounded-xl text-xs text-white/60 hover:text-white transition-colors duration-200"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* AI Typing indicator */}
                <AnimatePresence>
                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg,#8b5cf6,#00d4ff)' }}
                      >
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div
                        className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
                        style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
                      >
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: '#8b5cf6' }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI response text */}
                <AnimatePresence>
                  {aiText && (
                    <motion.div
                      key="response"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-5"
                    >
                      <div className="flex items-start gap-3 mb-5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: 'linear-gradient(135deg,#8b5cf6,#00d4ff)' }}
                        >
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div
                          className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-white/80 leading-relaxed"
                          style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
                        >
                          {aiText}
                        </div>
                      </div>
                      {/* Recommendation cards */}
                      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                        {cards.map((card, i) => (
                          <RecommendCardEl key={card.name} card={card} index={i} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input */}
              <div
                className="px-4 py-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)' }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask the AI anything about global products..."
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#8b5cf6,#00d4ff)' }}
                  >
                    <Send className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
