'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

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
    imageSrc: '/images/gallery/workstations.svg',
    altText: 'Modern high-speed computer workstations at Cyber Cafe Odisha',
    caption: 'Clean, comfortable computer systems with high-speed fiber internet.',
  },
  {
    id: 'g2',
    title: 'Online Application & Form Assistance',
    category: 'Services',
    imageSrc: '/images/gallery/online-services.svg',
    altText: 'Staff assisting customer with online form filling',
    caption: 'Guided assistance for competitive exam and scholarship application submission.',
  },
  {
    id: 'g3',
    title: 'High-Volume Color Printing & Photocopy',
    category: 'Printing',
    imageSrc: '/images/gallery/printing.svg',
    altText: 'Heavy duty laser printer and scanner in action',
    caption: 'Crystal clear color printing, photocopy, scanning, and lamination services.',
  },
  {
    id: 'g4',
    title: 'Digital Documentation & ID Services',
    category: 'Documents',
    imageSrc: '/images/gallery/documents.svg',
    altText: 'Digital documentation assistance and resume printing',
    caption: 'Professional CV/resume creation, PDF conversion, and document scanning.',
  },
  {
    id: 'g5',
    title: 'Comfortable Customer Waiting Area',
    category: 'Workspace',
    imageSrc: '/images/gallery/workspace.svg',
    altText: 'Clean workspace and customer seating desk',
    caption: 'Air-conditioned, friendly environment for all visitors.',
  },
  {
    id: 'g6',
    title: 'Instant Ticket Booking & Bill Payments',
    category: 'Customer Services',
    imageSrc: '/images/gallery/ticket-booking.svg',
    altText: 'Railway and bus ticket booking assistance',
    caption: 'Hassle-free IRCTC train, flight, and bus reservation services.',
  },
];

const categories = ['All', 'Cyber Café', 'Services', 'Documents', 'Printing', 'Workspace', 'Customer Services'] as const;

export default function Gallery({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'All'
    ? galleryItemsData
    : galleryItemsData.filter((item) => item.category === activeCategory);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.altText}
                fill
                loading="lazy"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm text-navy-800 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>

              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-navy-800 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
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

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-navy-900/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-slate-900">
              <Image
                src={selectedImage.imageSrc}
                alt={selectedImage.altText}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                  {selectedImage.category}
                </span>
                <span className="text-xs text-slate-400">Cyber Café Odisha</span>
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
