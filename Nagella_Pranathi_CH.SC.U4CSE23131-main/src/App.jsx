import React, { useState } from 'react';
import DisclaimerBanner from './components/DisclaimerBanner';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PatientForm from './components/PatientForm';
import ReasoningPipeline from './components/ReasoningPipeline';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import {
  runReasoningEngine,
  INITIAL_INPUTS,
  DEMO_CASE,
} from './engine/reasoningEngine';
import { ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inputs, setInputs] = useState(INITIAL_INPUTS);
  const [results, setResults] = useState(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Trigger reasoning engine analysis with simulated ~500ms AI processing animation
  const handleAnalyze = () => {
    setIsLoading(true);
    setTimeout(() => {
      const output = runReasoningEngine(inputs);
      setResults(output);
      setHasAnalyzed(true);
      setIsLoading(false);
    }, 500);
  };

  // Populate Demo Case & run analysis automatically
  const handleLoadDemo = () => {
    setInputs(DEMO_CASE);
    setIsLoading(true);
    setTimeout(() => {
      const output = runReasoningEngine(DEMO_CASE);
      setResults(output);
      setHasAnalyzed(true);
      setIsLoading(false);
    }, 500);
  };

  // Reset inputs & results to initial state
  const handleReset = () => {
    setInputs(INITIAL_INPUTS);
    setResults(null);
    setHasAnalyzed(false);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-teal-500 selection:text-navy-950 font-sans">
      {/* 1. Persistent Top Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 2. Top Bar Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Main Content Container */}
      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <div>
            {/* Hero Section */}
            <HeroSection />

            {/* Main Dashboard Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Left Column: Patient Information Input */}
                <div className="lg:col-span-4">
                  <PatientForm
                    inputs={inputs}
                    setInputs={setInputs}
                    onAnalyze={handleAnalyze}
                    onLoadDemo={handleLoadDemo}
                    onReset={handleReset}
                    isLoading={isLoading}
                  />
                </div>

                {/* Right Column: AI Reasoning Stages */}
                <div className="lg:col-span-8">
                  <ReasoningPipeline
                    results={results}
                    hasAnalyzed={hasAnalyzed}
                    isLoading={isLoading}
                  />
                </div>

              </div>
            </div>
          </div>
        )}

        {activeTab === 'how-it-works' && <HowItWorks />}

        {activeTab === 'about' && <About />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-navy-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">MEDIGUIDE</span>
            <span>— Uncertainty-Aware Medical Decision Support Prototype</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Educational Prototype — Not a Medical Diagnosis Tool</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
