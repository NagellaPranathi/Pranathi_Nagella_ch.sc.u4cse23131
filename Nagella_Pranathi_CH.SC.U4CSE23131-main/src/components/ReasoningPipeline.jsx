import React from 'react';
import {
  Cpu,
  Database,
  Sliders,
  GitMerge,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Info
} from 'lucide-react';

export default function ReasoningPipeline({ results, hasAnalyzed, isLoading }) {
  if (!hasAnalyzed) {
    return (
      <div className="health-card rounded-xl border border-slate-800 p-8 sm:p-12 text-center flex flex-col items-center justify-center h-full min-h-[420px]">
        <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 text-teal-400">
          <Cpu className="w-6 h-6" />
        </div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono mb-3 border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-teal-400"></span>
          ● AI Engine Ready
        </div>
        <h3 className="text-base font-bold text-white mb-2">Enter the case and click Analyze Case.</h3>
        <p className="text-slate-400 text-xs max-w-md leading-relaxed">
          Fill out the patient symptoms on the left or click "Load Demo Case" to inspect the knowledge rules, fuzzy logic severity gauge, Bayesian updates, and decision recommendations.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="health-card rounded-xl border border-slate-800 p-8 text-center flex flex-col items-center justify-center h-full min-h-[420px]">
        <div className="w-10 h-10 rounded-full border-2 border-teal-500 border-t-transparent animate-spin mb-4"></div>
        <span className="text-xs font-mono text-teal-400 mb-1">● Computing Pipeline Execution...</span>
        <p className="text-xs text-slate-400">Evaluating Knowledge Base & Probability Distributions</p>
      </div>
    );
  }

  const {
    facts,
    rules,
    overallSeverity,
    fuzzyMemberships,
    classification,
    bayesianResults,
    priority,
    recommendation,
    rationale,
    trace,
  } = results;

  const priorityBadgeStyle =
    priority === 'URGENT'
      ? 'bg-rose-950/80 text-rose-300 border-rose-800/80'
      : priority === 'PRIORITY'
      ? 'bg-amber-950/80 text-amber-300 border-amber-800/80'
      : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80';

  return (
    <div className="space-y-5">

      {/* Header Status Bar */}
      <div className="health-card rounded-xl p-3.5 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-slate-800 text-teal-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Reasoning</h3>
            <p className="text-[11px] text-slate-400">Explainable Decision Support Execution</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          ● Analysis Complete
        </div>
      </div>


      {/* STAGE 1 — KNOWLEDGE REPRESENTATION */}
      <div className="health-card rounded-xl border border-slate-800 p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
              01 Knowledge Representation
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">Facts Extracted & Rules Matched</span>
        </div>

        {/* Extracted Facts */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Facts Extracted From Input
          </span>
          <div className="flex flex-wrap gap-2">
            {facts.map((fact, idx) => (
              <div
                key={idx}
                className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs flex items-center gap-1.5"
              >
                <span className="text-slate-400">{fact.label}:</span>
                <span
                  className={`font-semibold font-mono text-[11px] ${
                    fact.level === 'HIGH' || fact.level === 'SEVERE'
                      ? 'text-rose-400'
                      : fact.level === 'MODERATE'
                      ? 'text-amber-400'
                      : 'text-slate-300'
                  }`}
                >
                  {fact.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Triggered Rules */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Relevant Rules Triggered
          </span>
          <div className="space-y-1.5">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-teal-400 font-mono text-[10px] font-bold shrink-0">
                    {rule.id}
                  </span>
                  <span className="text-slate-200 font-mono text-[11px] truncate">{rule.text}</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase shrink-0 font-medium">{rule.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* STAGE 2 — FUZZY LOGIC */}
      <div className="health-card rounded-xl border border-slate-800 p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-teal-400" />
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
              02 Fuzzy Severity
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">Continuous Degree</span>
        </div>

        {/* Dynamic Severity Overview */}
        <div className="flex items-center justify-between mb-4 bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block">Overall Severity</span>
            <span className="text-xl font-bold text-white font-mono">{overallSeverity.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Classification</span>
            <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
              classification === 'HIGH' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
              classification === 'MEDIUM' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
              'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}>
              {classification}
            </span>
          </div>
        </div>

        {/* Horizontal Gauge Bar */}
        <div className="mb-5">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>LOW (0.0)</span>
            <span>MEDIUM (0.5)</span>
            <span>HIGH (1.0)</span>
          </div>
          
          <div className="relative w-full h-3 bg-slate-950 rounded-full border border-slate-800 p-0.5 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900 rounded-full"></div>
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${overallSeverity * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Fuzzy Membership values */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Membership Values μ(x)
          </span>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Low</span>
              <span className="text-sm font-bold text-slate-200 font-mono">{fuzzyMemberships.low.toFixed(2)}</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Medium</span>
              <span className="text-sm font-bold text-amber-400 font-mono">{fuzzyMemberships.medium.toFixed(2)}</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">High</span>
              <span className="text-sm font-bold text-rose-400 font-mono">{fuzzyMemberships.high.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>


      {/* STAGE 3 — BAYESIAN INFERENCE */}
      <div className="health-card rounded-xl border border-slate-800 p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
              03 Bayesian Belief Update
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Prior vs Posterior</span>
        </div>

        <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 mb-4 text-xs text-slate-400 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span>Illustrative hypotheses demonstrating probability updates from clinical evidence.</span>
        </div>

        <div className="space-y-3">
          {bayesianResults.map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{item.name}</span>
                <span className="text-slate-400 font-mono">
                  Prior <span className="text-slate-200">{item.prior.toFixed(2)}</span> → Posterior{' '}
                  <span className="text-teal-400 font-bold">{item.posterior.toFixed(2)}</span>
                </span>
              </div>

              <div className="relative w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${item.posterior * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* STAGE 4 — DECISION ENGINE */}
      <div className="health-card rounded-xl border border-slate-800 p-5 bg-slate-900">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
              04 Decision Engine
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">Safety & Rules</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-center">
            <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
              Priority
            </span>
            <span className={`inline-block px-2.5 py-1 rounded text-sm font-extrabold font-mono text-center border ${priorityBadgeStyle}`}>
              {priority}
            </span>
          </div>

          <div className="sm:col-span-2 bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-center">
            <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
              Recommendation
            </span>
            <p className="text-xs font-bold text-white">
              "{recommendation}"
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <h5 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
            WHY? Rationale Trace
          </h5>
          <div className="space-y-1.5">
            {rationale.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* EXPLANATION TRACE */}
      <div className="health-card rounded-xl border border-slate-800 p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
              Explanation Trace
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">Step-by-step pipeline execution</span>
        </div>

        <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {trace.map((item) => (
            <div key={item.step} className="relative">
              <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-teal-500 border border-slate-900"></div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-xs">
                <span className="font-bold text-white block mb-0.5">
                  Step {item.step}: {item.title}
                </span>
                <p className="text-slate-400 text-[11px]">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
