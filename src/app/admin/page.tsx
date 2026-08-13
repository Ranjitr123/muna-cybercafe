'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { ShieldCheck, Phone, Mail, MessageCircle, RefreshCw, LogOut, CheckCircle2, Clock, Filter, User, Search } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  service: string;
  message?: string;
  source?: string;
  status: string;
  createdAt?: string;
}

export default function AdminPortalPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'L-1001',
      name: 'Rajesh Kumar Mohanty',
      mobile: '9777735527',
      email: 'rajesh@example.com',
      service: 'PAN Card Application',
      message: 'Need urgent new PAN card processing with Aadhaar link.',
      source: 'Website Contact Form',
      status: 'In Progress',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 'L-1002',
      name: 'Priyanka Das',
      mobile: '9668358119',
      email: 'priyanka@gmail.com',
      service: 'Scholarship Application',
      message: 'Assistance for Medhabruti scholarship portal submission.',
      source: 'Website Contact Form',
      status: 'New',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 'L-1003',
      name: 'Soumya Ranjan Swain',
      mobile: '9861000000',
      email: 'soumya@yahoo.com',
      service: 'Passport Assistance',
      message: 'Fresh passport application appointment booking.',
      source: 'Website Contact Form',
      status: 'Completed',
      createdAt: new Date().toLocaleDateString(),
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleStatusChange = (leadId: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === 'all' || lead.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile.includes(searchQuery) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (isLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-navy-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Admin Top Navigation */}
        <div className="bg-navy-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Admin Enquiry Portal</h1>
                <span className="bg-emerald-500 text-white text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
                  Live Firebase Connected
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Logged in as <strong>{user.name}</strong> ({user.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsRefreshing(true);
                setTimeout(() => setIsRefreshing(false), 600);
              }}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Leads</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Leads</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{leads.length}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">New Enquiries</span>
            <span className="text-2xl font-extrabold text-blue-700 mt-1 block">
              {leads.filter((l) => l.status === 'New').length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">In Progress</span>
            <span className="text-2xl font-extrabold text-amber-700 mt-1 block">
              {leads.filter((l) => l.status === 'In Progress').length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block">Completed</span>
            <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">
              {leads.filter((l) => l.status === 'Completed').length}
            </span>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, mobile, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-600">Filter:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Lead Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Service Required</th>
                  <th className="py-3.5 px-4">Message / Query</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const waUrl = `https://wa.me/91${lead.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Hello ${lead.name}, regarding your enquiry for ${lead.service} at Muna Tech World:`
                  )}`;

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <User className="w-4 h-4 text-slate-400" />
                          <span>{lead.name}</span>
                        </div>
                        <div className="text-xs text-slate-500 space-y-0.5 mt-1">
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <a href={`tel:${lead.mobile}`} className="hover:underline font-mono">
                              {lead.mobile}
                            </a>
                          </div>
                          {lead.email && (
                            <div className="flex items-center gap-1 text-slate-400">
                              <Mail className="w-3 h-3" />
                              <span className="truncate max-w-[180px]">{lead.email}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-lg text-xs inline-block">
                          {lead.service}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-1">Date: {lead.createdAt}</span>
                      </td>

                      <td className="py-4 px-4">
                        <p className="text-xs text-slate-600 max-w-xs leading-relaxed line-clamp-2">
                          {lead.message || 'No additional query.'}
                        </p>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                            lead.status === 'New'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : lead.status === 'In Progress'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          <a
                            href={`tel:${lead.mobile}`}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Call Customer"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
