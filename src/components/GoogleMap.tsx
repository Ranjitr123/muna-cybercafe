'use client';

import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface GoogleMapProps {
  mapUrl?: string;
  directMapLink?: string;
  className?: string;
}

export default function GoogleMap({
  mapUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    'https://maps.google.com/maps?q=Muna%20Tech%20World%20Shop%2C%20Odisha&t=&z=15&ie=UTF8&iwloc=&output=embed',
  directMapLink = process.env.NEXT_PUBLIC_GOOGLE_MAPS_DIRECT_URL ||
    'https://maps.app.goo.gl/UWQocbBw4R4p5tgu8',
  className = '',
}: GoogleMapProps) {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 ${className}`}>
      {/* Location Badge Header */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <span className="block text-xs font-bold text-slate-900">Muna Tech World Shop</span>
          <span className="block text-[11px] text-slate-500 font-medium">Cyber Café & Digital Services • Odisha</span>
        </div>
      </div>

      <iframe
        src={mapUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Muna Tech World Shop Google Maps Location"
        className="w-full h-full min-h-[350px] opacity-95 hover:opacity-100 transition-all duration-300"
      ></iframe>

      {/* External Map Directions Button */}
      <div className="absolute bottom-4 right-4 z-10">
        <a
          href={directMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-navy-800 hover:bg-navy-900 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg transition-colors"
        >
          <Navigation className="w-3.5 h-3.5 text-brand-400" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>
    </div>
  );
}
