'use client';

import React, { useState } from 'react';
import { Brain, Shield } from 'lucide-react';

export default function AIEdPsychPlatform() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "🔧 API Connection Test Mode\n\nType a message and send it.\n\nThis version will show us what's happening with your API keys." 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Debug: Check which API keys are loaded
    const debug = {
      XAI: !!process.env.XAI_API_KEY,
      ANTHROPIC: !!process.env.ANTHROPIC_API_KEY,
      PERPLEXITY: !!process.env.PERPLEXITY_API_KEY,
    };

    setDebugInfo(`Debug Info:\nXAI: ${debug.XAI ? '✅ Loaded' : '❌ Missing'}\nClaude: ${debug.ANTHROPIC ? '✅ Loaded' : '❌ Missing'}\nPerplexity: ${debug.PERPLEXITY ? '✅ Loaded' : '❌ Missing'}`);

    // Simple mock response for now
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `This is a test response.\n\n${debugInfo}\n\nIf you see missing keys above, check your .env.local file.`
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Brain className="w-10 h-10 text-violet-500" />
            <div>
              <h1 className="text-3xl font-bold">AI EdPsych SuperPlatform</h1>
              <p className="text-zinc-400">API Connection Debug Mode</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Shield className="w-4 h-4" />
            <span>Privacy Mode</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 min-h-[70vh] flex flex-col">
          <div className="flex-1 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl px-6 py-4 rounded-2xl ${msg.role === 'user' ? 'bg-violet-600' : 'bg-zinc-800'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type here to test..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-violet-600 hover:bg-violet-700 px-8 rounded-2xl"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
}
