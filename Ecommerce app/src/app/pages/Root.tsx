import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Chatbot } from '../components/Chatbot';

export function Root() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-white text-[#0a0a0a]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
