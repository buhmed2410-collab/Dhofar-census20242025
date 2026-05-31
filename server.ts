import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Load environment variables in development
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for demographic analysis from Gemini
app.get('/api/demographics-summary', async (req, res) => {
  const fallbackSummary = `
<div class="space-y-4">
  <div class="border-r-4 border-amber-500/80 pr-3">
    <p class="text-sm font-bold opacity-90">موجز التحليل الإحصائي المقارن (تعداد منتصف 2024 - 2025م):</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
    <div class="p-3.5 rounded-xl bg-black/10 border border-white/5">
      <span class="text-xs font-bold text-amber-500 block mb-1">النمو السكاني والاستقرار الهيكلي</span>
      <p class="text-[11.5px] leading-relaxed opacity-85">
        شهدت محافظة ظفار نمواً سكانياً طفيفاً بنسبة <strong class="text-emerald-500">+0.62%</strong> ليرتفع التعداد من 529,625 في 2024 إلى 532,897 نسمة في 2025. يعكس هذا الاستقرار توازناً واعداً في متطلبات الاحتياجات التخطيطية الكلية والبنية التحتية للمحافظة دون ضغط ديموغرافي مفاجئ.
      </p>
    </div>
    <div class="p-3.5 rounded-xl bg-black/10 border border-white/5">
      <span class="text-xs font-bold text-cyan-400 block mb-1">التوازن النوعي وتحسين البنية</span>
      <p class="text-[11.5px] leading-relaxed opacity-85">
        سجلت الأرقام زيادة حادة في أعداد الإناث بمقدار <strong class="text-pink-500">+8,005</strong> نسمة مقابل تراجع للذكور قدره <strong class="text-red-400">-4,733</strong>، مما أدى لانخفاض ملحوظ في نسبة النوع من 191.4 ذكور لكل 100 أنثى عام 2024 إلى 180.8 عام 2025، وهو تراجع تصحيحي يحسن من هيكلية واستقرار مجتمع المحافظة.
      </p>
    </div>
    <div class="p-3.5 rounded-xl bg-black/10 border border-white/5">
      <span class="text-xs font-bold text-emerald-400 block mb-1">التوطين والتوظيف (التعمين)</span>
      <p class="text-[11.5px] leading-relaxed opacity-85">
        نمت أعداد العمانيين بمقدار <strong class="text-emerald-500">+5,481</strong> نسمة (+2.29%)، وتزامنت مع انخفاض موازٍ في أعداد الوافدين قدره <strong class="text-amber-500">-2,209</strong> نسمة (-0.76%). يشير هذا المؤشر إلى نجاح سياسات التعمين المنظمة وإحلال القوى العاملة الوطنية في القطاعات الاقتصادية المتاحة.
      </p>
    </div>
  </div>
</div>
  `;

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Return high quality fallback summary alongside information notice
    return res.json({
      summary: fallbackSummary,
      source: 'offline_fallback',
      message: 'لم يتم توفير مفتاح Gemini API، تم عرض التحليل الجاهز المدمج بنجاح.'
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `
    أنت خبير إحصائي ومستشار ديموغرافي متخصص في قراءة وتحليل بيانات التعداد السكاني لسلطنة عمان ومحافظاتها.
    قم بتحليل الفروقات السكانية والاتجاهات الديموغرافية الكلية في محافظة ظفار بدقة متناهية بناءً على الأرقام الحقيقية المذكورة تالياً لعامي 2024م و2025م:
    
    أرقام ونتائج مقارنة تعداد 2024 مقابل 2025م:
    1. إجمالي سكان ظفار: ارتفع من 529,625 نسمة في 2024 إلى 532,897 نسمة في 2025م (نمو إيجابي خفيف بمقدار +3,272 نسمة أو بنسبة +0.62%).
    2. المواطنون العمانيون: ارتفع تعدادهم من 238,843 نسمة في 2024 إلى 244,324 نسمة في 2025م (زيادة ونمو متواصل بمقدار +5,481 نسمة أو بنسبة +2.29%).
    3. الوافدون (غير العمانيين): انخفض تعدادهم من 290,782 نسمة في 2024 إلى 288,573 نسمة في 2025م (تراجع دلالي بسيط بمقدار -2,209 نسمة أو بنسبة -0.76%).
    4. الذكور الكلي: تراجع من 347,843 ذكور في 2024 إلى 343,110 ذكور في 2025م (تغير بالانخفاض قدره -4,733 نسمة).
    5. الإناث الكلي: ارتفع وتقدم بقوة من 181,782 إناث في 2024 إلى 189,787 إناث في 2025م (نمو كبير قدره +8,005 نسمة أو بنسبة +4.40%).
    6. نسبة النوع (معدل الذكورة لكل 100 أنثى): تراجع تصحيحي وتدريجي مميز للغاية من 191.4 ذكور لكل 100 أنثى في عام 24م ليصبح 180.8 ذكور لكل 100 أنثى في عام 2025م.
    
    تعليمات هامة جداً:
    - صِغ النص بلغة عربية رسمية رصينة، مشوقة، ومنظمة جداً تليق بالتقارير الاستشارية والتنموية العليا.
    - نظّم التحليل بشكل رئيسي في 3 لافتات (بطاقات/أقسام بصرية) أو فقرات منظمة:
      * الأولى: عن النمو السكاني والاستقرار الهيكلي العام للنمو الكلي الهادئ بنسبة 0.62%.
      * الثانية: عن تركيبة فئات النوع والتحول الهيكلي الرائع بانخفاض معدل الذكورة (معدل الذكور لكل 100 أنثى) من 191.4 لـ 180.8 ودلالاته في التقارب الديموغرافي وتخفيف تركز الذكور العمالة.
      * الثالثة: عن دلالات نمو المواطنين العمانيين السريع بالتزامن مع تراجع العمالة الوافدة كدليل على جهود توطين المهن والاستدامة الهيكلية.
    - استعمل لغة تنسيق HTML نظيفة (فقرات p، عناوين وبطاقات مزودة برموز تعبيرية بسيطة أو تصنيفات مميزة بالخط العريض <strong> لإبراز الأرقام الحيوية).
    - لا تخرج النص في صيغ Markdown صعبة العرض، بل وفر كود HTML نقي أو فقرات مقسمة بشكل أنيق يسهل دمجها في واجهة React مباشرة في عنصر div.
    - حافظ على الدقة والموضوعية التامة.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'أنت مستشار ديموغرافي محترف. قم بصياغة تقرير تحليلي مكثف وذكي جداً لعرضه في لوحة الإحصائيات السكانية كفقرات ذكية وبصرية أنيقة جداً.',
        temperature: 0.7,
      },
    });

    const analysisText = response.text || fallbackSummary;

    return res.json({
      summary: analysisText,
      source: 'gemini_api',
      message: 'تم توليد التحليل التنبئي والمقارن عبر ذكاء Gemini الاصطناعي بنجاح.'
    });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.json({
      summary: fallbackSummary,
      source: 'error_fallback',
      message: `خطأ في الاتصال بخدمة ذكاء Gemini: ${error.message || error}`
    });
  }
});

// Serve frontend static assets in production, or mount Vite dev server in development
const startServer = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve index.html for undefined requests (SPA client-side fallback)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start full-stack server:', err);
});
