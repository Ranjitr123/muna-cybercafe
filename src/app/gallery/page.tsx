import React from 'react';
import { Metadata } from 'next';
import { Camera } from 'lucide-react';
import Gallery from '@/components/Gallery';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Gallery | Cyber Cafe Odisha',
  description:
    'Explore the photo gallery of Cyber Café / Digital Service Center in Odisha. View computer workstations, printing equipment, and digital service infrastructure.',
};

export default function GalleryPage() {
  return (
    <div className="space-y-12 md:space-y-16 pb-16">
      <section className="bg-gradient-to-b from-navy-800 to-navy-900 text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-brand-800/80 border border-brand-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-200">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Facility Photo Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Cyber Café <span className="text-brand-400">Photo Gallery</span>
          </h1>

          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Take a look at our clean workstations, color printing facilities, scanning setups, and customer service environment in Odisha.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Gallery />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900">Need Online Application Assistance Today?</h3>
            <p className="text-slate-600 text-sm">
              Visit our Cyber Café in Odisha or contact Sanjit Rautaray on WhatsApp for quick advice.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <WhatsAppButton variant="inline" label="WhatsApp Sanjit Rautaray" className="py-3 px-5 text-xs sm:text-sm" />
          </div>
        </div>
      </section>
    </div>
  );
}
