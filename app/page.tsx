'use client';

import React, { useState } from 'react';
import { Brain, Shield, Lightbulb } from 'lucide-react';
import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createPerplexity } from '@ai-sdk/perplexity';
import { createXai } from '@ai-sdk/xai';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const perplexity = createPerplexity({
  apiKey: process.env.PERPLEXITY_API_KEY,
});

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
});

export default function AIEdPsychPlatform() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "✅ AIs are now connected!\n\nHello Ashley! I'm your SuperPlatform coordinator.\n\nTry asking me something like:\n• Create a lesson plan on Self-Determination Theory\n• Literature review on Growth Mindset\n• Build a rubric for motivation"
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
      let model;
      let systemPrompt = "You are an expert in Educational Psychology. Be helpful, practical, and academically sound.";

      const lower = userInput.toLowerCase();

      if (lower.includes("research") || lower.includes("literature") || lower.includes("study") || lower.includes("source")) {
        model = perplexity('sonar-pro');
      } else if (lower.includes("write") || lower.includes("draft") || lower.includes("essay") || lower.includes("chapter")) {
        model = anthropic('claude-3-5-sonnet-20240620');
      } else {
        model = xai('grok-3'); // Default to Grok for teaching ideas and creative tasks
      }

      const { text } = await generateText({
        model,
        system: systemPrompt,
        prompt: userInput,
      });

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "❌ Error connecting to AI. Please make sure your API keys are correct in the .env.local file." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Brain className="w-10 h-10 text-violet-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI EdPsych SuperPlatform</h1>
              <p className="text-gray-500">Grok • Claude • Perplexity Connected</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm">
            <Shield className="w-4 h-4" />
            Privacy Mode Active
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto flex h-[calc(100vh-85px)]">
        {/* Sidebar */}
        <div className="w-80 border-r bg-white p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" /> Quick Workflows
          </h3>
          <div className="space-y-2">
            {[
              "Create lesson plan on Self-Determination Theory",
              "Literature review on Growth Mindset",
              "Design rubric for student engagement",
              "Build conceptual framework for motivation",
              "Generate FigureLabs prompt"
            ].map((title, i) => (
              <button
                key={i}
                onClick={() => setInput(title)}
                className="w-full text-left px-4 py-3 text-sm rounded-2xl hover:bg-violet-50 hover:text-violet-700 transition"
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8 overflow-y-auto space-y-8">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl px-6 py-5 rounded-3xl ${
                  msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-white border border-gray-200'
                }`}>
                  <pre className="whitespace-pre-wrap text-[15.5px] leading-relaxed font-sans">
                    {msg.content}
                  </pre>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-gray-500">Thinking...</div>}
          </div>

          <div className="border-t bg-white p-6">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your task here..."
                  className="flex-1 px-6 py-5 bg-gray-100 border border-gray-300 rounded-3xl focus:outline-none focus:border-violet-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-10 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 text-white font-medium rounded-3xl transition"
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
