/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeType } from '../types';
import {
  AGE_GROUPS,
  TOTALS_24,
  TOTALS_25,
  OMANI_24,
  OMANI_25,
  NON_OMANI_24,
  NON_OMANI_25
} from '../data';
import { Users, User, UserX } from 'lucide-react';

interface PopulationPyramidProps {
  theme: ThemeType;
}

type DatasetSelection = 'tot' | 'omn' | 'non';
type YearSelection = '2024' | '2025';

export const PopulationPyramid: React.FC<PopulationPyramidProps> = ({ theme }) => {
  const isPulse = theme === 'pulse';
  const isHeritage = theme === 'heritage';
  const isMinimal = theme === 'minimal';

  const [year, setYear] = useState<YearSelection>('2024');
  const [nationality, setNationality] = useState<DatasetSelection>('tot');

  // Select source array
  let sourceData = TOTALS_24;
  if (year === '2024') {
    sourceData = nationality === 'tot' ? TOTALS_24 : nationality === 'omn' ? OMANI_24 : NON_OMANI_24;
  } else {
    sourceData = nationality === 'tot' ? TOTALS_25 : nationality === 'omn' ? OMANI_25 : NON_OMANI_25;
  }

  // Get only age groups (indexes 1 to 17, as index 0 is ALL)
  const ageGroupData = sourceData.slice(1);

  // Find max value across male and female to compute percentages/widths
  const maxVal = Math.max(...ageGroupData.flatMap(r => [r.male, r.female]), 1);

  const totalMale = sourceData[0].male;
  const totalFemale = sourceData[0].female;
  const grandTotal = sourceData[0].both;

  const datasetNames: Record<DatasetSelection, string> = {
    tot: 'الإجمالي العام',
    omn: 'المواطنين العمانيين',
    non: 'الوافدين / غير العمانيين'
  };

  return (
    <div
      id="population-pyramid-container"
      className={`p-6 rounded-2xl transition-all duration-300 border ${
        isMinimal
          ? 'bg-white border-gray-100 shadow-sm text-gray-900'
          : isPulse
            ? 'bg-gradient-to-br from-[#0c1a2e] to-[#0f3460] border-cyan-500/20 shadow-lg'
            : 'bg-gradient-to-br from-[#1c0d02] to-[#2d1704] border-amber-600/35 shadow-md'
      }`}
    >
      <div className={`flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b pb-4 ${
        isMinimal ? 'border-gray-100' : 'border-white/5'
      }`}>
        <div className="text-right">
          <h2
            className={`text-lg font-bold flex items-center gap-2 ${
              isMinimal
                ? 'text-blue-600 font-sans'
                : isPulse ? 'text-cyan-400 font-rajdhani' : 'text-amber-500 font-amiri text-xl'
            }`}
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            <span>الهرم السكاني التفاعلي لمحافظة ظفار</span>
          </h2>
          <p className={`text-[11px] mt-1 ${isMinimal ? 'text-gray-500' : 'opacity-70'}`}>
            مخطط هرمي يوضح توزيع السكان حسب الفئات العمرية والنوع والجنسية لعامي {year} م
          </p>
        </div>

        {/* Selection controllers */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className={`text-[10px] font-semibold mb-0.5 ${isMinimal ? 'text-gray-400' : 'opacity-60'}`}>اختر السنة:</span>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value as YearSelection)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-cairo cursor-pointer outline-none transition-all ${
                isMinimal
                  ? 'bg-gray-50 border border-gray-205 text-gray-800 hover:border-gray-300'
                  : isPulse
                    ? 'bg-slate-800 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400'
                    : 'bg-amber-950/40 border border-amber-600/30 text-amber-200 hover:border-amber-500'
              }`}
            >
              <option value="2024">تعداد 2024 م</option>
              <option value="2025">تعداد 2025 م</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className={`text-[10px] font-semibold mb-0.5 ${isMinimal ? 'text-gray-400' : 'opacity-60'}`}>الفئة السكانية:</span>
            <select
              value={nationality}
              onChange={(e) => setNationality(e.target.value as DatasetSelection)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-cairo cursor-pointer outline-none transition-all ${
                isMinimal
                  ? 'bg-gray-50 border border-gray-205 text-gray-800 hover:border-gray-300'
                  : isPulse
                    ? 'bg-slate-800 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400'
                    : 'bg-amber-950/40 border border-amber-600/30 text-amber-200 hover:border-amber-500'
              }`}
            >
              <option value="tot">الإجمالي العام (Tot)</option>
              <option value="omn">العمانيون (Omani)</option>
              <option value="non">غير العمانيين (Non-Omani)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subtitles & Totals */}
      <div className={`grid grid-cols-3 gap-2 text-center py-2.5 px-4 rounded-xl text-xs mb-6 select-none font-medium ${
        isMinimal ? 'bg-gray-50 border border-gray-100 text-gray-900' : 'bg-black/20 text-white'
      }`}>
        <div className="flex flex-col items-center">
          <span className={`text-[10px] font-semibold ${isMinimal ? 'text-blue-600' : 'text-cyan-400'}`}>إجمالي الذكور</span>
          <span className={`font-mono text-base font-black ${isMinimal ? 'text-blue-600' : 'text-cyan-400'}`}>{totalMale.toLocaleString('en-US')}</span>
          <span className={`text-[9.5px] mt-0.5 ${isMinimal ? 'text-gray-500' : 'opacity-60'}`}>{((totalMale / grandTotal) * 100).toFixed(1)}%</span>
        </div>
        <div className={`flex flex-col items-center justify-center border-x px-2 ${isMinimal ? 'border-gray-200/50' : 'border-white/5'}`}>
          <span className={`text-[10.5px] font-bold mb-0.5 ${
            isMinimal ? 'text-gray-800' : 'text-amber-500'
          }`}>
            {datasetNames[nationality]}
          </span>
          <span className={`font-mono text-lg font-black ${isMinimal ? 'text-gray-900' : 'text-white'}`}>{grandTotal.toLocaleString('en-US')} نسمة</span>
          <span className={`text-[9.5px] mt-0.5 ${isMinimal ? 'text-gray-500' : 'opacity-60'}`}>إجمالي التعداد ({year})</span>
        </div>
        <div className="flex flex-col items-center">
          <span className={`text-[10px] font-semibold ${isMinimal ? 'text-pink-600' : 'text-pink-500'}`}>إجمالي الإناث</span>
          <span className={`font-mono text-base font-black ${isMinimal ? 'text-pink-600' : 'text-pink-500'}`}>{totalFemale.toLocaleString('en-US')}</span>
          <span className={`text-[9.5px] mt-0.5 ${isMinimal ? 'text-gray-500' : 'opacity-60'}`}>{((totalFemale / grandTotal) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Grid of Pyramids labels */}
      <div className="flex justify-between items-center px-2 mb-2 text-xs font-bold opacity-80 select-none">
        <span className={isMinimal ? 'text-blue-600 flex items-center gap-1' : 'text-cyan-400 flex items-center gap-1'}><User className="w-3.5 h-3.5" /> ذكور (Males)</span>
        <span className={`text-[11px] ${isMinimal ? 'text-gray-400' : 'opacity-60'}`}>مجموعات الأعمار</span>
        <span className="text-pink-600 flex items-center gap-1">إناث (Females) <UserX className="w-3.5 h-3.5" /></span>
      </div>

      {/* Responsive Row Blocks */}
      <div className="flex flex-col gap-1 w-full relative">
        {[...ageGroupData].reverse().map((row, idx) => {
          const originalIdx = ageGroupData.length - 1 - idx;
          const ageLabel = AGE_GROUPS[originalIdx];

          const malePct = (row.male / maxVal) * 100;
          const femalePct = (row.female / maxVal) * 100;

          // Compute percentages of grand total
          const mOfTotal = ((row.male / grandTotal) * 100).toFixed(1);
          const fOfTotal = ((row.female / grandTotal) * 100).toFixed(1);

          return (
            <div key={ageLabel} className={`group flex items-center justify-between w-full h-[22px] px-2 rounded transition-all ${
              isMinimal ? 'hover:bg-gray-100/50' : 'hover:bg-white/5'
            }`}>
              {/* Male Bar (Left - right aligned) */}
              <div className="flex-1 flex items-center justify-end gap-2.5">
                <span className={`font-mono text-[10px] font-medium scale-90 group-hover:scale-100 transition-all ${
                  isMinimal ? 'text-gray-750' : 'opacity-60'
                }`}>
                  {row.male.toLocaleString('en-US')}
                  <span className={`text-[8px] ml-1 font-bold ${isMinimal ? 'text-blue-600' : 'text-cyan-400'}`}>({mOfTotal}%)</span>
                </span>
                <div className="w-full max-w-[170px] h-3.5 flex justify-end">
                  <div
                    className={`h-full rounded-l transition-all duration-500 origin-right ${
                      isMinimal
                        ? 'bg-gradient-to-l from-blue-600 to-blue-400'
                        : isHeritage
                          ? 'bg-gradient-to-l from-blue-700 to-sky-400 brightness-90 group-hover:brightness-110'
                          : 'bg-gradient-to-l from-cyan-600 to-cyan-400 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                    }`}
                    style={{ width: `${Math.max(malePct, 1.5)}%` }}
                  />
                </div>
              </div>

              {/* Age Label */}
              <div className="w-[75px] text-center flex-shrink-0">
                <span
                  className={`text-[11px] font-bold tracking-wider px-2 py-0.5 rounded ${
                    isMinimal
                      ? 'text-blue-600 bg-blue-50'
                      : isPulse
                        ? 'text-cyan-200 bg-cyan-950/20'
                        : 'text-amber-100 bg-amber-950/15 font-amiri'
                  }`}
                >
                  {ageLabel}
                </span>
              </div>

              {/* Female Bar (Right - left aligned) */}
              <div className="flex-1 flex items-center justify-start gap-2.5">
                <div className="w-full max-w-[170px] h-3.5 flex justify-start">
                  <div
                    className={`h-full rounded-r transition-all duration-500 origin-left ${
                      isMinimal
                        ? 'bg-gradient-to-r from-pink-500 to-pink-300'
                        : isHeritage
                          ? 'bg-gradient-to-r from-red-700 to-rose-400 brightness-90 group-hover:brightness-110'
                          : 'bg-gradient-to-r from-pink-600 to-pink-400 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                    }`}
                    style={{ width: `${Math.max(femalePct, 1.5)}%` }}
                  />
                </div>
                <span className={`font-mono text-[10px] font-medium scale-90 group-hover:scale-100 transition-all ${
                  isMinimal ? 'text-gray-750' : 'opacity-60'
                }`}>
                  {row.female.toLocaleString('en-US')}
                  <span className={`text-[8px] mr-1 font-bold ${isMinimal ? 'text-rose-600' : 'text-pink-500'}`}>({fOfTotal}%)</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
