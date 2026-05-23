import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Dna, Microscope, Brain } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' });
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
      gsap.fromTo('.hero-cta', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' });
      gsap.fromTo('.hero-stat', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8, stagger: 0.15, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Dna, label: '寒症证型识别', value: '98.7%', sub: '准确率' },
    { icon: Microscope, label: '知识库条目', value: '12,000+', sub: '文献支撑' },
    { icon: Brain, label: 'AI 推理引擎', value: 'GPT-4o', sub: '深度推理' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/50 to-navy-950 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-10 hero-title">
          <span className="pulse-dot" />
          <span className="text-xs font-mono text-accent-cyan tracking-wider">AI RESEARCH PLATFORM v2.0</span>
        </div>

        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6">
          妇科寒症
          <br />
          <span className="gradient-text">智能研究平台</span>
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          基于大语言模型与多模态感知技术，构建妇科寒症精准辨证、
          <br className="hidden md:block" />
          智能辅助诊疗与机制研究一体化的 AI 科研平台
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue text-navy-950 font-semibold text-sm hover:shadow-lg hover:shadow-accent-cyan/20 transition-all duration-300 flex items-center gap-2">
            开始研究
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-3.5 rounded-full border border-white/10 text-gray-300 text-sm font-medium hover:border-accent-cyan/40 hover:text-accent-cyan transition-all duration-300">
            查看文档
          </button>
        </div>

        <div className="hero-stat grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <s.icon size={20} className="text-accent-cyan mx-auto mb-2" />
              <div className="font-mono text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              <div className="text-[10px] text-gray-600">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-accent-cyan animate-bounce" />
        </div>
      </div>
    </section>
  );
}
