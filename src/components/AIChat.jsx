import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const initialMessages = [
  { role: 'assistant', content: '您好，我是 GyneCold AI 研究助手。我可以协助您进行妇科寒症相关的文献分析、证型辨证、方剂推荐及机制研究。请描述您的科研问题。' },
];

const suggestions = [
  '寒凝血瘀证的分子机制研究进展',
  '温经汤治疗原发性痛经的Meta分析',
  '基于舌象的寒症分型诊断模型',
  '当归四逆汤加减方的药理分析',
];

export default function AIChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.chat-section-title', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.fromTo('.chat-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    const query = text || input.trim();
    if (!query || isLoading) return;

    const userMsg = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.gynecology-ai.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || data.content }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: '我正在研究中，请您稍候。如需即时响应，请确保后端 API 服务已正确配置。您可以将后端 API 地址替换为实际的 GyneCold Agent 服务端点。',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section ref={sectionRef} id="chat" className="relative z-10 max-w-4xl mx-auto px-6 py-24">
      <div className="chat-section-title flex flex-col items-center text-center mb-12">
        <span className="text-xs font-mono text-accent-cyan tracking-widest uppercase">AI Research Copilot</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4">
          GyneCold<span className="gradient-text"> AI 助手</span>
        </h2>
        <p className="text-gray-500 max-w-xl">基于大语言模型的智能科研对话系统，支持多轮深度学术问答</p>
      </div>

      <div className="chat-card glass-card overflow-hidden">
        <div className="h-[400px] overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' ? 'bg-accent-cyan/10 text-accent-cyan' : 'bg-accent-blue/10 text-accent-blue'
              }`}>
                {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
              </div>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'assistant'
                  ? 'bg-navy-600/50 text-gray-300 rounded-tl-sm'
                  : 'bg-accent-cyan/10 text-gray-200 rounded-tr-sm border border-accent-cyan/20'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-accent-cyan/10 flex items-center justify-center shrink-0">
                <Bot size={14} className="text-accent-cyan" />
              </div>
              <div className="bg-navy-600/50 rounded-2xl rounded-tl-sm px-4 py-3">
                <Loader2 size={16} className="animate-spin text-accent-cyan" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-navy-600/50 border border-white/[0.04] text-gray-500 hover:text-accent-cyan hover:border-accent-cyan/20 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-white/[0.04] p-4 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入您的研究问题..."
            className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan hover:bg-accent-cyan/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
          </button>
        </div>
      </div>
    </section>
  );
}
