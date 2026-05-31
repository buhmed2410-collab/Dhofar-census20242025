/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeType } from '../types';
import { WILAYAS_DATA_24, WILAYAS_DATA_25 } from '../data';
import { Map, Info } from 'lucide-react';

interface WilayaHeatmapProps {
  theme: ThemeType;
  year: '2024' | '2025';
}

export const WilayaHeatmap: React.FC<WilayaHeatmapProps> = ({ theme, year }) => {
  const isPulse = theme === 'pulse';
  const isHeritage = theme === 'heritage';
  const isMinimal = theme === 'minimal';

  // Use correct year dataset
  const dataset = year === '2024' ? WILAYAS_DATA_24 : WILAYAS_DATA_25;
  const grandTotal = dataset.reduce((sum, item) => sum + item.total.both, 0);

  // Find max value to normalize intensities
  const maxVal = Math.max(...dataset.map(w => w.total.both), 1);

  return (
    <div
      id="wilaya-heatmap-section"
      className={`p-6 rounded-2xl border transition-all duration-300 ${
        isMinimal
          ? 'bg-white border-gray-100 shadow-sm text-gray-900'
          : isPulse
            ? 'bg-gradient-to-br from-[#0c1a2e] to-[#0f3460] border-cyan-500/10'
            : 'bg-gradient-to-br from-[#1c0d02] to-[#2d1704] border-amber-600/25'
      }`}
    >
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b pb-3 ${
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
            <Map className={`w-5 h-5 flex-shrink-0 ${isMinimal ? 'text-blue-650' : ''}`} />
            <span>الخريطة الحرارية الإحصائية لتوزيع السكان بالولايات</span>
          </h3>
          <p className={`text-[11px] mt-0.5 ${isMinimal ? 'text-gray-500' : 'opacity-70'}`}>
            تأثير التوزيع السكاني لولايات ظفار كدليل بصري لتركيز الكثافات السكانية ({year} م)
          </p>
        </div>
        <div className={`flex items-center gap-1 text-[10.5px] justify-end ${isMinimal ? 'text-gray-500' : 'opacity-75'}`}>
          <Info className={`w-4 h-4 flex-shrink-0 ${isMinimal ? 'text-blue-600' : 'text-amber-500'}`} />
          <span>شدة اللون تشير للتوزع النسبي قياساً بصلالة العاصمة</span>
        </div>
      </div>

      {/* Grid of Wilayat Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 select-none font-medium">
        {dataset.map((w) => {
          const v = w.total.both;
          const pctOfTotal = ((v / grandTotal) * 100).toFixed(1);
          const intensity = v / maxVal; // 0.0 to 1.0

          // Calculate exact colors matching the user's javascript formula
          // isPulse: rgba(0, Math.round(80 + 175 * inten), Math.round(210 - 100 * inten), 0.25 + 0.75 * inten)
          // isHeritage: rgba(Math.round(80 + 175 * inten), Math.round(70 * inten), 0, 0.25 + 0.75 * inten)
          const bg = isMinimal
            ? `rgba(37, 99, 235, ${0.08 + 0.92 * intensity})`
            : isPulse
              ? `rgba(0, ${Math.round(80 + 175 * intensity)}, ${Math.round(210 - 100 * intensity)}, ${0.25 + 0.75 * intensity})`
              : `rgba(${Math.round(80 + 175 * intensity)}, ${Math.round(110 * intensity)}, 0, ${0.25 + 0.75 * intensity})`;

          const textColorClass = isMinimal
            ? (intensity > 0.4 ? 'text-white' : 'text-gray-900')
            : 'text-white';

          const borderStyle = isMinimal
            ? `rgba(37, 99, 235, 0.18)`
            : isPulse
              ? 'rgba(0, 180, 216, 0.35)'
              : 'rgba(201, 168, 76, 0.35)';

          return (
            <div
              key={w.name}
              className="group p-4 rounded-xl text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.04] hover:shadow-md flex flex-col justify-between min-h-[95px]"
              style={{
                backgroundColor: bg,
                border: `1px solid ${borderStyle}`,
              }}
            >
              <div
                className={`text-xs font-black truncate leading-tight transition-all group-hover:scale-105 ${textColorClass}`}
              >
                {w.name}
              </div>
              <div
                className={`text-base font-mono font-black mt-2 tracking-wide ${textColorClass}`}
              >
                {v.toLocaleString('en-US')}
              </div>
              <div
                className={`text-[10px] mt-1.5 opacity-80 font-semibold ${textColorClass}`}
              >
                {pctOfTotal}% من المحافظة
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
