/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeType } from './types';
import { ThemeSelector } from './components/ThemeSelector';
import { Header } from './components/Header';
import { PopulationPyramid } from './components/PopulationPyramid';
import { GrowthSimulator } from './components/GrowthSimulator';
import { WilayaHeatmap } from './components/WilayaHeatmap';
import { WilayaCompare } from './components/WilayaCompare';
import { HealthPlanningDetails } from './components/HealthPlanningDetails';
import {
  WILAYAS_AR,
  WILAYAS_DATA_24,
  WILAYAS_DATA_25,
  TOTALS_24,
  TOTALS_25,
  OMANI_24,
  OMANI_25,
  NON_OMANI_24,
  NON_OMANI_25,
  HEALTH_GROUPS_24,
  HEALTH_GROUPS_25
} from './data';
import {
  GroupedBarChart,
  HorizontalBarChart,
  DoughnutChart
} from './components/CustomCharts';
import {
  BarChart2,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  Heart,
  Globe,
  GitCompare,
  HelpCircle,
  TrendingDown,
  Sparkles,
  Bot,
  Info
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ThemeType>('pulse');
  const [activeTab, setActiveTab] = useState<string>('general');
  const [generalYear, setGeneralYear] = useState<'2024' | '2025' | 'both'>('2024');



  const isPulse = theme === 'pulse';
  const isMinimal = theme === 'minimal';

  // Format Helper
  const formatNumber = (num: number) => num.toLocaleString('en-US');

  // ================= TAB 1: KPI RESOLVER =================
  const getKpis = () => {
    if (generalYear === '2024') {
      return [
        { label: 'إجمالي سكان ظفار 2024', val: 529625, desc: 'حسب بيانات منتصف 2024م', key: 'tot' },
        { label: 'الذكور (Males)', val: 347843, desc: '65.7% من إجمالي السكان', color: 'text-cyan-400', key: 'm' },
        { label: 'الإناث (Females)', val: 181782, desc: '34.3% من إجمالي السكان', color: 'text-pink-500', key: 'f' },
        { label: 'المواطنون العمانيون', val: 238843, desc: '45.1% من الإجمالي الكلي', color: 'text-emerald-400', key: 'o' },
        { label: 'الوافدون (غير العمانيين)', val: 290782, desc: '54.9% من الإجمالي الكلي', color: 'text-amber-400', key: 'n' },
        { label: 'نسبة النوع', val: 191.4, desc: 'ذكر لكل 100 أنثى', isRaw: true, key: 'g' },
        { label: 'الولاية الأكثر سكاناً', val: 430404, labelS: 'صلالة', desc: '81.3% من سكان المحافظة', key: 'top' },
        { label: 'الولاية الأقل سكاناً', val: 876, labelS: 'مقشن', desc: 'أقل الولايات كثافة عددية', key: 'min' }
      ];
    } else if (generalYear === '2025') {
      return [
        { label: 'إجمالي سكان ظفار 2025', val: 532897, desc: 'حسب بيانات منتصف 2025م', key: 'tot' },
        { label: 'الذكور (Males)', val: 343110, desc: '64.4% من إجمالي السكان', color: 'text-cyan-400', key: 'm' },
        { label: 'الإناث (Females)', val: 189787, desc: '35.6% من إجمالي السكان', color: 'text-pink-500', key: 'f' },
        { label: 'المواطنون العمانيون', val: 244324, desc: '45.8% من الإجمالي الكلي', color: 'text-emerald-400', key: 'o' },
        { label: 'الوافدون (غير العمانيين)', val: 288573, desc: '54.2% من الإجمالي الكلي', color: 'text-amber-400', key: 'n' },
        { label: 'نسبة النوع', val: 180.8, desc: 'ذكر لكل 100 أنثى', isRaw: true, key: 'g' },
        { label: 'الولاية الأكثر سكاناً', val: 430294, labelS: 'صلالة', desc: '80.8% من سكان المحافظة', key: 'top' },
        { label: 'الولاية الأقل سكاناً', val: 852, labelS: 'مقشن', desc: 'أقل الولايات كثافة عددية', key: 'min' }
      ];
    } else {
      // Comparison 2024 vs 2025
      return [
        { label: 'سكان ظفار 2024', val: 529625, desc: 'سنة مرجعية أولى', key: 'tot4' },
        { label: 'سكان ظفار 2025', val: 532897, desc: 'سنة مقارنة ثانية', key: 'tot5' },
        { label: 'الزيادة العددية الكلية', val: +3272, desc: 'معدل نمو سنوي إيجابي +0.6%', key: 'inc' },
        { label: 'نمو المواطنين العمانيين', val: +5481, desc: 'زيادة مستمرة للعمانيين', color: 'text-emerald-400', key: 'oinc' },
        { label: 'الذكور لعام 2024', val: 347843, desc: 'Males 2024', key: 'm4' },
        { label: 'الذكور لعام 2025', val: 343110, desc: 'Males 2025', key: 'm5' },
        { label: 'الإناث لعام 2024', val: 181782, desc: 'Females 2024', key: 'f4' },
        { label: 'الإناث لعام 2025', val: 189787, desc: 'Females 2025', key: 'f5' }
      ];
    }
  };

  const currentKpis = getKpis();

  // Tab Menu Items
  const tabItems = [
    { id: 'general', label: '📊 المؤشرات العامة', desc: '' },
    { id: 'indicators', label: '👥 المؤشرات الديموغرافية', desc: '' },
    { id: 'pyramid', label: '🔺 الهيكل الهرمي', desc: '' },
    { id: 'wilayat', label: '🗺️ التوزيع بالولايات', desc: '' },
    { id: 'gender', label: '⚧ التوزيع حسب النوع', desc: '' },
    { id: 'nationality', label: '🌍 التوزيع حسب الجنسية', desc: '' },
    { id: 'health', label: '🏥 مؤشرات التخطيط الصحي', desc: '' }
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex flex-col pb-10 ${
        theme === 'minimal'
          ? 'theme-minimal text-[#1e293b] font-sans'
          : 'theme-pulse text-[#e0f7fa]'
      }`}
    >
      {/* 1. Theme Toggle Top Bar */}
      <ThemeSelector currentTheme={theme} onChange={setTheme} />

      {/* 2. Page Header Block */}
      <Header theme={theme} />

      {/* 3. Interactive Menu Navigation Tabs */}
      <nav
        id="dashboard-tabs-navigation"
        className={`flex border-b overflow-x-auto scrollbar-hide shrink-0 sticky top-10 z-[1000] px-4 md:px-8 select-none ${
          isMinimal
            ? 'bg-white/95 border-gray-100 backdrop-blur'
            : isPulse
              ? 'bg-[#0d1b2a]/95 border-cyan-400/20 backdrop-blur'
              : 'bg-[#1a0a00]/95 border-amber-600/40 backdrop-blur'
        }`}
      >
        <div className="flex gap-1 md:gap-2 max-w-7xl mx-auto w-full py-2">
          {tabItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 text-xs md:text-sm font-bold whitespace-nowrap rounded-md cursor-pointer transition-all duration-300 ${
                  isActive
                    ? isMinimal
                      ? 'bg-blue-50 border border-blue-500/20 text-blue-600'
                      : isPulse
                        ? 'bg-cyan-500/15 border border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                        : 'bg-amber-600/15 border border-amber-500 text-amber-200'
                    : isMinimal
                      ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/50'
                      : 'opacity-70 hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 4. Display Content Layout pages */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
        
        {/* =========================================================================
             PAGE 1: GENERAL INDICATORS
           ========================================================================= */}
        {activeTab === 'general' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Year Subtabs */}
            <div className={`flex items-center justify-between gap-4 flex-wrap border-b pb-3 ${
              isMinimal ? 'border-gray-100' : 'border-white/5'
            }`}>
              <div className="text-right">
                <h2 className={`text-lg font-black ${
                  isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                }`}>
                  المؤشرات الديموغرافية العامة
                </h2>
              </div>

              <div className={`flex gap-1.5 p-0.5 rounded-lg border ${
                isMinimal ? 'bg-gray-100 border-gray-200' : 'bg-black/30 border-white/5'
              }`}>
                <button
                  onClick={() => setGeneralYear('2024')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all ${
                    generalYear === '2024'
                      ? isMinimal
                        ? 'bg-blue-600 text-white'
                        : isPulse
                          ? 'bg-cyan-500 text-[#0d1b2a]'
                          : 'bg-amber-600 text-[#1a0a00]'
                      : isMinimal ? 'text-gray-600 hover:text-gray-900' : 'opacity-75 hover:opacity-100 text-white'
                  }`}
                >
                  السنة 2024 م
                </button>
                <button
                  onClick={() => setGeneralYear('2025')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all ${
                    generalYear === '2025'
                      ? isMinimal
                        ? 'bg-blue-600 text-white'
                        : isPulse
                          ? 'bg-cyan-500 text-[#0d1b2a]'
                          : 'bg-amber-600 text-[#1a0a00]'
                      : isMinimal ? 'text-gray-600 hover:text-gray-900' : 'opacity-75 hover:opacity-100 text-white'
                  }`}
                >
                  السنة 2025 م
                </button>
                <button
                  onClick={() => setGeneralYear('both')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all ${
                    generalYear === 'both'
                      ? isMinimal
                        ? 'bg-blue-600 text-white'
                        : isPulse
                          ? 'bg-cyan-500 text-[#0d1b2a]'
                          : 'bg-amber-600 text-[#1a0a00]'
                      : isMinimal ? 'text-gray-600 hover:text-gray-900' : 'opacity-75 hover:opacity-100 text-white'
                  }`}
                >
                  مقارنة الفئتين
                </button>
              </div>
            </div>

            {/* KPI grid counts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentKpis.map((kpi, idx) => {
                const getKpiColor = (key: string, defaultColor?: string) => {
                  if (isMinimal) {
                    if (key === 'm' || key === 'm4' || key === 'm5') return 'text-blue-600';
                    if (key === 'f' || key === 'f4' || key === 'f5') return 'text-pink-600';
                    if (key === 'o' || key === 'oinc') return 'text-emerald-700';
                    if (key === 'n') return 'text-amber-700';
                    if (key === 'inc') return 'text-blue-600';
                    return 'text-gray-900';
                  }
                  return defaultColor || (isPulse ? 'text-white' : 'text-amber-100');
                };

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                      isMinimal
                        ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                        : isPulse
                          ? 'bg-gradient-to-br from-[#0c1a2e] to-[#0f3460] border-cyan-500/20 shadow-md'
                          : 'bg-gradient-to-br from-[#1c0d02] to-[#2d1704] border-amber-600/35 shadow-sm'
                    }`}
                  >
                    <span className={`text-[11px] block font-semibold text-right leading-tight ${
                      isMinimal ? 'text-gray-500' : 'text-white opacity-75'
                    }`}>
                      {kpi.label}
                    </span>
                    <span
                      className={`font-mono text-2xl md:text-3xl font-black block mt-2 text-right tracking-wider ${getKpiColor(kpi.key, kpi.color)}`}
                    >
                      {kpi.labelS ? `${kpi.labelS} (${formatNumber(kpi.val)})` : kpi.isRaw ? kpi.val : formatNumber(kpi.val)}
                    </span>
                    <span className={`text-[10px] block mt-1.5 text-right font-medium ${
                      isMinimal ? 'text-gray-400' : 'opacity-60'
                    }`}>
                      {kpi.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Graphs row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Graphic 1 */}
              <div
                className={`p-5 rounded-2xl border ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <h3 className={`text-sm font-bold opacity-85 mb-4 text-right flex items-center gap-1.5 ${
                  isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri'
                }`}>
                  <BarChart2 className={`w-4.5 h-4.5 ${isMinimal ? 'text-blue-650' : ''}`} />
                  <span>التوزيع التفصيلي للسكان (الجنسية والنوع)</span>
                </h3>
                <div className="h-[250px] flex items-center justify-center">
                  <GroupedBarChart
                    labels={['عماني ذكور', 'عماني إناث', 'وافد ذكور', 'وافد إناث']}
                    datasets={
                      generalYear === 'both'
                        ? [
                            {
                              label: 'عام 2024 م',
                              data: [120745, 118098, 227098, 63684],
                              color: isMinimal ? '#94a3b8' : isPulse ? '#38bdf8' : '#85c1e9'
                            },
                            {
                              label: 'عام 2025 م',
                              data: [123542, 120782, 219568, 69005],
                              color: isMinimal ? '#2563eb' : isPulse ? '#f72585' : '#c9a84c'
                            }
                          ]
                        : [
                            {
                              label: `بيانات عام ${generalYear} م`,
                              data: generalYear === '2025' ? [123542, 120782, 219568, 69005] : [120745, 118098, 227098, 63684],
                              color: isMinimal ? '#2563eb' : isPulse ? '#00b4d8' : '#c9a84c'
                            }
                          ]
                    }
                    theme={theme}
                  />
                </div>
              </div>

              {/* Graphic 2 */}
              <div
                className={`p-5 rounded-2xl border ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <h3 className={`text-sm font-bold opacity-85 mb-4 text-right flex items-center gap-1.5 ${
                  isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri'
                }`}>
                  <GitCompare className={`w-4.5 h-4.5 ${isMinimal ? 'text-blue-650' : ''}`} />
                  <span>التوزيع السكاني حسب الجنسية والنوع</span>
                </h3>
                <div className="h-[250px] flex items-center justify-center">
                  <GroupedBarChart
                    labels={['الإجمالي الكلي', 'الذكور', 'الإناث', 'عمانيون', 'وافدون']}
                    datasets={
                      generalYear === 'both'
                        ? [
                            {
                              label: 'عام 2024 م',
                              data: [529625, 347843, 181782, 238843, 290782],
                              color: isMinimal ? '#94a3b8' : isPulse ? '#38bdf8' : '#85c1e9'
                            },
                            {
                              label: 'عام 2025 م',
                              data: [532897, 343110, 189787, 244324, 288573],
                              color: isMinimal ? '#2563eb' : isPulse ? '#f72585' : '#c9a84c'
                            }
                          ]
                        : [
                            {
                              label: `بيانات عام ${generalYear} م`,
                              data: generalYear === '2025' ? [532897, 343110, 189787, 244324, 288573] : [529625, 347843, 181782, 238843, 290782],
                              color: isMinimal ? '#2563eb' : isPulse ? '#00b4d8' : '#c9a84c'
                            }
                          ]
                    }
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
             PAGE 2: DEMOGRAPHIC INDICATORS
           ========================================================================= */}
        {activeTab === 'indicators' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Census 2024 */}
              <div
                className={`p-5 rounded-2xl border ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <h3 className={`text-sm font-bold opacity-85 mb-4 text-right ${
                  isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                }`}>
                  السكان حسب الولايات - السنة 2024 م
                </h3>
                <HorizontalBarChart
                  labels={WILAYAS_AR}
                  data={WILAYAS_DATA_24.map(w => w.total.both)}
                  colors={isMinimal ? ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'] : isPulse ? undefined : ['#c9a84c', '#85c1e9', '#06d6a0']}
                  height={480}
                  theme={theme}
                />
              </div>

              {/* Census 2025 */}
              <div
                className={`p-5 rounded-2xl border ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <h3 className={`text-sm font-bold opacity-85 mb-4 text-right ${
                  isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                }`}>
                  السكان حسب الولايات - السنة 2025 م
                </h3>
                <HorizontalBarChart
                  labels={WILAYAS_AR}
                  data={WILAYAS_DATA_25.map(w => w.total.both)}
                  colors={isMinimal ? ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'] : isPulse ? undefined : ['#c9a84c', '#85c1e9', '#06d6a0']}
                  height={480}
                  theme={theme}
                />
              </div>
            </div>

            <div>
              {/* Side by side Wilayat comparison radar */}
              <WilayaCompare theme={theme} />
            </div>

            {/* Growth predictor simulator slider */}
            <GrowthSimulator theme={theme} />
          </div>
        )}

        {/* =========================================================================
             PAGE 3: POPULATION PYRAMID
           ========================================================================= */}
        {activeTab === 'pyramid' && (
          <div className="animate-fadeIn w-full">
            <PopulationPyramid theme={theme} />
          </div>
        )}

        {/* =========================================================================
             PAGE 4: WILAYAT DISTRIBUTION
           ========================================================================= */}
        {activeTab === 'wilayat' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Share Pie distribution - 2024 */}
              <div
                className={`p-5 rounded-2xl border ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <h3 className={`text-sm font-bold opacity-85 mb-4 text-right ${
                  isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                }`}>
                  التوزيع النسبي للسكان لعام 2024 م
                </h3>
                <div className="min-h-[250px] py-2 flex items-center justify-center">
                  <DoughnutChart
                    data={WILAYAS_DATA_24.map((w, idx) => ({
                      label: w.name,
                      value: w.total.both,
                      color: isMinimal
                        ? `hsl(${210 + idx * 12}, 75%, ${50 - idx * 2}%)`
                        : isPulse
                          ? `hsl(${200 + idx * 16}, 80%, ${55 - idx * 1.5}%)`
                          : `hsl(${35 + idx * 24}, 65%, ${45 - idx * 1}%)`
                    }))}
                    innerLabel="محافظة ظفار الهيكلية"
                    innerValue="529,625 نسمة"
                    theme={theme}
                  />
                </div>
              </div>

              {/* Share Pie distribution - 2025 */}
              <div
                className={`p-5 rounded-2xl border ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <h3 className={`text-sm font-bold opacity-85 mb-4 text-right ${
                  isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                }`}>
                  التوزيع النسبي للسكان لعام 2025 م
                </h3>
                <div className="min-h-[250px] py-2 flex items-center justify-center">
                  <DoughnutChart
                    data={WILAYAS_DATA_25.map((w, idx) => ({
                      label: w.name,
                      value: w.total.both,
                      color: isMinimal
                        ? `hsl(${210 + idx * 12}, 75%, ${46 - idx * 2}%)`
                        : isPulse
                          ? `hsl(${200 + idx * 16}, 80%, ${50 - idx * 1.5}%)`
                          : `hsl(${35 + idx * 24}, 65%, ${40 - idx * 1}%)`
                    }))}
                    innerLabel="محافظة ظفار الهيكلية"
                    innerValue="532,897 نسمة"
                    theme={theme}
                  />
                </div>
              </div>
            </div>

            {/* Custom Heatmap Grid Representation for 2024 */}
            <WilayaHeatmap theme={theme} year="2024" />

            {/* Custom Heatmap Grid Representation for 2025 */}
            <WilayaHeatmap theme={theme} year="2025" />
          </div>
        )}

        {/* =========================================================================
             PAGE 5: GENDER DISTRIBUTION
           ========================================================================= */}
        {activeTab === 'gender' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Doughnut charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ratio 24 */}
              <div
                className={`p-5 rounded-2xl border text-center ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-955'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <h3 className={`text-md font-bold mb-4 ${
                  isMinimal ? 'text-blue-650' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                }`}>
                  التوزيع حسب النوع لعام 2024 م
                </h3>
                <div className="h-[270px] flex items-center justify-center">
                  <DoughnutChart
                    size={230}
                    data={[
                      { label: 'الذكور', value: 347843, color: isMinimal ? '#2563eb' : isPulse ? '#00e5ff' : '#3b82f6' },
                      { label: 'الإناث', value: 181782, color: isMinimal ? '#db2777' : isPulse ? '#ff007f' : '#f43f5e' }
                    ]}
                    innerLabel="عام 2024"
                    innerValue="529,625"
                    theme={theme}
                  />
                </div>
              </div>

              {/* Ratio 25 */}
              <div
                className={`p-5 rounded-2xl border text-center ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-955'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <h3 className={`text-md font-bold mb-4 ${
                  isMinimal ? 'text-blue-655' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                }`}>
                  التوزيع حسب النوع لعام 2025 م
                </h3>
                <div className="h-[270px] flex items-center justify-center">
                  <DoughnutChart
                    size={230}
                    data={[
                      { label: 'الذكور', value: 343110, color: isMinimal ? '#2563eb' : isPulse ? '#00e5ff' : '#3b82f6' },
                      { label: 'الإناث', value: 189787, color: isMinimal ? '#db2777' : isPulse ? '#ff007f' : '#f43f5e' }
                    ]}
                    innerLabel="عام 2025"
                    innerValue="532,897"
                    theme={theme}
                  />
                </div>
              </div>
            </div>

            {/* Sex index metrics bar (spans col-span-full) */}
            <div
              className={`p-6 rounded-2xl border ${
                isMinimal
                  ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                  : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className={`text-md font-bold ${
                  isMinimal ? 'text-blue-650' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                }`}>
                  نسبة الذكورة (مؤشر الذكور لكل 100 أنثى)
                </h3>
                {/* Year indicators Legend */}
                <div className="flex justify-end gap-5 text-xs select-none">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded animate-pulse" style={{ backgroundColor: isMinimal ? '#2563eb' : isPulse ? '#00e5ff' : '#3b82f6' }} />
                    <span className={isMinimal ? 'text-gray-600' : 'text-gray-300'}>عام 2024 م</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded animate-pulse" style={{ backgroundColor: isMinimal ? '#0d9488' : isPulse ? '#ff007f' : '#10b981' }} />
                    <span className={isMinimal ? 'text-gray-600' : 'text-gray-300'}>عام 2025 م</span>
                  </div>
                </div>
              </div>
              <div className="h-[360px]">
                <GroupedBarChart
                  height={360}
                  labels={['عمانيون', 'وافدون', 'المجموع الكلي']}
                  datasets={[
                    {
                      label: 'عام 2024 م',
                      data: [102.2, 356.8, 191.4],
                      color: isMinimal ? '#2563eb' : isPulse ? '#00e5ff' : '#3b82f6'
                    },
                    {
                      label: 'عام 2025 م',
                      data: [102.3, 318.2, 180.8],
                      color: isMinimal ? '#0d9488' : isPulse ? '#ff007f' : '#10b981'
                    }
                  ]}
                  theme={theme}
                />
              </div>
            </div>

            {/* Split totals layout block for 2024 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Male distribution 2024 */}
              <div
                className={`p-5 rounded-2xl border ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-sm font-bold opacity-85 text-right ${
                    isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                  }`}>
                    توزيع الذكور لعام 2024
                  </h3>
                  <span className="text-[10px] opacity-60 font-mono">توزيع الذكور حسب الولايات لعام 2024 م</span>
                </div>
                <HorizontalBarChart
                  labels={WILAYAS_AR}
                  data={WILAYAS_DATA_24.map(w => w.total.male)}
                  colors={WILAYAS_AR.map((_, i) => isMinimal ? `hsl(215, 80%, ${65 - i * 3}%)` : `hsl(${190 + i * 15}, 85%, 55%)`)}
                  height={250}
                  scrollable={false}
                  theme={theme}
                />
              </div>

              {/* Female distribution 2024 */}
              <div
                className={`p-5 rounded-2xl border ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-sm font-bold opacity-85 text-right ${
                    isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                  }`}>
                    توزيع الاناث لعام 2024
                  </h3>
                  <span className="text-[10px] opacity-60 font-mono">توزيع الإناث حسب الولايات لعام 2024 م</span>
                </div>
                <HorizontalBarChart
                  labels={WILAYAS_AR}
                  data={WILAYAS_DATA_24.map(w => w.total.female)}
                  colors={WILAYAS_AR.map((_, i) => isMinimal ? `hsl(335, 75%, ${65 - i * 3}%)` : `hsl(${320 + i * 12}, 85%, 55%)`)}
                  height={250}
                  scrollable={false}
                  theme={theme}
                />
              </div>
            </div>

            {/* Split totals layout block for 2025 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Male distribution 2025 */}
              <div
                className={`p-5 rounded-2xl border ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-sm font-bold opacity-85 text-right ${
                    isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                  }`}>
                    توزيع الذكور لعام 2025
                  </h3>
                  <span className="text-[10px] opacity-60 font-mono">توزيع الذكور حسب الولايات لعام 2025 م</span>
                </div>
                <HorizontalBarChart
                  labels={WILAYAS_AR}
                  data={WILAYAS_DATA_25.map(w => w.total.male)}
                  colors={WILAYAS_AR.map((_, i) => isMinimal ? `hsl(215, 80%, ${65 - i * 3}%)` : `hsl(${190 + i * 15}, 85%, 55%)`)}
                  height={250}
                  scrollable={false}
                  theme={theme}
                />
              </div>

              {/* Female distribution 2025 */}
              <div
                className={`p-5 rounded-2xl border ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-sm font-bold opacity-85 text-right ${
                    isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500'
                  }`}>
                    توزيع الإناث لعام 2025
                  </h3>
                  <span className="text-[10px] opacity-60 font-mono">توزيع الإناث حسب الولايات لعام 2025 م</span>
                </div>
                <HorizontalBarChart
                  labels={WILAYAS_AR}
                  data={WILAYAS_DATA_25.map(w => w.total.female)}
                  colors={WILAYAS_AR.map((_, i) => isMinimal ? `hsl(335, 75%, ${65 - i * 3}%)` : `hsl(${320 + i * 12}, 85%, 55%)`)}
                  height={250}
                  scrollable={false}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
             PAGE 6: DISTRIBUTION BY NATIONALITY
           ========================================================================= */}
        {activeTab === 'nationality' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Compare nationality groupings - Enlarge Chart to full width */}
            <div
              className={`p-6 rounded-2xl border ${
                isMinimal
                  ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                  : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-base font-bold opacity-85 text-right ${
                  isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri'
                }`}>
                  العمانيون مقابل غير العمانيين (2024 و 2025 م)
                </h3>
                <span className="text-xs opacity-60 font-mono">دراسة مقارنة تفصيلية</span>
              </div>
              <div className="h-[380px] w-full">
                <GroupedBarChart
                  height={380}
                  labels={['عمانيون ذكور', 'عمانيات إناث', 'وافدون ذكور', 'وافدات إناث']}
                  datasets={[
                    {
                      label: 'عام 2024م',
                      data: [120745, 118098, 227098, 63684],
                      color: isMinimal ? '#94a3b8' : isPulse ? '#00b4d8' : '#3b82f6'
                    },
                    {
                      label: 'عام 2025م',
                      data: [123542, 120782, 219568, 69005],
                      color: isMinimal ? '#2563eb' : isPulse ? '#f72585' : '#c9a84c'
                    }
                  ]}
                  theme={theme}
                />
              </div>
            </div>

            {/* Geographic structure per Wilayat - Enlarge Chart to full width */}
            <div
              className={`p-6 rounded-2xl border ${
                isMinimal
                  ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                  : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className={`text-base font-bold opacity-85 text-right ${
                  isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri'
                }`}>
                  المواطنون والوافدون حسب كل ولاية (2024 م)
                </h3>
                <span className="text-xs opacity-60 font-mono">تفصيل جغرافي لجميع الولايات</span>
              </div>
              <p className={`text-xs mb-4 text-right ${isMinimal ? 'text-gray-500' : 'opacity-75'}`}>
                مستويات التركز السكاني وقدرة جذب واستيعاب العمالة والوافدين بين الحضر والأطراف
              </p>
              <div className="h-[430px] w-full">
                <GroupedBarChart
                  height={430}
                  labels={WILAYAS_AR}
                  datasets={[
                    {
                      label: 'المواطنون العمانيون',
                      data: WILAYAS_DATA_24.map(w => w.omani.both),
                      color: isMinimal ? '#2563eb' : isPulse ? '#00b4d8' : '#3b82f6'
                    },
                    {
                      label: 'الوافدون (غير العمانيين)',
                      data: WILAYAS_DATA_24.map(w => w.nonOmani.both),
                      color: isMinimal ? '#f43f5e' : isPulse ? '#ff007f' : '#f59e0b'
                    }
                  ]}
                  theme={theme}
                />
              </div>
            </div>

            {/* Comparison of structure for expatriates (Non-Omanis) by gender - side-by-side (2024 vs 2025) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Structure non-omanis gender 2024 */}
              <div
                className={`p-5 rounded-2xl border text-center ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <h3 className={`text-sm font-bold opacity-85 mb-4 ${
                  isMinimal ? 'text-gray-700' : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri'
                }`}>
                  هيكل غير العمانيين (الوافدين) حسب النوع (2024 م)
                </h3>
                <div className="h-[230px] flex items-center justify-center">
                  <DoughnutChart
                    data={[
                      { label: 'وافدون ذكور', value: 227098, color: '#3b82f6' },
                      { label: 'وافدات إناث', value: 63684, color: '#f43f5e' }
                    ]}
                    innerLabel="إجمالي الوافدين 24"
                    innerValue="290,782"
                    theme={theme}
                  />
                </div>
              </div>

              {/* Structure non-omanis gender 2025 */}
              <div
                className={`p-5 rounded-2xl border text-center ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <h3 className={`text-sm font-bold opacity-85 mb-4 ${
                  isMinimal ? 'text-gray-700' : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri'
                }`}>
                  هيكل غير العمانيين (الوافدين) حسب النوع (2025 م)
                </h3>
                <div className="h-[230px] flex items-center justify-center">
                  <DoughnutChart
                    data={[
                      { label: 'وافدون ذكور', value: 219568, color: '#00b4d8' },
                      { label: 'وافدات إناث', value: 69005, color: '#ff007f' }
                    ]}
                    innerLabel="إجمالي الوافدين 25"
                    innerValue="288,573"
                    theme={theme}
                  />
                </div>
              </div>
            </div>

            {/* Expatriates percentage from total within each Wilayat - side-by-side (2024 vs 2025) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 2024 Expatriate percentages */}
              <div
                className={`p-6 rounded-2xl border text-right flex flex-col justify-between ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <div className="mb-4">
                  <h3 className={`text-base font-bold opacity-85 ${
                    isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri'
                  }`}>
                    نسبة الوافدين الكلية من إجمالي تكوين كل ولاية لعام (2024 م)
                  </h3>
                  <p className={`text-xs mt-1 ${isMinimal ? 'text-gray-400' : 'opacity-65'}`}>
                    مؤشر يدل على مدى استقطاب ولايات محافظة ظفار للعمالة الوافدة في عام 2024 م
                  </p>
                </div>

                {/* No height limitations so all 10 wilayas are generated explicitly inline */}
                <div className="space-y-3.5">
                  {WILAYAS_DATA_24.map((w) => {
                    const pctOfWil = ((w.nonOmani.both / w.total.both) * 100).toFixed(1);
                    return (
                      <div key={w.name} className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-center text-xs font-bold leading-normal">
                          <span className={isMinimal ? 'text-gray-800' : 'text-white'}>{w.name}</span>
                          <span className={`font-mono ${isMinimal ? 'text-blue-600' : 'text-cyan-400'}`}>
                            {pctOfWil}% ({formatNumber(w.nonOmani.both)} وافد من أصل {formatNumber(w.total.both)})
                          </span>
                        </div>
                        <div className={`w-full h-2.5 rounded-full overflow-hidden border ${
                          isMinimal ? 'bg-gray-100 border-gray-200/50' : 'bg-slate-800/40 border-white/5'
                        }`}>
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isMinimal ? 'bg-blue-600' : isPulse ? 'bg-cyan-500' : 'bg-amber-600'
                            }`}
                            style={{ width: `${pctOfWil}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2025 Expatriate percentages */}
              <div
                className={`p-6 rounded-2xl border text-right flex flex-col justify-between ${
                  isMinimal
                    ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                    : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
                }`}
              >
                <div className="mb-4">
                  <h3 className={`text-base font-bold opacity-85 ${
                    isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri'
                  }`}>
                    نسبة الوافدين الكلية من إجمالي تكوين كل ولاية لعام (2025 م)
                  </h3>
                  <p className={`text-xs mt-1 ${isMinimal ? 'text-gray-400' : 'opacity-65'}`}>
                    مؤشر يدل على مدى استقطاب ولايات محافظة ظفار للعمالة الوافدة في عام 2025 م
                  </p>
                </div>

                {/* No height limitations so all 10 wilayas are generated explicitly inline */}
                <div className="space-y-3.5">
                  {WILAYAS_DATA_25.map((w) => {
                    const pctOfWil = ((w.nonOmani.both / w.total.both) * 100).toFixed(1);
                    return (
                      <div key={w.name} className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-center text-xs font-bold leading-normal">
                          <span className={isMinimal ? 'text-gray-800' : 'text-white'}>{w.name}</span>
                          <span className={`font-mono ${isMinimal ? 'text-blue-600' : 'text-cyan-400'}`}>
                            {pctOfWil}% ({formatNumber(w.nonOmani.both)} وافد من أصل {formatNumber(w.total.both)})
                          </span>
                        </div>
                        <div className={`w-full h-2.5 rounded-full overflow-hidden border ${
                          isMinimal ? 'bg-gray-100 border-gray-200/50' : 'bg-slate-800/40 border-white/5'
                        }`}>
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isMinimal ? 'bg-indigo-600' : isPulse ? 'bg-cyan-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${pctOfWil}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
             PAGE 7: HEALTH PLANNING COHORTS
           ========================================================================= */}
        {activeTab === 'health' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Advanced Geographic Specialization & Target cohorts dashboard */}
            <HealthPlanningDetails theme={theme} />

            <div className="border-t border-dashed my-6 border-current border-opacity-10" />

            <h3 className={`text-md font-bold text-right pt-2 ${
              isMinimal ? 'text-blue-600 font-sans' : 'text-cyan-400'
            }`}>
              🏥 المؤشرات الصحية لعام 2025 م:
            </h3>

            {/* Grid layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
              {HEALTH_GROUPS_25.map((grp) => (
                <div
                  key={grp.id}
                  className={`p-4 rounded-2xl text-center border relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg flex flex-col justify-between ${
                    isMinimal
                      ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/45'
                      : isPulse
                        ? 'bg-gradient-to-br from-[#0c1a2e] to-[#0f3460] border-cyan-500/20'
                        : 'bg-gradient-to-br from-[#1c0d02] to-[#2d1704] border-amber-600/35'
                  }`}
                >
                  <div className="text-2xl mb-1.5">{grp.icon}</div>
                  <div>
                    <span className={`text-[12px] md:text-[13px] font-black block leading-tight ${
                      isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri font-boldScale'
                    }`}>
                      {grp.titleAr}
                    </span>
                    <span className={`text-[10px] block mt-0.5 ${isMinimal ? 'text-gray-500 font-medium' : 'text-white opacity-75'}`}>
                      {grp.range}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className={`font-mono text-xl md:text-2xl font-black block leading-none ${
                      isMinimal ? 'text-gray-900' : isPulse ? 'text-white' : 'text-amber-100'
                    }`}>
                      {formatNumber(grp.count)}
                    </span>
                    <span className={`text-[10.5px] block mt-1 px-1.5 py-0.5 rounded font-semibold truncate leading-none ${
                      isMinimal ? 'text-emerald-700 bg-emerald-50' : 'text-emerald-400 bg-black/20'
                    }`}>
                      {grp.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Unified 2025 Health Demographics Panel - No page scroll needed */}
            <div
              className={`p-5 rounded-2xl border ${
                isMinimal
                  ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40'
                  : isPulse ? 'bg-[#0c1a2e]/60 border-cyan-500/15' : 'bg-[#1c0d02]/60 border-amber-600/25'
              }`}
            >
              <h3 className={`text-sm font-bold opacity-85 mb-5 text-right flex items-center gap-1.5 ${
                isMinimal ? 'text-blue-600 font-sans' : isPulse ? 'text-cyan-400' : 'text-amber-500 font-amiri'
              }`}>
                <Heart className={`w-4.5 h-4.5 text-pink-500 ${isMinimal ? '' : 'animate-pulse'}`} />
                <span>التقرير البياني الموحد: الفئات العمرية مصنفة والنسبة الهيكلية الكلية المستفيدة (لعام 2025م):</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Horizontal Bar Chart (Col-span 7) */}
                <div className="lg:col-span-7">
                  <span className="text-[11px] opacity-70 font-bold mb-3 block text-right border-b border-dashed border-current border-opacity-10 pb-1.5">أعداد الفئات العمرية المستهدفة (2025م):</span>
                  <HorizontalBarChart
                    labels={HEALTH_GROUPS_25.map(g => g.titleAr.split('(')[0].trim())}
                    data={HEALTH_GROUPS_25.map(g => g.count)}
                    colors={isMinimal ? ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#a855f7', '#14b8a6'] : ['#00b4d8', '#f72585', '#06d6a0', '#ffd166', '#a29bfe', '#74b9ff']}
                    height={250}
                    theme={theme}
                  />
                </div>

                {/* Doughnut Chart (Col-span 5) */}
                <div className="lg:col-span-12 xl:col-span-5 border-t lg:border-t-0 lg:border-r border-dashed border-current border-opacity-10 pt-4 lg:pt-0 pr-0 lg:pr-6">
                  <span className="text-[11px] opacity-70 font-bold mb-3 block text-right border-b border-dashed border-current border-opacity-10 pb-1.5">مساهمة النسبة الهيكلية للفئات الكلية:</span>
                  <DoughnutChart
                    data={HEALTH_GROUPS_25.map((g) => ({
                      label: g.titleAr.split('(')[0].trim(),
                      value: g.count,
                      color: isMinimal
                        ? (g.id === 'infants' ? '#3b82f6' : g.id === 'under5' ? '#ec4899' : g.id === 'students' ? '#10b981' : g.id === 'reproductive' ? '#f59e0b' : g.id === 'older' ? '#a855f7' : '#14b8a6')
                        : (g.id === 'infants' ? '#00b4d8' : g.id === 'under5' ? '#f72585' : g.id === 'students' ? '#06d6a0' : g.id === 'reproductive' ? '#ffd166' : g.id === 'older' ? '#e040fb' : '#64ffda')
                    }))}
                    innerLabel="الفئات المستفيدة"
                    innerValue="262,285 نسمة"
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 5. Custom Page Footer */}
      <footer
        className={`mt-10 py-5 px-6 text-center text-xs border-t transition-colors duration-500 ${
          isMinimal
            ? 'bg-white border-gray-100 text-gray-500 font-sans'
            : isPulse
              ? 'bg-[#0d1b2a] border-cyan-500/15 text-cyan-400/80'
              : 'bg-[#1a0a00] border-amber-600/25 text-amber-500/80 font-amiri'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-right tracking-wide leading-relaxed">
            المديرية العامة للخدمات الصحية بمحافظة ظفار — دائرة التخطيط و التنظيم الصحي — إدارة المعلومات الصحية
          </span>
          <span className="font-mono opacity-70">
            Directorate General of Health Services | Health Information Department &copy; 2026م
          </span>
        </div>
      </footer>
    </div>
  );
}
