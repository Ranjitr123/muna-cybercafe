'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Cyber Café' | 'Services' | 'Documents' | 'Printing' | 'Workspace' | 'Customer Services';
  imageSrc: string;
  altText: string;
  caption: string;
}

export const galleryItemsData: GalleryItem[] = [
  {
    id: 'g1',
    title: 'High-Speed Computer Workstations',
    category: 'Cyber Café',
    imageSrc: '/images/gallery/workstations.png',
    altText: 'Modern high-speed computer workstations at Cyber Cafe Odisha',
    caption: 'Clean, comfortable computer systems with high-speed fiber internet.',
  },
  {
    id: 'g2',
    title: 'Online Application & Form Assistance',
    category: 'Services',
    imageSrc: '/images/gallery/online-services.png',
    altText: 'Staff assisting customer with online form filling',
    caption: 'Guided assistance for competitive exam and scholarship application submission.',
  },
  {
    id: 'g3',
    title: 'High-Volume Color Printing & Photocopy',
    category: 'Printing',
    imageSrc: '/images/gallery/printing.png',
    altText: 'Heavy duty laser printer and scanner in action',
    caption: 'Crystal clear color printing, photocopy, scanning, and lamination services.',
  },
  {
    id: 'g4',
    title: 'Digital Documentation & ID Services',
    category: 'Documents',
    imageSrc: '/images/gallery/documents.png',
    altText: 'Digital documentation assistance and resume printing',
    caption: 'Professional CV/resume creation, PDF conversion, and document scanning.',
  },
  {
    id: 'g5',
    title: 'Comfortable Customer Waiting Area',
    category: 'Workspace',
    imageSrc: '/images/gallery/workspace.png',
    altText: 'Clean workspace and customer seating desk',
    caption: 'Air-conditioned, friendly environment for all visitors.',
  },
  {
    id: 'g6',
    title: 'Instant Ticket Booking & Bill Payments',
    category: 'Customer Services',
    imageSrc: '/images/gallery/ticket-booking.png',
    altText: 'Railway and bus ticket booking assistance',
    caption: 'Hassle-free IRCTC train, flight, and bus reservation services.',
  },
];

const categories = ['All', 'Cyber Café', 'Services', 'Documents', 'Printing', 'Workspace', 'Customer Services'] as const;

export default function Gallery({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'All'
    ? galleryItemsData
    : galleryItemsData.filter((item) => item.category === activeCategory);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === 0 ? displayedItems.length - 1 : (prev as number) - 1));
  }, [selectedIndex, displayedItems.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === displayedItems.length - 1 ? 0 : (prev as number) + 1));
  }, [selectedIndex, displayedItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  const selectedImage = selectedIndex !== null ? displayedItems[selectedIndex] : null;

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedIndex(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedIndex(idx)}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5"
          >
            <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.altText}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm text-navy-800 p-3.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-6 h-6 text-brand-600" />
                </div>
              </div>

              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-navy-900 text-[11px] font-bold px-3 py-1 rounded-lg shadow-sm">
                {item.category}
              </span>
            </div>

            <div className="p-5">
              <h4 className="font-bold text-slate-900 text-base mb-1 group-hover:text-brand-600 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Lightbox Modal */}
      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl space-y-0 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside Modal */}
            <div className="flex items-center justify-between px-6 py-4 bg-navy-900 text-white border-b border-navy-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-widest bg-navy-800 px-3 py-1 rounded-full border border-navy-700">
                  {selectedImage.category}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Photo {selectedIndex + 1} of {displayedItems.length}
                </span>
              </div>

              <button
                onClick={() => setSelectedIndex(null)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors focus:outline-none"
                aria-label="Close image lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview Area with Nav Buttons */}
            <div className="relative aspect-[16/10] w-full bg-slate-950 flex items-center justify-center">
              <Image
                src={selectedImage.imageSrc}
                alt={selectedImage.altText}
                fill
                className="object-contain"
                priority
              />

              {/* Navigation Controls */}
              {displayedItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all backdrop-blur-sm focus:outline-none hover:scale-110"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all backdrop-blur-sm focus:outline-none hover:scale-110"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Caption & Info Bar */}
            <div className="p-6 bg-white space-y-2 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Cyber Café & Digital Service Center • Nirakarpur, Khordha, Odisha</span>
                <span>Press ESC or click outside to close</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{selectedImage.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

