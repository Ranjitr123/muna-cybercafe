'use client';

import React, { useState } from 'react';
import { Printer, Calculator, FileText, CheckCircle2, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface PrintOption {
  id: string;
  name: string;
  pricePerUnit: number;
  unitLabel: string;
}

const PRINT_OPTIONS: PrintOption[] = [
  { id: 'bw_print', name: 'Black & White Printing / Xerox', pricePerUnit: 2, unitLabel: 'Pages' },
  { id: 'color_print', name: 'Color Document Printing', pricePerUnit: 5, unitLabel: 'Pages' },
  { id: 'photo_print', name: 'Glossy Photo Print (4x6 / A4)', pricePerUnit: 25, unitLabel: 'Photos' },
  { id: 'passport_photo', name: 'Passport Size Photos (Batch of 8 Pcs)', pricePerUnit: 30, unitLabel: 'Sets' },
  { id: 'lamination', name: 'A4 High-Quality Lamination', pricePerUnit: 20, unitLabel: 'Pages' },
  { id: 'scan_pdf', name: 'High-Res Scanning & PDF Creation', pricePerUnit: 5, unitLabel: 'Documents' },
];

export default function PrintCalculator() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    bw_print: 0,
    color_print: 0,
    photo_print: 0,
    passport_photo: 0,
    lamination: 0,
    scan_pdf: 0,
  });

  const [customerName, setCustomerName] = useState('');

  const handleQuantityChange = (id: string, value: number) => {
    const qty = Math.max(0, value);
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const calculateTotal = () => {
    return PRINT_OPTIONS.reduce((sum, opt) => {
      const qty = quantities[opt.id] || 0;
      return sum + qty * opt.pricePerUnit;
    }, 0);
  };

  const totalCost = calculateTotal();

  const handlePreOrder = () => {
    const selectedItems = PRINT_OPTIONS.filter((opt) => (quantities[opt.id] || 0) > 0)
      .map((opt) => `• ${opt.name}: ${quantities[opt.id]} ${opt.unitLabel} (₹${(quantities[opt.id] || 0) * opt.pricePerUnit})`)
      .join('\n');

    const message = `Hello Sanjit, I calculated my print order on your website:\n\n` +
      `👤 *Customer Name:* ${customerName.trim() || 'Valued Customer'}\n` +
      `📄 *Printing Requirement:* \n${selectedItems}\n\n` +
      `💰 *Estimated Total:* ₹${totalCost}\n\n` +
      `I want to send my documents for printing and pick up at Cyber Café Nanapada, Nirakarpur.`;

    const whatsappUrl = `https://wa.me/919777735527?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 px-3.5 py-1.5 rounded-full text-xs font-bold border border-brand-400/30 mb-2">
            <Calculator className="w-4 h-4 text-brand-400" />
            <span>Instant Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Printing & Scanning Cost Calculator
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Calculate your total printing cost and pre-order for fast pickup at Cyber Café Nanapada, Nirakarpur.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 px-6 py-4 rounded-2xl text-right shrink-0 w-full md:w-auto">
          <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Total</span>
          <span className="text-3xl font-black text-emerald-400">₹{totalCost}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRINT_OPTIONS.map((option) => {
          const qty = quantities[option.id] || 0;
          return (
            <div
              key={option.id}
              className={`p-4 rounded-2xl border transition-all ${
                qty > 0 ? 'bg-slate-800/90 border-brand-500/50 shadow-md' : 'bg-slate-800/40 border-slate-800'
              } flex items-center justify-between gap-4`}
            >
              <div>
                <h4 className="font-bold text-sm text-slate-100">{option.name}</h4>
                <p className="text-xs text-slate-400">
                  ₹{option.pricePerUnit} / {option.unitLabel.replace(/s$/, '')}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(option.id, qty - 1)}
                  className="w-8 h-8 rounded-xl bg-slate-700 hover:bg-slate-600 font-bold text-white flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  value={qty}
                  onChange={(e) => handleQuantityChange(option.id, parseInt(e.target.value, 10) || 0)}
                  className="w-12 text-center bg-slate-900 border border-slate-700 rounded-lg py-1 font-bold text-sm text-brand-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(option.id, qty + 1)}
                  className="w-8 h-8 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-white flex items-center justify-center transition-colors shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Enter your name (optional)..."
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full sm:w-72 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />

        <button
          onClick={handlePreOrder}
          disabled={totalCost === 0}
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg transform hover:scale-102"
        >
          <MessageCircle className="w-5 h-5 fill-current stroke-emerald-600 text-white" />
          <span>Send Print Order via WhatsApp (₹{totalCost})</span>
        </button>
      </div>
    </section>
  );
}
