import React from 'react';
import { Activity, LayoutDashboard, Cpu, Info } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'how-it-works', label: 'How It Works', icon: Cpu },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="border-b border-slate-800 bg-gray-900/90 sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Software Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg font-bold tracking-tight text-white font-sans">MediGuide</h1>
                <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Decision Support Demo
                </span>
              </div>
              <p className="text-xs text-slate-400">Uncertainty-Aware Reasoning Framework</p>
            </div>
          </div>

          {/* Clean SaaS Tab Switcher */}
          <nav className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

        </div>
      </div>
    </header>
  );
}
