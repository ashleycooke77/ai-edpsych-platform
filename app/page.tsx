'use client';

import React, { useState } from 'react';
import { Brain, Shield, Lightbulb } from 'lucide-react';
import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createPerplexity } from '@ai-sdk/perplexity';
import { createXai } from '@ai-sdk/xai';

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const perplexity = createPerplexity({ apiKey: process.env.PERPLEXITY_API_KEY });
const xai = createXai({ apiKey: process.env.XAI_API_KEY });

export default function AIEdPsychPlatform() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello Ashley! 👋\n\nWelcome to your AI EdPsych SuperPlatform.\n\nI'm ready to help with lesson planning, research, rubrics, frameworks, and more."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userInput }]);
    setInput('');
    setIsLoading(true);

    try {
      const lower = userInput.toLowerCase();
      let model;
      let systemPrompt = "You are an expert in Educational Psychology. Be practical, insightful, and academically rigorous.";

      if (lower.includes("research") || lower.includes("literature") || lower.includes("source")) {
        model = perplexity('sonar-pro');
      } else if (lower.includes("write") || lower.includes("draft") || lower.includes("chapter")) {
        model = anthropic('claude-3-5-sonnet-20240620');
      } else {
        model = xai('grok-3');
      }

      const { text } = await generateText({
        model,
        system: systemPrompt,
        prompt: userInput,
      });

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "❌ Error: Could not connect to AI. Please check your API keys in .env.local" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Brain className="w-10 h-10 text-violet-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">AI EdPsych SuperPlatform</h1>
              <p className="text-zinc-400">Grok • Claude • Perplexity</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-900/50 text-emerald-400 px-4 py-2 rounded-full text-sm border border-emerald-800">
            <Shield className="w-4 h-4" />
            Privacy Mode Active
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto flex h-[calc(100vh-85px)]">
        {/* Sidebar */}
        <div className="w-80 border-r border-zinc-800 bg-zinc-900 p-6 overflow-y-auto">
          <h3 className="font-semibold mb-5 flex items-center gap-2 text-white">
            <Lightbulb className="w-5 h-5 text-yellow-400" /> 
            Quick Workflows
          </h3>
          <div className="space-y-2">
            {[
              "Create lesson plan on Self-Determination Theory",
              "Literature review on Growth Mindset",
              "Design rubric for student motivation",
              "Build conceptual framework for learning",
              "Generate FigureLabs prompt"
            ].map((title, i) => (
              <button
                key={i}
                onClick={() => setInput(title)}
                className="w-full text-left px-5 py-3.5 text-sm rounded-2xl hover:bg-zinc-800 transition border border-zinc-800 hover:border-violet-500/30 text-zinc-200"
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8 overflow-y-auto space-y-8">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl px-6 py-5 rounded-3xl ${
                  msg.role === 'user' 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-zinc-900 border border-zinc-700 text-white'
                }`}>
                  <pre className="whitespace-pre-wrap text-[15.5px] leading-relaxed font-sans">
                    {msg.content}
                  </pre>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-zinc-400 pl-4">Thinking...</div>}
          </div>

          {/* Input Area */}
          <div className="border-t border-zinc-800 bg-zinc-900 p-6">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your task in educational psychology..."
                  className="flex-1 px-6 py-5 bg-zinc-800 border border-zinc-700 rounded-3xl focus:outline-none focus:border-violet-500 text-white placeholder-zinc-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-12 bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-700 text-white font-medium rounded-3xl transition"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
