import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { name: '研究平台', href: '#dashboard' },
  { name: 'AI 助手', href: '#chat' },
  { name: '技术特性', href: '#features' },
  { name: '关于我们', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-950/80 backdrop-blur-xl border-b border-white/[0.04] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            GyneCold<span className="text-accent-cyan"> AI</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-accent-cyan transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <button className="px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/20 transition-all duration-300">
            接入平台
          </button>
        </div>

        <button
          className="md:hidden text-gray-300"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy-900/95 backdrop-blur-xl border-b border-white/[0.04] px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-400 hover:text-accent-cyan py-2 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="mt-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium">
            接入平台
          </button>
        </div>
      )}
    </nav>
  );
}
