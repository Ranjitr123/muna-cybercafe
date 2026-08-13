'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { User, Phone, Mail, FileText, CheckCircle, Clock, PlusCircle, MessageCircle, LogOut, ShieldCheck, Loader2, Send, AlertCircle } from 'lucide-react';
import { serviceOptions } from '@/components/ContactForm';

interface ServiceRequest {
  id: string;
  service: string;
  message?: string;
  status: string;
  createdAt?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  // New Request Form state
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [requestMessage, setRequestMessage] = useState('');
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchCustomerRequests = async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const res = await fetch(`/api/customer/request?email=${encodeURIComponent(user.email)}&mobile=${encodeURIComponent(user.mobile)}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.requests)) {
          setRequests(json.requests);
        } else {
          setRequests([]);
        }
      } else {
        setRequests([]);
      }
    } catch (e) {
      console.warn('Failed to fetch customer requests from Firebase users collection:', e);
      setRequests([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchCustomerRequests();
    }
  }, [user, isLoading, router]);

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    if (!selectedService) {
      setSubmitError('Please select a service requirement.');
      return;
    }

    setIsSubmittingRequest(true);

    try {
      const response = await fetch('/api/customer/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email,
          mobile: user?.mobile,
          service: selectedService,
          message: requestMessage.trim() || `Customer request submitted via Portal for ${selectedService}`,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setRequestMessage('');
        fetchCustomerRequests();
        setTimeout(() => setShowNewRequestModal(false), 1200);
      } else {
        setSubmitError(result.message || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      setSubmitError('Server connection error. Please try again.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const openNewRequestModal = () => {
    setSubmitSuccess(false);
    setSubmitError('');
    setRequestMessage('');
    setShowNewRequestModal(true);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
      </div>
    );
  }

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
            <button
              onClick={openNewRequestModal}
              className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-slate-100 font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all transform hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Request New Service</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors border border-white/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Profile Card & Service Tracker */}
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
                <span className="text-slate-800 font-medium flex items-center gap-1.5 mt-0.5 font-mono">
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
                {requests.length} Requests
              </span>
            </div>

            <div className="space-y-3">
              {isFetching ? (
                <div className="py-8 text-center text-slate-400 flex items-center justify-center gap-2 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
                  <span>Fetching live requests from Firebase...</span>
                </div>
              ) : requests.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-sm space-y-2">
                  <p>You have not submitted any service requests yet.</p>
                  <button
                    onClick={openNewRequestModal}
                    className="text-brand-600 font-bold hover:underline"
                  >
                    Submit your first request
                  </button>
                </div>
              ) : (
                requests.map((req) => {
                  const statusLower = req.status.toLowerCase();
                  const statusBadgeClass =
                    statusLower === 'new'
                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                      : statusLower === 'in progress'
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-200';

                  return (
                    <div key={req.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-slate-400">{req.id}</span>
                          <h4 className="text-sm font-bold text-slate-900">{req.service}</h4>
                        </div>
                        {req.message && <p className="text-xs text-slate-500 line-clamp-1">{req.message}</p>}
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          Date: {req.createdAt || 'Recent'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-3 py-1 rounded-full font-bold border ${statusBadgeClass}`}>
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
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Modal for New Service Request */}
        {showNewRequestModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-brand-600" />
                  <span>Request Digital Service</span>
                </h3>
                <button
                  onClick={() => setShowNewRequestModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>{submitError}</div>
                </div>
              )}

              {submitSuccess ? (
                <div className="py-6 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Request Added to Your Account!</h4>
                  <p className="text-xs text-slate-500">Your request status is set to <strong className="text-blue-600">New</strong> in Firebase.</p>
                </div>
              ) : (
                <form onSubmit={handleCreateRequest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Select Required Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Details / Query (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Need urgent appointment for fresh PAN card application..."
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewRequestModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmittingRequest}
                      className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-75"
                    >
                      {isSubmittingRequest ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

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
