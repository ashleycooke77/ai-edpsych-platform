'use client';

import React, { useState } from 'react';
import { Brain, Shield, Lightbulb, BookOpen, Users } from 'lucide-react';

export default function AIEdPsychPlatform() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello Ashley! 👋\n\nWelcome to your **AI EdPsych SuperPlatform**.\n\nI'm your personal coordinator for Grok, Claude, Perplexity, and FigureLabs.\n\nWhat would you like to work on today?"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const currentInput = input;
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `✅ Task received: "${currentInput}"\n\nI'll route this intelligently:\n• Research & sources → Perplexity\n• Deep writing → Claude\n• Creative + teaching ideas → Grok\n• Visuals → FigureLabs\n\nReady to proceed?`
      }]);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Brain className="w-10 h-10 text-violet-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI EdPsych SuperPlatform</h1>
              <p className="text-gray-500">Educational Psychology • PhD + Teaching Workflow</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="w-4 h-4" />
            Privacy Mode (Anonymized)
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto flex h-[calc(100vh-85px)]">
        {/* Sidebar */}
        <div className="w-80 border-r bg-white p-6 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" /> Quick Start Workflows
          </h3>
          <div className="space-y-2">
            {[
              "Create a Lesson Plan on Self-Determination Theory",
              "Literature Review on Growth Mindset Interventions",
              "Design a Rubric for Student Motivation Assessment",
              "Build a Conceptual Framework",
              "Generate FigureLabs Prompts for a Theory Model",
              "Draft a Dissertation Section"
            ].map((title, i) => (
              <button
                key={i}
                onClick={() => setInput(title)}
                className="w-full text-left px-4 py-3 text-sm rounded-2xl hover:bg-violet-50 hover:text-violet-700 transition border border-transparent hover:border-violet-100"
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl px-6 py-5 rounded-3xl ${
                  msg.role === 'user' 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <pre className="whitespace-pre-wrap text-[15.5px] leading-relaxed font-sans">
                    {msg.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-6">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your task (e.g. Create a lesson plan on cognitive load theory...)"
                  className="flex-1 px-6 py-5 bg-gray-100 border border-gray-300 rounded-3xl focus:outline-none focus:border-violet-500 text-base"
                />
                <button
                  type="submit"
                  className="px-10 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-3xl transition"
                >
                  Send
                </button>
              </div>
              <p className="text-center text-xs text-gray-500 mt-4">
                ⚠️ Always anonymize student data before submitting
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
}

