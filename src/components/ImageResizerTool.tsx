'use client';

import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Download, Upload, RefreshCw, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  maxKB: number;
  widthPx: number;
  heightPx: number;
}

const PRESETS: Preset[] = [
  { id: 'osssc_photo', name: 'OSSSC / OSSC Passport Photo', maxKB: 50, widthPx: 300, heightPx: 350 },
  { id: 'osssc_sig', name: 'OSSSC / OSSC Signature', maxKB: 20, widthPx: 300, heightPx: 120 },
  { id: 'banking_photo', name: 'IBPS / Bank Photo', maxKB: 50, widthPx: 200, heightPx: 230 },
  { id: 'custom', name: 'Custom Target Compression', maxKB: 100, widthPx: 400, heightPx: 400 },
];

export default function ImageResizerTool() {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [resizedKB, setResizedKB] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResizedUrl(null);
      setResizedKB(null);
      processImage(file, selectedPreset);
    }
  };

  const processImage = (file: File, preset: Preset) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = preset.widthPx;
      canvas.height = preset.heightPx;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, preset.widthPx, preset.heightPx);

      // Quality compression calculation
      let quality = 0.9;
      let dataUrl = canvas.toDataURL('image/jpeg', quality);
      let head = 'data:image/jpeg;base64,';
      let sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);

      // Loop reduction to fit maxKB
      while (sizeInBytes / 1024 > preset.maxKB && quality > 0.1) {
        quality -= 0.05;
        dataUrl = canvas.toDataURL('image/jpeg', quality);
        sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
      }

      setResizedUrl(dataUrl);
      setResizedKB(Math.round(sizeInBytes / 1024));
      setIsProcessing(false);
    };
  };

  const handlePresetSelect = (preset: Preset) => {
    setSelectedPreset(preset);
    if (selectedFile) {
      processImage(selectedFile, preset);
    }
  };

  return (
    <section className="py-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-3.5 py-1.5 rounded-full text-xs font-bold border border-brand-200 mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Free Utility Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Govt Application Photo & Signature Resizer
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Resize photos and compress files to exact KB limits (OSSSC, OSSC, Banking, Railway) 100% privately in your browser.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Private — Files never uploaded to server</span>
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Application Requirements Preset</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              className={`p-3 rounded-2xl text-left border transition-all text-xs ${
                selectedPreset.id === preset.id
                  ? 'bg-brand-600 text-white font-bold border-brand-600 shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className="truncate">{preset.name}</div>
              <div className={`text-[11px] mt-1 ${selectedPreset.id === preset.id ? 'text-brand-100' : 'text-slate-400'}`}>
                Max {preset.maxKB} KB ({preset.widthPx}x{preset.heightPx}px)
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Upload & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="border-2 border-dashed border-slate-200 hover:border-brand-400 rounded-3xl p-8 text-center bg-slate-50/50 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload-input"
          />
          <label htmlFor="photo-upload-input" className="cursor-pointer space-y-3 block">
            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <strong className="text-slate-900 block text-base">Click to Upload Photo / Signature</strong>
              <span className="text-slate-400 text-xs block">Supports JPG, PNG, WEBP</span>
            </div>
          </label>
        </div>

        {/* Resized Result */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col items-center justify-center text-center min-h-[220px]">
          {isProcessing ? (
            <div className="flex items-center gap-2 text-brand-600 text-sm font-bold animate-pulse">
              <RefreshCw className="w-5 h-5 animate-spin" /> Processing image...
            </div>
          ) : resizedUrl && resizedKB !== null ? (
            <div className="space-y-4 w-full">
              <div className="relative inline-block border-4 border-white shadow-md rounded-xl overflow-hidden bg-white max-h-44">
                <img src={resizedUrl} alt="Resized output" className="h-36 object-contain mx-auto" />
              </div>

              <div className="flex justify-center items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-300">
                  Ready: {resizedKB} KB (Target: &lt;{selectedPreset.maxKB} KB)
                </span>
              </div>

              <a
                href={resizedUrl}
                download={`resized_${selectedPreset.id}_${resizedKB}KB.jpg`}
                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-xl text-xs shadow-md transition-transform hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Resized Image ({resizedKB} KB)</span>
              </a>
            </div>
          ) : (
            <div className="text-slate-400 text-xs space-y-1">
              <ImageIcon className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p>Upload an image above to resize & compress automatically.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
