import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import Features from './components/Features';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="w-full bg-black min-h-screen">
      <Navbar />
      <main className="w-full">
        <Hero />
        <Dashboard />
        <AIChat />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
