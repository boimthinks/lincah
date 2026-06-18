import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FaqItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white overflow-hidden text-left border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-2 border border-blue-200 rounded-none mb-3">
            FAQ - PERTANYAAN UMUM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight uppercase">
            Kemudahan Informasi Keberangkatan Anda
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white border border-slate-200 overflow-hidden shadow-xs hover:border-slate-350 transition-colors">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
              >
                <span className="font-extrabold text-sm sm:text-base text-slate-850 pr-4 flex items-center gap-2.5">
                  <HelpCircle className="w-5 h-5 text-blue-700 flex-shrink-0" />
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-8 h-8 bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {openId === faq.id ? <Minus className="w-4 h-4 text-blue-700" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              {openId === faq.id && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 border-t border-slate-100 pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
