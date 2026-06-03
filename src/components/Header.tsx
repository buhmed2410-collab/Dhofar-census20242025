/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeType } from '../types';

interface HeaderProps {
  theme: ThemeType;
}

export const Header: React.FC<HeaderProps> = ({ theme }) => {
  const isPulse = theme === 'pulse';
  const isMinimal = theme === 'minimal';

  return (
    <header
      id="main-app-header"
      className={`relative mt-8 mx-4 md:mx-8 px-6 py-6 md:py-8 rounded-2xl transition-all duration-500 overflow-hidden text-center md:text-right ${
        isMinimal
          ? 'bg-slate-50/80 border border-slate-100 shadow-sm backdrop-blur-md'
          : 'bg-gradient-to-r from-[#0d1b2a] via-[#112240] to-[#162a45] border-b-2 border-cyan-400/90 shadow-[0_10px_35px_rgba(6,182,212,0.15)]'
      }`}
    >

      {/* Futuristic Background Overlay in Pulse Mode */}
      {isPulse && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(6,182,212,0.1)_0%,transparent_70%)] pointer-events-none animate-pulse-slow" />
      )}

      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Right side organizational group (Arabic) */}
        <div className="w-full xl:w-auto xl:order-1 flex flex-col items-center xl:items-start">
          <div className={`px-4 py-2.5 rounded-xl border-r-4 transition-all duration-300 w-full xl:w-auto flex flex-col gap-1 text-center xl:text-right ${
            isMinimal
              ? 'bg-white border-blue-600 shadow-sm/50'
              : isPulse
                ? 'bg-cyan-500/5 border-cyan-400/80 shadow-[0_2px_12px_rgba(6,182,212,0.05)]'
                : 'bg-[#1a0a00]/40 border-amber-500/80 shadow-[0_2px_12px_rgba(217,119,6,0.05)]'
          }`}>
            <span
              className={`text-[12.5px] md:text-[14px] font-extrabold tracking-wide ${
                isMinimal
                  ? 'text-slate-800'
                  : isPulse ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]' : 'text-amber-100 font-amiri text-lg'
              }`}
            >
              المديرية العامة للخدمات الصحية بمحافظة ظفار
            </span>
            <div className={`h-[1px] w-12 mx-auto xl:mr-0 xl:ml-auto my-1 ${
              isMinimal ? 'bg-slate-200' : isPulse ? 'bg-cyan-400/30' : 'bg-amber-600/30'
            }`} />
            <span
              className={`text-[10px] md:text-[11.5px] font-semibold leading-relaxed ${
                isMinimal
                  ? 'text-slate-500'
                  : isPulse ? 'text-cyan-100/85' : 'text-amber-200/90 font-amiri'
              }`}
            >
              دائرة التخطيط و التنظيم الصحي &nbsp;|&nbsp; إدارة المعلومات الصحية
            </span>
          </div>
        </div>

        {/* Center application title */}
        <div className="w-full xl:flex-1 xl:order-2 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <div className={`h-1.5 w-1.5 rounded-full ${isMinimal ? 'bg-blue-600' : isPulse ? 'bg-cyan-400 animate-ping' : 'bg-amber-500'}`} />
            <span className={`text-[10.5px] md:text-[11.5px] font-black tracking-widest uppercase select-none ${
              isMinimal ? 'text-slate-400 font-sans' : isPulse ? 'text-cyan-400/90 font-mono' : 'text-amber-400/90 font-serif'
            }`}>
              {isMinimal ? '• Official Census Repository •' : isPulse ? '• Demographic Intel Portal •' : '• السجل الديموغرافي الوطني •'}
            </span>
            <div className={`h-1.5 w-1.5 rounded-full ${isMinimal ? 'bg-blue-600' : isPulse ? 'bg-cyan-400' : 'bg-amber-500'}`} />
          </div>
          
          <h1
            className={`text-2xl md:text-[32px] font-black tracking-tight leading-tight select-none py-1 transition-all ${
              isMinimal
                ? 'text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700'
                : isPulse
                  ? 'text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-sky-200 filter drop-shadow-[0_2px_10px_rgba(6,182,212,0.4)]'
                  : 'text-amber-500 bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-amber-200 to-amber-50 font-amiri font-bold text-3xl md:text-[38px] drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]'
            }`}
          >
            التعداد السكاني لمحافظة ظفار 2024-2025
          </h1>

          {/* Aesthetic theme-specific decorative lines */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className={`h-[1px] w-8 ${isMinimal ? 'bg-slate-300' : isPulse ? 'bg-cyan-500/40' : 'bg-amber-500/40'}`} />
            <div className={`h-1 w-1 rounded-full ${isMinimal ? 'bg-blue-600' : isPulse ? 'bg-cyan-400 animate-pulse' : 'bg-amber-500'}`} />
            <div className={`h-[2px] w-14 ${isMinimal ? 'bg-blue-600' : isPulse ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-500 to-transparent'}`} />
            <div className={`h-1 w-1 rounded-full ${isMinimal ? 'bg-blue-600' : isPulse ? 'bg-cyan-400 animate-pulse' : 'bg-amber-500'}`} />
            <div className={`h-[1px] w-8 ${isMinimal ? 'bg-slate-300' : isPulse ? 'bg-cyan-500/40' : 'bg-amber-500/40'}`} />
          </div>
        </div>

        {/* Left side organizational group (English) */}
        <div className="w-full xl:w-auto xl:order-3 flex flex-col items-center xl:items-end">
          <div className={`px-4 py-2.5 rounded-xl border-l-4 transition-all duration-300 w-full xl:w-auto flex flex-col gap-1 text-center xl:text-left ${
            isMinimal
              ? 'bg-white border-blue-600 shadow-sm/50'
              : isPulse
                ? 'bg-cyan-500/5 border-cyan-400/80 shadow-[0_2px_12px_rgba(6,182,212,0.05)]'
                : 'bg-[#1a0a00]/40 border-amber-500/80 shadow-[0_2px_12px_rgba(217,119,6,0.05)]'
          }`}>
            <span
              className={`text-[11.5px] md:text-[13px] font-extrabold tracking-wide ${
                isMinimal
                  ? 'text-slate-800 font-sans'
                  : isPulse ? 'text-cyan-300' : 'text-amber-100 font-serif'
              }`}
            >
              Directorate General of Health Services - Dhofar
            </span>
            <div className={`h-[1px] w-12 mx-auto xl:ml-0 xl:mr-auto my-1 ${
              isMinimal ? 'bg-slate-200' : isPulse ? 'bg-cyan-400/30' : 'bg-amber-600/30'
            }`} />
            <span
              className={`text-[9.5px] md:text-[11px] font-semibold leading-relaxed tracking-wide ${
                isMinimal
                  ? 'text-slate-500'
                  : isPulse ? 'text-cyan-100/85 font-mono' : 'text-amber-200/90'
              }`}
            >
              Planning & Health Regulation &nbsp;|&nbsp; Health Information Dept
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
