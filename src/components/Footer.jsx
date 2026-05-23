import { Sparkles, Code2, Globe, Heart } from 'lucide-react';

const links = {
  产品: ['研究平台', 'AI 助手', 'API 文档', '更新日志'],
  资源: ['文献库', '知识图谱', '方剂数据库', '研究案例'],
  关于: ['团队介绍', '合作伙伴', '联系方式', '加入我们'],
};

export default function Footer() {
  return (
    <footer id="about" className="relative z-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                <Sparkles size={14} className="text-black" />
              </div>
              <span className="font-semibold text-white">
                GyneCold<span className="text-gray-500">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              妇科寒症智能辅助诊疗研究平台，融合 AI 与传统中医学
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-gray-700 hover:text-white transition-colors"><Code2 size={16} /></a>
              <a href="#" className="text-gray-700 hover:text-white transition-colors"><Globe size={16} /></a>
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-700 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.03] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700">
            &copy; 2025 GyneCold AI Research Platform. All rights reserved.
          </p>
          <p className="text-xs text-gray-800 flex items-center gap-1">
            Made with <Heart size={10} className="text-gray-500" /> by GyneCold Research Team
          </p>
        </div>
      </div>
    </footer>
  );
}
