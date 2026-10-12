import React from 'react';
import { Database, Sliders, GitMerge, ArrowRight, ShieldCheck, CheckCircle, Cpu } from 'lucide-react';

export default function HowItWorks() {
  const concepts = [
    {
      title: 'Knowledge Representation',
      question: 'What do we know?',
      description:
        'Transforms observations into symbolic facts and logical rules (IF-THEN clauses) representing domain heuristics.',
      example: 'Symptom → Severity → Decision Rule',
      icon: Database,
    },
    {
      title: 'Fuzzy Logic',
      question: 'How severe is it?',
      description:
        'Assigns partial set membership degrees between 0.0 and 1.0 to model continuous, ambiguous symptom intensities.',
      example: 'High Severity Membership = 0.72',
      icon: Sliders,
    },
    {
      title: 'Bayesian Inference',
      question: 'How should new evidence change our belief?',
      description:
        'Updates probability distributions over hypotheses as new clinical evidence arrives.',
      example: 'Prior belief + Evidence ↓ Posterior belief',
      icon: GitMerge,
    },
  ];

  const diagramSteps = [
    { name: 'User Input', sub: 'Symptoms & history', icon: Cpu },
    { name: 'Knowledge Base', sub: 'Facts & rules', icon: Database },
    { name: 'Fuzzy Engine', sub: 'Severity gauge', icon: Sliders },
    { name: 'Bayesian Engine', sub: 'Belief updates', icon: GitMerge },
    { name: 'Decision Engine', sub: 'Priority rules', icon: ShieldCheck },
    { name: 'Recommendation', sub: 'Explainable guidance', icon: CheckCircle },
  ];

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
          How MediGuide Works
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          MediGuide combines symbolic AI rules, fuzzy boundary logic, and probabilistic belief updates for explainable decision support.
        </p>
      </div>

      {/* Concept Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {concepts.map((concept, idx) => {
          const Icon = concept.icon;
          return (
            <div
              key={idx}
              className="health-card p-5 rounded-xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="p-2 rounded-lg bg-slate-800 text-teal-400 inline-block mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">{concept.title}</h3>
                <span className="text-xs font-mono text-teal-400 block mb-2">
                  "{concept.question}"
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {concept.description}
                </p>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Example:</span>
                <span className="text-teal-300 font-medium">{concept.example}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Flow Diagram */}
      <div className="health-card p-6 rounded-xl border border-slate-800">
        <div className="mb-6">
          <h3 className="text-base font-bold text-white mb-1">Architecture Flow Diagram</h3>
          <p className="text-xs text-slate-400">Sequential data flow through reasoning modules</p>
        </div>

        {/* Flow Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3">
          {diagramSteps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === diagramSteps.length - 1;

            return (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-full bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col items-center text-center h-full justify-center">
                  <div className="p-2 rounded-md bg-slate-800 text-teal-400 mb-2">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white mb-0.5">{step.name}</span>
                  <span className="text-[10px] text-slate-400">{step.sub}</span>
                </div>

                {!isLast && (
                  <div className="my-1.5 hidden md:block text-slate-600">
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
