import { GCNavbar } from '../components/globecart/GCNavbar';
import { HeroSection } from '../components/globecart/HeroSection';
import { TrendingCountries } from '../components/globecart/TrendingCountries';
import { LiveFeed } from '../components/globecart/LiveFeed';
import { AISection } from '../components/globecart/AISection';
import { FeaturedProducts } from '../components/globecart/FeaturedProducts';
import { GCFooter } from '../components/globecart/GCFooter';
import { Chatbot } from '../components/Chatbot';

export function GlobeCartPage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: '#050510',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
      }}
    >
      <GCNavbar />

      {/* Each section has an id so navbar + hero CTAs can scroll to it */}
      <div id="hero">
        <HeroSection />
      </div>

      <div id="countries">
        <TrendingCountries />
      </div>

      <div id="live-feed">
        <LiveFeed />
      </div>

      <div id="ai-shop">
        <AISection />
      </div>

      <div id="featured">
        <FeaturedProducts />
      </div>

      <GCFooter />
      <Chatbot />
    </div>
  );
}
