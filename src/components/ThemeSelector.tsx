/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeType } from '../types';
import { Zap, Sparkles } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onChange: (theme: ThemeType) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onChange }) => {
  const isMinimal = currentTheme === 'minimal';
  return (
    <div className={`fixed top-0 left-0 right-0 z-[1001] flex justify-center py-2 shadow-sm border-b select-none font-cairo transition-all duration-300 ${
      isMinimal
        ? 'bg-white/95 border-gray-200'
        : 'bg-black/95 border-white/5'
    }`}>
      <div className={`flex rounded-lg overflow-hidden p-0.5 border transition-all duration-300 ${
        isMinimal
          ? 'border-gray-200 bg-gray-50'
          : 'border-white/10 bg-slate-900'
      }`}>
        <button
          onClick={() => onChange('minimal')}
          className={`flex items-center gap-1.5 px-5 py-1.5 cursor-pointer text-xs font-semibold transition-all duration-300 rounded-l-md ${
            currentTheme === 'minimal'
              ? 'bg-blue-600 text-white shadow-sm font-bold'
              : isMinimal
                ? 'text-gray-600 hover:bg-gray-200/50'
                : 'text-gray-400 hover:text-white hover:bg-slate-800/30'
          }`}
          id="btn-theme-minimal"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>✨ النمط البسيط</span>
        </button>
        <button
          onClick={() => onChange('pulse')}
          className={`flex items-center gap-1.5 px-5 py-1.5 cursor-pointer text-xs font-semibold transition-all duration-300 rounded-r-md ${
            currentTheme === 'pulse'
              ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.6)] font-bold'
              : isMinimal
                ? 'text-gray-600 hover:bg-gray-200/50'
                : 'text-cyan-400 hover:bg-cyan-950/30'
          }`}
          id="btn-theme-pulse"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>⚡ النمط النابض</span>
        </button>
      </div>
    </div>
  );
};
