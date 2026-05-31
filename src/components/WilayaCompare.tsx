/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeType } from '../types';
import { WILAYAS_AR, WILAYAS_DATA_24, WILAYAS_DATA_25 } from '../data';
import { RadarChart } from './CustomCharts';
import { Scale, Milestone } from 'lucide-react';

interface WilayaCompareProps {
  theme: ThemeType;
}

export const WilayaCompare: React.FC<WilayaCompareProps> = ({ theme }) => {
  const isPulse = theme === 'pulse';
  const isMinimal = theme === 'minimal';

  const [w1Idx, setW1Idx] = useState<number>(0); // Salalah
  const [w2Idx, setW2Idx] = useState<number>(1); // Taqah
  const [year, setYear] = useState<'2024' | '2025'>('2024');

  // Fetch metrics
  const activeDataset = year === '2024' ? WILAYAS_DATA_24 : WILAYAS_DATA_25;

  const w1Data = activeDataset[w1Idx];
  const w2Data = activeDataset[w2Idx];

  const radarLabels = ['عمانيون ذكور', 'عمانيون إناث', 'وافدون ذكور', 'وافدون إناث'];

  const radarDatasets = [
    {
      label: w1Data.name,
      // [Omani Male, Omani Female, Non-Omani Male, Non-Omani Female]
      data: [
        w1Data.omani.male,
        w1Data.omani.female,
        w1Data.nonOmani.male,
        w1Data.nonOmani.female
      ],
      color: isMinimal ? '#2563eb' : isPulse ? '#00b4d8' : '#c9a84c',
      fillColor: isMinimal ? 'rgba(37, 99, 235, 0.15)' : isPulse ? 'rgba(0, 180, 216, 0.25)' : 'rgba(201, 168, 76, 0.25)'
    },
    {
      label: w2Data.name,
      data: [
        w2Data.omani.male,
        w2Data.omani.female,
        w2Data.nonOmani.male,
        w2Data.nonOmani.female
      ],
      color: isMinimal ? '#db2777' : isPulse ? '#f72585' : '#85c1e9',
      fillColor: isMinimal ? 'rgba(219, 39, 119, 0.15)' : isPulse ? 'rgba(247, 37, 133, 0.25)' : 'rgba(133, 193, 233, 0.25)'
    }
  ];

  return (
    <div
      id="wilaya-compare-container"
      className={`p-6 rounded-2xl border transition-all duration-300 ${
        isMinimal
          ? 'bg-white border-gray-100 shadow-sm text-gray-900'
          : isPulse
            ? 'bg-gradient-to-br from-[#0c1a2e] to-[#0f3460] border-cyan-500/10 shadow-lg'
            : 'bg-gradient-to-br from-[#1c0d02] to-[#2d1704] border-amber-600/25 shadow-md'
      }`}
    >
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3.5 mb-4 ${
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
            <Scale className={`w-5 h-5 flex-shrink-0 ${isMinimal ? 'text-blue-650' : 'text-amber-500'}`} />
            <span>المقارنة البيانية للتركيبة السكانية بالولايات</span>
          </h3>
          <p className={`text-[11px] mt-0.5 ${isMinimal ? 'text-gray-500' : 'opacity-70'}`}>
            مقارنة حجم ونوع وهيكل المواطنين مقابل الوافدين لولايتين مختارتين مجسدة في مخطط رادار شبكي
          </p>
        </div>

        {/* Year toggle indicator */}
        <div className={`flex items-center p-1.5 rounded-lg border gap-1 self-end text-xs font-semibold ${
          isMinimal ? 'bg-gray-50 border-gray-200 text-gray-850' : 'bg-black/20 border-white/5 text-white'
        }`}>
          <button
            onClick={() => setYear('2024')}
            className={`px-3 py-1 rounded cursor-pointer transition-all ${
              year === '2024'
                ? isMinimal ? 'bg-blue-600 text-white font-bold' : 'bg-amber-600 text-[#1a0a00]'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            2024 م
          </button>
          <button
            onClick={() => setYear('2025')}
            className={`px-3 py-1 rounded cursor-pointer transition-all ${
              year === '2025'
                ? isMinimal ? 'bg-blue-600 text-white font-bold' : 'bg-amber-600 text-[#1a0a00]'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            2025 م
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Controls col (4 columns) */}
        <div className="md:col-span-4 flex flex-col gap-4 text-right">
          <div className="flex flex-col gap-1">
            <label className={`text-xs font-semibold mb-1 ${isMinimal ? 'text-gray-700' : 'opacity-75 text-white'}`}>الولاية المرجعية الأولى:</label>
            <select
              value={w1Idx}
              onChange={(e) => setW1Idx(parseInt(e.target.value))}
              className={`w-full px-3 py-2 rounded-lg text-xs font-bold font-cairo cursor-pointer outline-none transition-all ${
                isMinimal
                  ? 'bg-gray-50 border border-gray-205 text-gray-850'
                  : isPulse
                    ? 'bg-slate-850 border border-cyan-500/30 text-cyan-300'
                    : 'bg-amber-950/40 border border-amber-600/30 text-amber-200'
              }`}
            >
              {WILAYAS_AR.map((name, idx) => (
                <option key={idx} value={idx} disabled={idx === w2Idx}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={`text-xs font-semibold mb-1 ${isMinimal ? 'text-gray-700' : 'opacity-75 text-white'}`}>الولاية المقارنة الثانية:</label>
            <select
              value={w2Idx}
              onChange={(e) => setW2Idx(parseInt(e.target.value))}
              className={`w-full px-3 py-2 rounded-lg text-xs font-bold font-cairo cursor-pointer outline-none transition-all ${
                isMinimal
                  ? 'bg-gray-50 border border-gray-205 text-gray-850'
                  : isPulse
                    ? 'bg-slate-850 border border-cyan-500/30 text-cyan-300'
                    : 'bg-amber-950/40 border border-amber-600/30 text-amber-200'
              }`}
            >
              {WILAYAS_AR.map((name, idx) => (
                <option key={idx} value={idx} disabled={idx === w1Idx}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Inline small comparison summary */}
          <div className={`p-4 rounded-xl border text-xs ${
            isMinimal ? 'bg-gray-50 border-gray-150 text-gray-800' : 'bg-black/20 border-white/5 text-white'
          } space-y-2.5`}>
            <div className={`flex justify-between items-center text-[11px] border-b pb-1.5 opacity-80 ${
              isMinimal ? 'border-gray-250/50 text-gray-900' : 'border-white/5 text-white'
            }`}>
              <span>المقارنة الكلية</span>
              <span className="font-bold">{w1Data.name} مقابل {w2Data.name}</span>
            </div>
            
            <div className="space-y-1.5 font-medium">
              <div className="flex justify-between">
                <span className={isMinimal ? 'text-gray-500' : 'opacity-70 text-white'}>إجمالي السكان:</span>
                <span className={`font-mono ${isMinimal ? 'text-gray-900' : 'text-white'}`}>
                  <strong>{w1Data.total.both.toLocaleString('en-US')}</strong> : <strong>{w2Data.total.both.toLocaleString('en-US')}</strong>
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isMinimal ? 'text-gray-500' : 'opacity-70 text-white'}>العمانيين:</span>
                <span className={`font-mono ${isMinimal ? 'text-blue-600 font-bold' : 'text-cyan-400'}`}>
                  {w1Data.omani.both.toLocaleString('en-US')} : {w2Data.omani.both.toLocaleString('en-US')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isMinimal ? 'text-gray-500' : 'opacity-70 text-white'}>الوافدين (غير العمانيين):</span>
                <span className={`font-mono ${isMinimal ? 'text-pink-600 font-bold' : 'text-pink-500'}`}>
                  {w1Data.nonOmani.both.toLocaleString('en-US')} : {w2Data.nonOmani.both.toLocaleString('en-US')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart col (8 columns) */}
        <div className="md:col-span-8 flex justify-center items-center">
          <div className="w-full max-w-[450px]">
            <RadarChart labels={radarLabels} datasets={radarDatasets} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};
