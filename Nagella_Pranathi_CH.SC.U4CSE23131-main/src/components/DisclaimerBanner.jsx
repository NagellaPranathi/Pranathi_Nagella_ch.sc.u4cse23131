import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-950/40 border-b border-amber-500/20 px-4 py-2 text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-amber-300 font-semibold">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Educational decision-support prototype — not a medical diagnosis.</span>
        </div>
        <div className="text-slate-400 text-[11px]">
          Demonstrating Knowledge Representation, Fuzzy Logic & Bayesian Inference
        </div>
      </div>
    </div>
  );
}
