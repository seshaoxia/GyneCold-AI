import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import Features from './components/Features';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative w-full bg-black min-h-screen">
      <ThreeBackground />
      <div className="absolute inset-0 hex-grid pointer-events-none" />
      <Navbar />
      <main className="relative z-10 w-full">
        <Hero />
        <Dashboard />
        <AIChat />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
