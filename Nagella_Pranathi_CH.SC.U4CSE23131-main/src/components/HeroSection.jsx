import React from 'react';
import { Database, Sliders, GitMerge } from 'lucide-react';

export default function HeroSection() {
  const features = [
    {
      title: 'Knowledge Representation',
      tag: 'Facts + rules',
      description: 'Structured domain rules and explicit fact extraction.',
      icon: Database,
    },
    {
      title: 'Fuzzy Logic',
      tag: 'Handles vague severity',
      description: 'Calculates degree of severity for ambiguous symptoms.',
      icon: Sliders,
    },
    {
      title: 'Bayesian Inference',
      tag: 'Updates beliefs with evidence',
      description: 'Updates belief probabilities as new evidence arrives.',
      icon: GitMerge,
    },
  ];

  return (
    <section className="py-8 border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Reason Under Uncertainty.
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            MediGuide combines knowledge representation, fuzzy reasoning, and Bayesian inference to generate explainable next-step recommendations.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="health-card p-4 rounded-xl border border-slate-800 flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-lg bg-slate-800 text-teal-400 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white">
                      {feature.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                      {feature.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
