import React from 'react';
import { ShieldAlert, CheckCircle, Cpu, FileCode2, GraduationCap } from 'lucide-react';

export default function About() {
  const coreConcepts = [
    { title: 'Knowledge Representation', desc: 'Facts + rules + relationships' },
    { title: 'Fuzzy Logic', desc: 'Degrees of severity instead of binary TRUE/FALSE' },
    { title: 'Bayesian Inference', desc: 'Updating belief probabilities with evidence' },
    { title: 'Rule-Based Decision Making', desc: 'Safety overrides and priority rules' },
    { title: 'Explainable AI', desc: 'Transparent step-by-step reasoning trace' },
  ];

  return (
    <div className="py-8 space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-teal-400 text-xs font-mono mb-3 border border-slate-700">
          <GraduationCap className="w-3.5 h-3.5" /> Academic AI Case-Study
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">About MediGuide</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          MediGuide is an academic AI case-study prototype designed to demonstrate reasoning under uncertainty.
        </p>
      </div>

      {/* Prominent Disclaimer Box */}
      <div className="health-card p-5 rounded-xl border-l-4 border-l-amber-500 border border-slate-800 bg-slate-900">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-amber-950 text-amber-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
              IMPORTANT DISCLAIMER
            </h3>
            <p className="text-xs font-bold text-white leading-relaxed uppercase">
              "MEDIGUIDE IS AN EDUCATIONAL PROTOTYPE. IT DOES NOT PROVIDE MEDICAL DIAGNOSIS OR REPLACE A QUALIFIED HEALTHCARE PROFESSIONAL."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              This application is built exclusively for demonstration in academic computer science presentations. The hypotheses and probability scores are illustrative mathematical constructs.
            </p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="health-card p-5 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Cpu className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-bold text-white">Core AI Concepts Demonstrated</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {coreConcepts.map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Footnote */}
      <div className="health-card p-4 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
        <FileCode2 className="w-4 h-4 text-slate-400 shrink-0" />
        <span>Built with React, Vite, Tailwind CSS, and local JavaScript reasoning logic.</span>
      </div>

    </div>
  );
}
