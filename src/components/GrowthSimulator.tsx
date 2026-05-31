/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeType } from '../types';
import { TrendingUp, Sparkles, HelpCircle } from 'lucide-react';

interface GrowthSimulatorProps {
  theme: ThemeType;
}

export const GrowthSimulator: React.FC<GrowthSimulatorProps> = ({ theme }) => {
  const isPulse = theme === 'pulse';
  const isHeritage = theme === 'heritage';
  const isMinimal = theme === 'minimal';

  const basePopulation = 532897; // 2025 Total
  const years = [2025, 2026, 2027, 2028, 2029, 2030];

  const [growthRate, setGrowthRate] = useState<number>(3.0);

  // Growth projection calculation
  const getProjectedPop = (year: number) => {
    const yearsDiff = year - 2025;
    return Math.round(basePopulation * Math.pow(1 + growthRate / 100, yearsDiff));
  };

  const getPopIncrease = (year: number) => {
    return getProjectedPop(year) - basePopulation;
  };

  return (
    <div
      id="growth-simulator-section"
      className={`p-6 rounded-2xl border transition-all duration-300 ${
        isMinimal
          ? 'bg-white border-gray-100 shadow-sm text-gray-900'
          : isPulse
            ? 'bg-gradient-to-br from-[#0c1a2e] to-[#0f3460] border-cyan-500/20 shadow-lg'
            : 'bg-gradient-to-br from-[#1c0d02] to-[#2d1704] border-amber-600/35 shadow-md'
      }`}
    >
      <div className={`flex items-center justify-between gap-4 border-b pb-3 mb-4 ${
        isMinimal ? 'border-gray-100' : 'border-white/5'
      }`}>
        <div className="text-right">
          <h3
            className={`text-md font-bold flex items-center gap-1.5 ${
              isMinimal
                ? 'text-blue-600 font-sans'
                : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri text-lg'
            }`}
          >
            <TrendingUp className={`w-5 h-5 flex-shrink-0 ${isMinimal ? 'text-blue-650' : 'text-amber-500'}`} />
            <span>محاكي تقدير النمو السكاني المتوقع حتى 2030م</span>
          </h3>
          <p className={`text-[11px] mt-0.5 ${isMinimal ? 'text-gray-500' : 'opacity-70'}`}>
            توقع التعداد السنوي المستهدف لمحافظة ظفار كمعيار لتخطيط المنشآت الطبية والصحية
          </p>
        </div>
        <div className={`hidden sm:flex items-center gap-1 text-[10px] px-2 py-1 rounded border ${
          isMinimal ? 'bg-gray-50 border-gray-200 text-gray-700' : 'bg-slate-800/55 border-white/5 text-white'
        }`}>
          <Sparkles className={`w-3.5 h-3.5 ${isMinimal ? 'text-blue-600' : 'text-yellow-400'}`} />
          <span className="font-semibold">قائم على إحصاء 2025</span>
        </div>
      </div>

      {/* Control Input */}
      <div className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border mb-5 select-none font-medium ${
        isMinimal ? 'bg-gray-50 border-gray-100 text-gray-800' : 'bg-black/15 border-white/5 text-white'
      }`}>
        <div className="flex-1 flex flex-col gap-1 w-full text-right">
          <label className="text-xs font-semibold flex items-center justify-between">
            <span className={isMinimal ? 'text-gray-850 font-bold' : isPulse ? 'text-cyan-300' : 'text-amber-300 font-bold'}>معدل النمو السنوي الافتراضي:</span>
            <span className={`font-mono text-sm font-black px-2 py-0.5 rounded ${
              isMinimal ? 'bg-gray-200/60 text-gray-900 border border-gray-300/40' : 'bg-black/35 text-white'
            }`}>{growthRate.toFixed(1)}%</span>
          </label>
          <div className="flex items-center gap-3 mt-2 w-full">
            <span className="text-[10px] opacity-50">1.0%</span>
            <input
              type="range"
              min="1.0"
              max="6.0"
              step="0.1"
              value={growthRate}
              onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
              className={`flex-1 h-1.5 rounded-full outline-none cursor-pointer accent-current ${isMinimal ? 'bg-gray-200 text-blue-600' : 'bg-slate-800 text-cyan-500'}`}
              style={{
                accentColor: isMinimal ? '#2563EB' : isPulse ? '#06b6d4' : '#d97706'
              }}
            />
            <span className="text-[10px] opacity-50">6.0%</span>
          </div>
        </div>

        <div className={`w-full sm:w-[220px] px-3 py-2 rounded border text-[11px] leading-relaxed ${
          isMinimal ? 'bg-white border-gray-200 text-gray-600' : 'bg-slate-800/35 border-white/5 opacity-85 text-right'
        }`}>
          <span className={`font-bold flex items-center gap-1 mb-1 ${isMinimal ? 'text-blue-600' : 'text-white'}`}><HelpCircle className={`w-3.5 h-3.5 ${isMinimal ? 'text-blue-600' : 'text-cyan-400'}`} /> فكرته الأساسية:</span>
          يتم الحساب بتطبيق معادلة النمو المركب:
          <div className={`font-mono text-[9px] mt-1 p-1 rounded text-center ${
            isMinimal ? 'bg-gray-50 text-blue-650 border border-gray-150' : 'bg-black/20 text-cyan-200'
          }`}>
            P = P₀ &times; (1 + r)&sup1;
          </div>
        </div>
      </div>

      {/* Projections Years Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-1">
        {years.map((year, i) => {
          const projectedPop = getProjectedPop(year);
          const increase = getPopIncrease(year);

          return (
            <div
              key={year}
              className={`p-3 rounded-xl text-center transition-all border ${
                isMinimal
                  ? 'bg-gray-50/50 border-gray-200/80 hover:border-blue-500/30'
                  : isPulse
                    ? 'bg-gradient-to-b from-[#13243a] to-[#0c1a2e] border-cyan-500/10 hover:border-cyan-500/30 shadow'
                    : 'bg-gradient-to-b from-[#341804] to-[#1c0d02] border-amber-600/15 hover:border-amber-600/35 shadow-sm'
              }`}
            >
              <span className={`text-[11px] font-bold block ${isMinimal ? 'text-gray-450' : 'opacity-60'}`}>تعداد {year} م</span>
              <span className={`font-mono text-base md:text-lg font-black block mt-1.5 ${
                isMinimal ? 'text-gray-900' : isPulse ? 'text-white' : 'text-amber-100'
              }`}>
                {projectedPop.toLocaleString('en-US')}
              </span>

              <span className={`text-[9.5px] font-mono block mt-1 ${
                increase > 0 ? (isMinimal ? 'text-emerald-600 font-semibold' : 'text-emerald-500') : (isMinimal ? 'text-gray-400' : 'text-slate-400')
              }`}>
                {increase === 0 ? 'القيمة المرجعية' : `+${increase.toLocaleString('en-US')}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
