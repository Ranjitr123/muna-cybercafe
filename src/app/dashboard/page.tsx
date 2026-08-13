'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { User, Phone, Mail, FileText, CheckCircle, Clock, PlusCircle, MessageCircle, LogOut, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  // Sample service requests linked to customer
  const sampleRequests = [
    {
      id: 'REQ-101',
      service: 'PAN Card Application',
      date: 'Today, 2:30 PM',
      status: 'In Progress',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'REQ-100',
      service: 'Aadhaar Card Update Assistance',
      date: 'Yesterday',
      status: 'Completed',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
  ];

  const waText = `Hello Sanjit, I am logged in as ${user.name} (${user.mobile}). I need assistance with my service request.`;
  const waUrl = `https://wa.me/919777735527?text=${encodeURIComponent(waText)}`;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-navy-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Customer Portal Account</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome, {user.name}!</h1>
            <p className="text-blue-100 text-sm max-w-xl">
              Track your online form applications, computer courses, and digital service requests at Muna Tech World, Nirakarpur.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-slate-100 font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all transform hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Service Request</span>
            </Link>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors border border-white/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Profile Card & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-brand-600" />
              <span>Account Profile</span>
            </h3>
            <div className="space-y-3 text-sm border-t border-slate-100 pt-3">
              <div>
                <span className="text-slate-400 text-xs block">Full Name</span>
                <strong className="text-slate-800 font-semibold">{user.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Mobile Number</span>
                <span className="text-slate-800 font-medium flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  {user.mobile}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Email Address</span>
                <span className="text-slate-800 font-medium flex items-center gap-1.5 mt-0.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-brand-600" />
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-slate-100 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                <span>My Active Service Requests</span>
              </h3>
              <span className="text-xs bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-bold">
                {sampleRequests.length} Requests
              </span>
            </div>

            <div className="space-y-3">
              {sampleRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{req.id}</span>
                      <h4 className="text-sm font-bold text-slate-900">{req.service}</h4>
                    </div>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Submitted: {req.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-bold border ${req.statusColor}`}>
                      {req.status}
                    </span>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Banner */}
        <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">Need assistance with your documentation or forms?</h4>
            <p className="text-emerald-200 text-sm">
              Sanjit Rautaray & team at Muna Tech World are ready to assist you directly.
            </p>
          </div>

          <a
            href="tel:9777735527"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>Call 9777735527</span>
          </a>
        </div>
      </div>
    </div>
  );
}
