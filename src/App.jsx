import Navbar from './components/Navbar';
import Footer from './components/Footer';

function SimpleHero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-10">
          <span className="pulse-dot" />
          <span className="text-xs font-mono text-gray-400 tracking-wider">AI RESEARCH PLATFORM v2.0</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6 text-white">
          妇科寒症<br />
          <span className="gradient-text">智能研究平台</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          基于大语言模型与多模态感知技术，构建妇科寒症精准辨证、智能辅助诊疗与机制研究一体化的 AI 科研平台
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all duration-300 flex items-center gap-2">
            开始研究 <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
          <button className="px-8 py-3.5 rounded-full border border-white/[0.08] text-gray-400 text-sm font-medium hover:border-white/20 hover:text-white transition-all duration-300">
            查看文档
          </button>
        </div>
      </div>
    </section>
  );
}

function SimpleDashboard() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Research Dashboard</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 text-white">
            研究数据<span className="gradient-text">全景监控</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">实时追踪 AI 模型运行状态，全面掌握妇科寒症研究数据动态</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {['1,247', '328', '56', '96.3%'].map((v, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <div className="font-mono text-2xl font-bold text-white mb-1">{v}</div>
              <div className="text-xs text-gray-600">{['今日分析次数','活跃研究者','研究项目','模型准确率'][i]}</div>
            </div>
          ))}
        </div>

        <div className="glass-card p-5 max-w-2xl mx-auto">
          <div className="text-xs font-mono text-gray-500 tracking-wider mb-3">SYSTEM LOG</div>
          <div className="space-y-3">
            <p className="text-xs text-gray-300">14:32:15 — 证型分析完成 — 寒凝血瘀证 置信度 97.2%</p>
            <p className="text-xs text-gray-300">14:28:09 — 知识库检索 — 匹配文献 23 篇</p>
            <p className="text-xs text-gray-300">14:15:44 — 舌象识别 — 特征提取完成</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="w-full bg-black min-h-screen">
      <Navbar />
      <main className="w-full">
        <SimpleHero />
        <SimpleDashboard />
      </main>
      <Footer />
    </div>
  );
}
