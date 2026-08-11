'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Monitor, MapPin } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Courses', href: '/courses' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'glass-nav shadow-md border-b border-slate-200/80' : 'bg-white border-b border-slate-100'}`}>
      <div className="bg-navy-800 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 truncate max-w-md sm:max-w-none">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>At - Nanapada, Nirakarpur, Khordha, Odisha - 752019</span>
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:flex items-center gap-1.5">
              <span className="text-slate-400">Owner:</span>
              <strong className="text-white font-medium">Sanjit Rautaray</strong>
              <span className="text-slate-500 mx-1">|</span>
              <span className="text-slate-400">Manager:</span>
              <strong className="text-white font-medium">Bibhudatta Subudhi</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <a href="tel:9777735527" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>9777735527</span>
            </a>
            <span className="text-slate-500">/</span>
            <a href="tel:9668358119" className="hover:text-white transition-colors">
              <span>9668358119</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-bold text-slate-900 leading-tight group-hover:text-brand-700 transition-colors">
                Cyber Café <span className="text-brand-600">&</span> Digital Hub
              </span>
              <span className="block text-xs font-medium text-slate-500 tracking-wider">
                Online Services • Odisha
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:9777735527"
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-brand-700 px-3 py-2 text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span>Call Us</span>
            </a>
            <WhatsAppButton variant="header" />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <WhatsAppButton variant="header" label="WhatsApp" className="text-xs px-2.5 py-1.5" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="tel:9777735527"
              className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2.5 rounded-lg text-sm"
            >
              <Phone className="w-4 h-4 text-brand-700" />
              <span>Call Sanjit Rautaray (9777735527)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
