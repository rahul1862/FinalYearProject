import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { SupportChat } from '../components/SupportChat';
import { Footer } from '../components/Footer';

export function Root() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(185,118,63,0.18),_transparent_54%)]" />
      <div className="pointer-events-none absolute left-[-12rem] top-[18rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(233,222,205,0.85),_transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[42rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,_rgba(155,176,166,0.24),_transparent_68%)] blur-3xl" />
      <Header />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
      <SupportChat />
    </div>
  );
}
