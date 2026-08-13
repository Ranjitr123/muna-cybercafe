'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle, Phone, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { saveEnquiryToFirebase } from '@/lib/firebaseService';

export const serviceOptions = [
  'Online Form Filling',
  'PAN Card',
  'Aadhaar Assistance',
  'Passport Assistance',
  'Ticket Booking',
  'Exam Form',
  'Scholarship',
  'Printing / Scanning',
  'Resume / CV',
  'Other Cyber Café Services',
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    service: serviceOptions.includes(preselectedService) ? preselectedService : serviceOptions[0],
    message: '',
    websiteHoneypot: '',
  });

  useEffect(() => {
    if (preselectedService && serviceOptions.includes(preselectedService)) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedData, setSubmittedData] = useState<{ name: string; mobile?: string; service: string; message?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number (e.g. 9777735527)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message or query';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message should be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Save directly to Firebase Cloud Firestore
      saveEnquiryToFirebase({
        name: formData.fullName.trim(),
        mobile: formData.mobileNumber.trim(),
        email: formData.email.trim(),
        service: formData.service,
        message: formData.message.trim(),
        source: 'Website Contact Form (Live Client)',
      }).catch((err) => console.warn('Client Firebase write error:', err));

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        const submittedDetails = {
          name: formData.fullName.trim(),
          mobile: formData.mobileNumber.trim(),
          service: formData.service,
          message: formData.message.trim(),
        };
        setSubmittedData(submittedDetails);

        // Auto-open WhatsApp chat with pre-filled message
        const waText = `Hello Sanjit, I submitted an enquiry on your website:\n\n*Name:* ${submittedDetails.name}\n*Mobile:* ${submittedDetails.mobile}\n*Service:* ${submittedDetails.service}\n*Message:* ${submittedDetails.message}`;
        const waUrl = `https://wa.me/919777735527?text=${encodeURIComponent(waText)}`;
        
        try {
          window.open(waUrl, '_blank');
        } catch (e) {
          // Popup blocked safeguard
        }

        setFormData({
          fullName: '',
          mobileNumber: '',
          email: '',
          service: serviceOptions[0],
          message: '',
          websiteHoneypot: '',
        });
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitError(result.message || 'Something went wrong. Please try again or contact us directly on WhatsApp.');
      }
    } catch (error) {
      setSubmitError('Failed to connect to the server. Please check your internet connection or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess && submittedData) {
    const whatsappText = `Hello Sanjit, I submitted an enquiry on your website:\n\n*Name:* ${submittedData.name}\n*Mobile:* ${submittedData.mobile || ''}\n*Service:* ${submittedData.service}\n*Message:* ${submittedData.message || ''}`;
    const whatsappUrl = `https://wa.me/919777735527?text=${encodeURIComponent(whatsappText)}`;

    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Enquiry Submitted!</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Thank you! Your enquiry for <strong className="text-brand-700">{submittedData.service}</strong> has been logged. We are also redirecting you to WhatsApp for direct chat.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-center items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-current stroke-emerald-600 text-white" />
            <span>Continue on WhatsApp</span>
          </a>

          <a
            href="tel:9777735527"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors"
          >
            <Phone className="w-4 h-4 text-brand-700" />
            <span>Call Sanjit (9777735527)</span>
          </a>
        </div>

        <button
          onClick={() => setSubmitSuccess(false)}
          className="text-xs font-medium text-slate-400 hover:text-slate-600 underline pt-2"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100 space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="websiteHoneypot">Leave this empty</label>
        <input
          type="text"
          id="websiteHoneypot"
          name="websiteHoneypot"
          value={formData.websiteHoneypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>{submitError}</div>
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="e.g. Rajesh Kumar Mohanty"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.fullName
              ? 'border-red-400 focus:ring-red-200 bg-red-50/30'
              : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
          }`}
        />
        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            placeholder="e.g. 9777735527"
            value={formData.mobileNumber}
            onChange={handleChange}
            maxLength={10}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.mobileNumber
                ? 'border-red-400 focus:ring-red-200 bg-red-50/30'
                : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
            }`}
          />
          {errors.mobileNumber && <p className="text-xs text-red-500 mt-1">{errors.mobileNumber}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. rajesh@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? 'border-red-400 focus:ring-red-200 bg-red-50/30'
                : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Service Required <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white"
        >
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Message / Requirement Details <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Please describe what assistance or documents you need..."
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.message
              ? 'border-red-400 focus:ring-red-200 bg-red-50/30'
              : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
          }`}
        ></textarea>
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Submit Enquiry</span>
          </>
        )}
      </button>
    </form>
  );
}
