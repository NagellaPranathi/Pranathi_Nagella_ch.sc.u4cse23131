import React from 'react';
import { UserCheck, Play, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';

export default function PatientForm({
  inputs,
  setInputs,
  onAnalyze,
  onLoadDemo,
  onReset,
  isLoading,
}) {
  const handleChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const symptomOptions = ['None', 'Mild', 'Moderate', 'Severe'];

  return (
    <div className="health-card rounded-xl border border-slate-800 p-5 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-800 text-teal-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Patient Information</h3>
            <p className="text-[11px] text-slate-400">Input clinical observations for reasoning</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-3.5 flex-1">
        
        {/* 1. Dizziness */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            1. Dizziness
          </label>
          <select
            value={inputs.dizziness}
            onChange={(e) => handleChange('dizziness', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            {symptomOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Sweating */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            2. Sweating
          </label>
          <select
            value={inputs.sweating}
            onChange={(e) => handleChange('sweating', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            {symptomOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Weakness */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            3. Weakness
          </label>
          <select
            value={inputs.weakness}
            onChange={(e) => handleChange('weakness', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            {symptomOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Chest discomfort */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-300">
              4. Chest discomfort
            </label>
            {inputs.chestDiscomfort === 'Severe' && (
              <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Safety Rule Active
              </span>
            )}
          </div>
          <select
            value={inputs.chestDiscomfort}
            onChange={(e) => handleChange('chestDiscomfort', e.target.value)}
            className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none ${
              inputs.chestDiscomfort === 'Severe'
                ? 'border-amber-500 text-amber-200'
                : 'border-slate-700 focus:border-teal-500'
            }`}
          >
            {symptomOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 5. Medical history */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            5. Medical history
          </label>
          <select
            value={inputs.medicalHistory}
            onChange={(e) => handleChange('medicalHistory', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option value="Unknown">Unknown</option>
            <option value="No relevant history">No relevant history</option>
            <option value="Relevant history">Relevant history</option>
          </select>
        </div>

        {/* 6. New evidence */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            6. New evidence
          </label>
          <select
            value={inputs.newEvidence}
            onChange={(e) => handleChange('newEvidence', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option value="None">None</option>
            <option value="Positive evidence">Positive evidence</option>
            <option value="Negative evidence">Negative evidence</option>
          </select>
        </div>

      </div>

      {/* Buttons */}
      <div className="pt-4 mt-4 border-t border-slate-800 space-y-2">
        
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Analyze Case</span>
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onLoadDemo}
            disabled={isLoading}
            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Load Demo Case</span>
          </button>

          <button
            onClick={onReset}
            disabled={isLoading}
            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

      </div>
    </div>
  );
}
