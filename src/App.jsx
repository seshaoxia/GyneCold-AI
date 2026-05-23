import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import Features from './components/Features';
import Footer from './components/Footer';

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full bg-black min-h-screen">
      <ThreeBackground />
      <div className="absolute inset-0 hex-grid pointer-events-none" />
      <Navbar />
      <main className="relative z-10 w-full flex flex-col items-center">
        <Hero />
        <Dashboard />
        <AIChat />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
