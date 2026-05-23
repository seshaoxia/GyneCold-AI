import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Database, Cpu, FileText, Shield, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Search,
    title: '智能文献检索',
    desc: '基于 NLP 深度语义理解，自动检索并筛选妇科寒症领域高质量循证文献，支持 PubMed、CNKI 等多数据库源',
  },
  {
    icon: Cpu,
    title: '寒证辨证引擎',
    desc: '融合多模态数据（舌象、脉象、问诊），基于 LLM 推理实现传统中医寒证证型的精准自动辨证',
  },
  {
    icon: Database,
    title: '知识图谱',
    desc: '构建妇科寒症专属知识图谱，涵盖方剂-证型-症状-药理多维关系网络，支持可视化探索',
  },
  {
    icon: FileText,
    title: '方剂分析系统',
    desc: '基于网络药理学与分子对接，自动分析方剂作用靶点、通路及分子机制，辅助科研假设生成',
  },
  {
    icon: BarChart3,
    title: 'Meta 分析工具',
    desc: '自动化数据提取与效应量计算，支持森林图、漏斗图一键生成，加速系统评价与 Meta 分析流程',
  },
  {
    icon: Shield,
    title: '数据安全保障',
    desc: '患者数据全程加密，符合 HIPAA 与《个人信息保护法》要求，研究数据独立存储，安全合规',
  },
];

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: '.feature-grid', start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Core Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 text-white">
            核心技术<span className="gradient-text">能力</span>
          </h2>
          <p className="text-gray-500 max-w-xl">六大核心引擎，构建妇科寒症研究全链路 AI 解决方案</p>
        </div>

        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="feature-card glass-card p-6 group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.04] flex items-center justify-center mb-4 group-hover:bg-white group-hover:border-white transition-all duration-500">
                <f.icon size={18} className="text-gray-500 group-hover:text-black transition-colors duration-500" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
