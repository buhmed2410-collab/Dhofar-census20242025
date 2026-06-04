import React, { useState, useMemo } from 'react';
import { ThemeType } from '../types';
import { WILAYAS_DATA_24, WILAYAS_DATA_25 } from '../data';
import {
  EXACT_OMANI_25_BY_WILAYA,
  EXACT_NON_OMANI_25_BY_WILAYA
} from '../data_exact';
import {
  Info,
  Award,
  Users
} from 'lucide-react';

interface HealthPlanningDetailsProps {
  theme: ThemeType;
}

type CohortId = 'under5' | 'reproductive' | 'seniors';

export const HealthPlanningDetails: React.FC<HealthPlanningDetailsProps> = ({ theme }) => {
  const isPulse = theme === 'pulse';
  const isMinimal = theme === 'minimal';

  const [activeCohort, setActiveCohort] = useState<CohortId>('under5');

  // Helper: Format integers
  const formatNumber = (num: number) => Math.round(num).toLocaleString('en-US');

  // =========================================================================
  // 1. COMPUTE COHORT BREAKDOWN BY WILAYA FOR 2025 DYNAMICALLY
  // =========================================================================
  // Cohorts exact definition per Wilaya for 2024 and 2025 using data_exact
  const cohortBreakdown = useMemo(() => {
    const result: Record<CohortId, { name: string; count: number; pctOfWil: number }[]> = {
      under5: [],
      reproductive: [],
      seniors: []
    };

    WILAYAS_DATA_25.forEach((w) => {
      const wName = w.name;
      const totalPop = w.total.both;

      const omani25Rows = EXACT_OMANI_25_BY_WILAYA[wName] || [];
      const nonOmani25Rows = EXACT_NON_OMANI_25_BY_WILAYA[wName] || [];

      // 1. Under 5: Index 0 (0-4 years)
      const omaniU5 = omani25Rows[0] ? (omani25Rows[0].male + omani25Rows[0].female) : 0;
      const nonOmaniU5 = nonOmani25Rows[0] ? (nonOmani25Rows[0].male + nonOmani25Rows[0].female) : 0;
      const totalU5 = omaniU5 + nonOmaniU5;

      // 2. Women of Reproductive: Indices 3..9 (15-49 years females)
      let omaniRep = 0;
      let nonOmaniRep = 0;
      for (let i = 3; i <= 9; i++) {
        if (omani25Rows[i]) omaniRep += omani25Rows[i].female;
        if (nonOmani25Rows[i]) nonOmaniRep += nonOmani25Rows[i].female;
      }
      const totalRep = omaniRep + nonOmaniRep;

      // 3. Seniors: Indices 12..16 (60+ years both)
      let omani60 = 0;
      let nonOmani60 = 0;
      for (let i = 12; i <= 16; i++) {
        if (omani25Rows[i]) omani60 += (omani25Rows[i].male + omani25Rows[i].female);
        if (nonOmani25Rows[i]) nonOmani60 += (nonOmani25Rows[i].male + nonOmani25Rows[i].female);
      }
      const total60 = omani60 + nonOmani60;

      // Push to arrays with pct of Wilaya population
      result.under5.push({ name: wName, count: totalU5, pctOfWil: totalPop > 0 ? (totalU5 / totalPop) * 100 : 0 });
      result.reproductive.push({ name: wName, count: totalRep, pctOfWil: totalPop > 0 ? (totalRep / totalPop) * 100 : 0 });
      result.seniors.push({ name: wName, count: total60, pctOfWil: totalPop > 0 ? (total60 / totalPop) * 100 : 0 });
    });

    // Sort all arrays descending by count
    result.under5.sort((a, b) => b.count - a.count);
    result.reproductive.sort((a, b) => b.count - a.count);
    result.seniors.sort((a, b) => b.count - a.count);

    return result;
  }, []);

  // Cohorts master totals 24 vs 25
  const cohortMasterStats = useMemo(() => {
    return {
      under5: {
        title: 'الأطفال دون الخامسة (0-4)',
        range: 'تخطيط التحصينات والتمنيع للأطفال',
        icon: '👶',
        count24: 39420,
        count25: 39483,
        note: 'الفحص المبكر والطعوم الدورية الوقائية الأساسية',
        desc: 'معيار تحديد التوسع في العيادات المتخصصة للنمو والتحصين الشامل.'
      },
      reproductive: {
        title: 'النساء في سن الإنجاب (15-49 إناث)',
        range: 'خدمات التوليد والأمومة والرعاية اللاحقة',
        icon: '🤱',
        count24: 102411,
        count25: 107934,
        note: 'مخطط الرعاية التوليدية الفائقة وتوزيع القابلات',
        desc: 'مؤشر التنامي العائلي وتطوير أسرّة التوليد بالمستشفيات المرجعية.'
      },
      seniors: {
        title: 'كبار السن والشيخوخة (60+)',
        range: 'الرعاية الممتدة والصحة المجتمعية والمنزلية',
        icon: '👴',
        count24: 24360,
        count25: 25328,
        note: 'معدات تخفيف الأمراض المزمنة والرعاية الحرجة المتكاملة',
        desc: 'تحديد مستهدف أطباء الأسرة، فرق التمريض المنزلي، وشبكة الرعاية المركزة.'
      }
    };
  }, []);

  const activeCohortData = cohortMasterStats[activeCohort];
  const activeCohortList = cohortBreakdown[activeCohort];

  return (
    <div className="space-y-8 animate-fadeIn text-right" dir="rtl">
      
      {/* 1. SECTION PLACE: INTERACTIVE COHORTS RATING & BREAKDOWN */}
      <div className={`p-6 rounded-2xl border transition-all duration-300 ${
        isMinimal ? 'bg-white border-gray-100 shadow-sm text-gray-900 shadow-gray-100/40' : 'bg-[#0c1a2e]/60 border-cyan-500/15'
      }`}>
        <div className="border-b pb-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className={`text-md font-bold flex items-center justify-start gap-2 ${
              isMinimal ? 'text-blue-600 font-sans' : 'text-cyan-400'
            }`}>
              <Users className="w-5 h-5 text-pink-500 shrink-0" />
              <span>لوحة توزيع الفئات العمرية للتخطيط الصحي والتطعيم</span>
            </h3>
            <p className="text-[11px] opacity-75 mt-1">
              عزل وحصر مجموعات ديموغرافية حيوية متخصصة من الهرم السكاني الكلي، لمتابعة نمو تكلفتها ومعدلات الاستهداف وتوزيع الموارد الطبية.
            </p>
          </div>
          
          <div className="flex gap-1.5 shrink-0">
            {/* Quick selectors for cohorts */}
            {(['under5', 'reproductive', 'seniors'] as CohortId[]).map((cid) => (
              <button
                key={cid}
                onClick={() => setActiveCohort(cid)}
                className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  activeCohort === cid
                    ? isMinimal
                      ? 'bg-blue-600 text-white'
                      : 'bg-cyan-505 text-slate-950 font-bold'
                    : isMinimal
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-black/20 text-cyan-200 hover:bg-black/40 border border-white/5'
                }`}
              >
                {cid === 'under5' ? '👶 الأطفال < 5' : cid === 'reproductive' ? '🤱 النساء 15-49' : '👴 كبار السن +60'}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Detailed Sparkline Scores Cards (Col-span 5) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Information Card */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between h-full relative overflow-hidden ${
              isMinimal ? 'bg-slate-50 border-slate-100' : 'bg-gradient-to-br from-[#0a1424] to-[#0f2d52] border-cyan-500/20'
            }`}>
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl leading-none">{activeCohortData.icon}</span>
                  <div>
                    <h4 className={`text-sm font-black leading-tight mb-0.5 ${isMinimal ? 'text-slate-900' : 'text-white'}`}>{activeCohortData.title}</h4>
                    <span className="text-[10px] opacity-70 block">{activeCohortData.range}</span>
                  </div>
                </div>

                <div className="text-left font-mono">
                  {/* Dynamic Trend indicator */}
                  {(() => {
                    const diff = activeCohortData.count25 - activeCohortData.count24;
                    const pct = (diff / activeCohortData.count24) * 100;
                    return (
                      <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 py-0.5 px-2 rounded-full inline-block">
                        +{pct.toFixed(2)}% نمو سنوي
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Counts metrics comparison 2024 vs 2025 */}
              <div className="grid grid-cols-2 gap-4 my-5 py-4 border-y border-dashed border-current border-opacity-10 text-right">
                <div>
                  <span className="text-[10.5px] block opacity-60">التعداد في منتصف 2024م</span>
                  <span className="font-mono text-lg font-black block mt-0.5">{formatNumber(activeCohortData.count24)} <span className="text-[10px] opacity-75">نسمة طبية</span></span>
                </div>
                <div>
                  <span className="text-[10.5px] block opacity-60">التعداد في منتصف 2025م</span>
                  <span className={`font-mono text-xl font-black block mt-0.5 ${isMinimal ? 'text-blue-600' : 'text-cyan-400'}`}>{formatNumber(activeCohortData.count25)} <span className="text-[10px] opacity-75">نسمة طبية</span></span>
                </div>
              </div>

              {/* Sparkline Visualisation representation (custom SVG) */}
              <div className="mb-5">
                <span className={`text-[12px] block mb-2.5 font-bold ${isMinimal ? 'text-slate-800' : 'text-cyan-300'}`}>نمذجة منحنى الطلب (نسمة لعامي 2024 - 2025):</span>
                <div className={`h-[85px] rounded-xl p-4 flex items-center justify-between border ${
                  isMinimal ? 'bg-white border-gray-200 shadow-sm' : 'bg-black/45 border-cyan-500/25'
                }`}>
                  <span className={`font-mono text-xs md:text-sm font-extrabold ${isMinimal ? 'text-gray-700' : 'text-cyan-200'}`}>2024م: {formatNumber(activeCohortData.count24)}</span>
                  
                  {/* Miniature Sparkline path */}
                  <div className="flex-1 h-full mx-6 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path
                        d="M 5 15 L 95 4"
                        fill="none"
                        stroke={isMinimal ? "#2563eb" : "#06b6d4"}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <circle cx="5" cy="15" r="5" fill={isMinimal ? "#2563eb" : "#06b6d4"} />
                      <circle cx="95" cy="4" r="5" fill="#10b981" />
                    </svg>
                  </div>

                  <span className="font-mono text-xs md:text-sm text-emerald-400 font-black">2025م: {formatNumber(activeCohortData.count25)}</span>
                </div>
              </div>

              <div className={`p-3.5 rounded-lg text-xs leading-relaxed border ${
                isMinimal ? 'bg-blue-50/50 border-blue-100 text-gray-800' : 'bg-black/20 border-cyan-500/10 text-cyan-50/90'
              }`}>
                <div className="font-bold flex items-center justify-start gap-1 pb-1 mb-1.5 border-b border-current border-opacity-10 text-yellow-500 text-[11px]">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>توصية التوزيع الصحي والموازنة الاستثمارية:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {activeCohort === 'under5' ? (
                    'يوصى بإعادة تخصيص جزء من موازنة الرعاية التفاعلية لتأمين جرعات اللقاحات الكافية بالتنسيق مع مراكز الأمومة والطفولة المحلية وبخاصة في ولاية صلالة وثمريت وطاقة لمواجهة قفزات المواليد الدورية.'
                  ) : activeCohort === 'reproductive' ? (
                    'معدل النمو القوي (+5.39%) لفئة النساء في سن الإنجاب يفرض تخطيط دور رعاية متقدمة وتجهيز مستقر لغرف الولادة وأجنحة العناية بحديثي الولادة وتوزيع مدروس للقابلات والمساعدات الرائدات في الولاية.'
                  ) : (
                    'مزيد من المسنين يعني مستقبلاً ضاغطاً على موازنة الأطراف والعيادات المنبثقة من الأمراض المزمنة. يتعين رفع خط السعة السريرية للطب المنزلي المجتمعي ونشر الكوادر المتنقلة لتوفير الفحص والعلاجات بالمنزل.'
                  )}
                </p>
              </div>

            </div>
          </div>

          {/* Wilaya Rank Lists & Breakdowns (Col-span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className={`text-sm font-bold ${isMinimal ? 'text-blue-600' : 'text-cyan-400'}`}>
                  ترتيب الولايات حسب حجم الفئة المحددة ومستواها:
                </h4>
                <span className="text-[10px] font-mono opacity-65 flex items-center gap-1">
                  <Info className={`w-3 h-3 ${isMinimal ? 'text-blue-500' : 'text-cyan-400'}`} />
                  تفاصيل المجموعات الفرعية للولايات
                </span>
              </div>

              {/* Rank Items Lists */}
              <div className="space-y-2.5">
                {activeCohortList.map((item, idx) => {
                  const dataOM25 = EXACT_OMANI_25_BY_WILAYA[item.name] || [];
                  const dataNOM25 = EXACT_NON_OMANI_25_BY_WILAYA[item.name] || [];

                  // Compute Omani vs non Omani for the active cohort inside this specific Wilaya
                  let activeOmani = 0;
                  let activeNonOmani = 0;

                  if (activeCohort === 'under5') {
                    activeOmani = dataOM25[0] ? (dataOM25[0].male + dataOM25[0].female) : 0;
                    activeNonOmani = dataNOM25[0] ? (dataNOM25[0].male + dataNOM25[0].female) : 0;
                  } else if (activeCohort === 'reproductive') {
                    for (let i = 3; i <= 9; i++) {
                      if (dataOM25[i]) activeOmani += dataOM25[i].female;
                      if (dataNOM25[i]) activeNonOmani += dataNOM25[i].female;
                    }
                  } else if (activeCohort === 'seniors') {
                    for (let i = 12; i <= 16; i++) {
                      if (dataOM25[i]) activeOmani += (dataOM25[i].male + dataOM25[i].female);
                      if (dataNOM25[i]) activeNonOmani += (dataNOM25[i].male + dataNOM25[i].female);
                    }
                  }

                  const omaniPctOfCohort = (activeOmani / item.count) * 100;

                  return (
                    <div
                      key={item.name}
                      className={`space-y-2 p-2.5 rounded-xl border transition-all ${
                        isMinimal
                          ? 'bg-slate-50 border-slate-200/60 shadow-sm text-gray-900'
                          : 'border-white/5 bg-slate-950/60 hover:bg-slate-900/60'
                      }`}
                    >
                      {/* Name rank and count indicator */}
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 font-bold">
                          <span className={`text-xs w-6 h-6 flex items-center justify-center rounded-full font-mono font-bold ${
                            isMinimal ? 'bg-gray-200/80 text-gray-800' : 'bg-cyan-500/20 text-cyan-300'
                          }`}>{idx + 1}</span>
                          <span className={isMinimal ? 'text-gray-900 font-extrabold' : 'text-white text-md font-extrabold'}>{item.name}</span>
                          <span className={`text-[11px] font-semibold ${isMinimal ? 'text-gray-500' : 'text-gray-400'} opacity-75`}>
                            ({item.pctOfWil.toFixed(1)}% من سكان البالغ الكلي)
                          </span>
                        </div>
                        <div className="font-mono text-sm font-black text-right">
                          <span className={isMinimal ? 'text-blue-600 font-bold' : 'text-emerald-400 text-md font-black'}>{formatNumber(item.count)}</span>
                          <span className={`text-[11px] font-normal ${isMinimal ? 'text-gray-500' : 'opacity-70'} mr-1`}>نسمة</span>
                        </div>
                      </div>

                      {/* Bar representations showing omani citizens slice vs non-omani in current cohort */}
                      <div className="flex items-center gap-4">
                        <div className={`flex-1 h-4 rounded-md overflow-hidden flex border ${
                          isMinimal ? 'bg-gray-200/50 border-gray-300/40' : 'bg-slate-800/40 border-white/10'
                        }`}>
                          <div 
                            style={{ width: `${omaniPctOfCohort}%` }} 
                            className="bg-emerald-500 h-full rounded-r transition-all duration-300"
                            title={`عمانيين: ${formatNumber(activeOmani)}`}
                          />
                          <div 
                            style={{ width: `${100 - omaniPctOfCohort}%` }} 
                            className="bg-amber-600 h-full rounded-l transition-all duration-300"
                            title={`وافدين: ${formatNumber(activeNonOmani)}`}
                          />
                        </div>

                        {/* Breakdown tag */}
                        <span className={`text-[10px] font-mono shrink-0 w-[145px] text-left opacity-95 ${
                          isMinimal ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          عماني: <span className={isMinimal ? 'text-emerald-700 font-extrabold' : 'text-emerald-400 font-extrabold'}>{formatNumber(activeOmani)}</span> <span className="opacity-40">|</span> وافد: <span className={isMinimal ? 'text-amber-700 font-extrabold' : 'text-amber-600 font-extrabold'}>{formatNumber(activeNonOmani)}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Summary footnote */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 mt-4 ${
              isMinimal ? 'bg-blue-50/50 border-blue-105 text-gray-800' : 'bg-[#0f2e4a]/10 border-cyan-500/10 text-cyan-50'
            }`}>
              <Info className="w-5 h-5 text-cyan-400 shrink-0" />
              <p className="text-[10.5px] leading-relaxed">
                يظهر التحليل الموزع أن ولاية الكبرى <span className="font-bold">صلالة</span> تحتوي الحصة الأكبر من النساء الحوامل والأطفال نتيجة تعدادها المهيب، بيّد أن الولايات الطرفية مثل <span className="font-bold">رخيوت</span> وسدح و المزيونة تسجل النسب التوزيعية النسبية الأعلى لكفاءة التواجد العائلي، مما يجعلها أولوية في نشر العيادات الشاملة المستدامة.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
