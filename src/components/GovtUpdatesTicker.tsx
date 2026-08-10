'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Sparkles, ExternalLink, X, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export interface GovtNotice {
  id: string;
  title: string;
  category: 'Odisha Job' | 'Central Job' | 'Scholarship' | 'Yojana';
  deadline: string;
  description: string;
  status: 'Apply Now' | 'Admit Card' | 'Result' | 'New Notice';
  isNew?: boolean;
}

export default function GovtUpdatesTicker() {
  const [notices, setNotices] = useState<GovtNotice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<GovtNotice | null>(null);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch('/api/notices', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.notices)) {
            setNotices(data.notices);
          }
        }
      } catch (err) {
        console.warn('[GovtUpdatesTicker] API fetch failed:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNotices();
  }, []);

  if (!isLoading && notices.length === 0) {
    return null;
  }

  // Duplicate notices array for infinite smooth scrolling loop
  const displayNotices = notices.length > 0 && notices.length < 10 ? [...notices, ...notices] : notices;

  return (
    <>
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-navy-900 via-brand-900 to-navy-900 text-white border-b border-brand-500/20 py-2.5 px-4 overflow-hidden relative shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2 bg-brand-600 px-3 py-1 rounded-full shrink-0 shadow-sm border border-brand-400/30">
            <Bell className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            <span className="text-xs font-black tracking-wide uppercase text-white">Latest Alerts</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            {isLoading ? (
              <div className="text-xs text-slate-400 animate-pulse">Loading latest alerts...</div>
            ) : (
              <div className="flex items-center gap-8 animate-marquee whitespace-nowrap text-xs font-medium text-slate-200 hover:[animation-play-state:paused] cursor-pointer">
                {displayNotices.map((notice, idx) => (
                  <button
                    key={`${notice.id}-${idx}`}
                    onClick={() => setSelectedNotice(notice)}
                    className="inline-flex items-center gap-2 hover:text-brand-300 transition-colors group"
                  >
                    {notice.isNew && (
                      <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        NEW
                      </span>
                    )}
                    <span className="text-brand-300 font-bold">[{notice.category}]</span>
                    <span className="group-hover:underline">{notice.title}</span>
                    <span className="text-slate-400 font-normal">| Deadline: {notice.deadline}</span>
                    <ArrowRight className="w-3 h-3 text-brand-400 inline" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 border border-slate-100">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
              <span className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {selectedNotice.category}
              </span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                {selectedNotice.status}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
              {selectedNotice.title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed">
              {selectedNotice.description}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Last Date to Apply:</span>
                <strong className="text-brand-700">{selectedNotice.deadline}</strong>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Service Location:</span>
                <span>Nanapada, Nirakarpur, Khordha</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919777735527?text=${encodeURIComponent('Hello Sanjit, I want assistance applying for: ' + selectedNotice.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-transform hover:scale-105 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Apply via WhatsApp (9777735527)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
