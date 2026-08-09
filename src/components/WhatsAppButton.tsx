'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  variant?: 'floating' | 'inline' | 'header';
  message?: string;
  className?: string;
  label?: string;
}

export default function WhatsAppButton({
  variant = 'inline',
  message = 'Hello, I would like to enquire about your Cyber Café & Online Services.',
  className = '',
  label = 'WhatsApp Us',
}: WhatsAppButtonProps) {
  const phoneNumber = '919777735527';
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  if (variant === 'floating') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Sanjit Rautaray"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 md:px-5 md:py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
      >
        <MessageCircle className="w-6 h-6 fill-current stroke-emerald-500 text-white" />
        <span className="hidden md:inline font-semibold text-sm tracking-wide">WhatsApp Support</span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
      </a>
    );
  }

  if (variant === 'header') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className={`inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm ${className}`}
      >
        <MessageCircle className="w-4 h-4 fill-current stroke-emerald-600 text-white" />
        <span>WhatsApp</span>
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 ${className}`}
    >
      <MessageCircle className="w-5 h-5 fill-current stroke-emerald-600 text-white" />
      <span>{label}</span>
    </a>
  );
}
