'use client';

import React, { useState } from 'react';
import { Brain, Shield } from 'lucide-react';

export default function AIEdPsychPlatform() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello Ashley! 👋\n\nThe platform is now running.\n\nType a message below to test." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "This is a test response. The basic interface is working.\n\nWe'll connect the real AIs next."
      }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Brain className="w-9 h-9 text-violet-600" />
            <h1 className="text-2xl font-bold">AI EdPsych SuperPlatform</h1>
          </div>
          <div className="flex items-center gap-2 text-emerald-600">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Privacy Mode</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-3xl shadow-sm border p-8 min-h-[70vh] flex flex-col">
          <div className="flex-1 space-y-6 mb-8">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl px-5 py-4 rounded-2xl ${msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-gray-100'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && <div>Thinking...</div>}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 px-6 py-4 border rounded-2xl focus:outline-none focus:border-violet-500"
            />
            <button
              type="submit"
              className="px-8 bg-violet-600 text-white rounded-2xl hover:bg-violet-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
