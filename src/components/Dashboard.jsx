import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Users, FlaskConical, TrendingUp, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { icon: Activity, label: '今日分析次数', value: '1,247', change: '+12.5%', up: true },
  { icon: Users, label: '活跃研究者', value: '328', change: '+5.2%', up: true },
  { icon: FlaskConical, label: '研究项目', value: '56', change: '活跃中', up: true },
  { icon: TrendingUp, label: '模型准确率', value: '96.3%', change: '+0.8%', up: true },
];

const logs = [
  { time: '14:32:15', event: '证型分析完成', detail: '寒凝血瘀证 — 置信度 97.2%' },
  { time: '14:28:09', event: '知识库检索', detail: '匹配文献 23 篇，指南 3 篇' },
  { time: '14:15:44', event: '舌象识别', detail: '舌淡紫，苔白滑 — 特征提取完成' },
  { time: '14:10:21', event: '新研究任务', detail: '温经汤加减方疗效 Meta 分析' },
];

export default function Dashboard() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dash-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: '.dash-grid', start: 'top 80%' },
      });
      gsap.fromTo('.log-item', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: '.log-panel', start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="dashboard" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Research Dashboard</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 text-white">
          研究数据<span className="gradient-text">全景监控</span>
        </h2>
        <p className="text-gray-500 max-w-xl">实时追踪 AI 模型运行状态，全面掌握妇科寒症研究数据动态</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, i) => (
          <div key={i} className="dash-card glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <m.icon size={18} className="text-gray-500" />
              <span className={`text-[10px] font-mono ${m.up ? 'text-gray-400' : 'text-gray-600'}`}>{m.change}</span>
            </div>
            <div className="font-mono text-2xl font-bold text-white mb-1">{m.value}</div>
            <div className="text-xs text-gray-600">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="log-panel glass-card p-5 flex flex-col gap-3 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={14} className="text-gray-500" />
          <span className="text-xs font-mono text-gray-500 tracking-wider">SYSTEM LOG</span>
        </div>
        {logs.map((log, i) => (
          <div key={i} className="log-item flex gap-3 items-start pb-3 border-b border-white/[0.03] last:border-0 last:pb-0">
            <span className="text-[10px] font-mono text-gray-700 shrink-0 mt-0.5">{log.time}</span>
            <div>
              <div className="text-xs font-medium text-gray-300">{log.event}</div>
              <div className="text-[11px] text-gray-600">{log.detail}</div>
            </div>
            <div className="ml-auto w-1 h-1 rounded-full mt-1.5 shrink-0 bg-white/20" />
          </div>
        ))}
      </div>
    </section>
  );
}
