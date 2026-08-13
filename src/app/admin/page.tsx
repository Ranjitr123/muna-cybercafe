'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { ShieldCheck, Phone, Mail, MessageCircle, RefreshCw, LogOut, CheckCircle2, Clock, Filter, User, Search, Database, Users, FileText, Trash2 } from 'lucide-react';

interface UserRequest {
  userDocId: string;
  userName: string;
  userMobile: string;
  userEmail: string;
  requestId: string;
  service: string;
  message?: string;
  status: string;
  createdAt?: string;
}

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  createdAt: string;
  requests?: any[];
}

export default function AdminPortalPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'requests' | 'users'>('requests');
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLiveFirebase, setIsLiveFirebase] = useState(false);

  const fetchLiveAdminData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/admin/leads', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setIsLiveFirebase(true);
          if (Array.isArray(json.userRequests)) {
            setUserRequests(json.userRequests);
          }
          if (Array.isArray(json.users)) {
            setRegisteredUsers(json.users);
          }
        }
      }
    } catch (err) {
      console.warn('Failed to fetch live admin data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    } else if (user && user.role === 'admin') {
      fetchLiveAdminData();
    }
  }, [user, isLoading, router]);

  const handleStatusChange = async (userDocId: string, requestId: string, newStatus: string) => {
    // Optimistic UI update
    setUserRequests((prev) =>
      prev.map((req) => (req.requestId === requestId ? { ...req, status: newStatus } : req))
    );

    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userDocId, requestId, status: newStatus }),
      });
    } catch (e) {
      console.warn('Failed to persist status change to Firebase user document:', e);
    }
  };

  const filteredRequests = userRequests.filter((req) => {
    const matchesStatus = filterStatus === 'all' || req.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      req.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.userMobile.includes(searchQuery) ||
      req.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredUsers = registeredUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.mobile.includes(searchQuery)
  );

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
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Admin Portal</h1>
                <span className={`text-white text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${isLiveFirebase ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                  <Database className="w-3 h-3" />
                  <span>{isLiveFirebase ? 'Live Firebase Connected' : 'Local Mode'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Logged in as Admin: <strong>{user.name}</strong> ({user.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLiveAdminData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors disabled:opacity-75"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
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

        {/* Tab Selection */}
        <div className="flex gap-2 p-1.5 bg-slate-200/80 rounded-2xl max-w-md">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'requests' ? 'bg-white text-navy-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>User Service Requests ({userRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'users' ? 'bg-white text-navy-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registered Customers ({registeredUsers.length})</span>
          </button>
        </div>

        {/* Stats Cards (Requests View) */}
        {activeTab === 'requests' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Customer Requests</span>
              <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{userRequests.length}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">New</span>
              <span className="text-2xl font-extrabold text-blue-700 mt-1 block">
                {userRequests.filter((r) => r.status.toLowerCase() === 'new').length}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">In Progress</span>
              <span className="text-2xl font-extrabold text-amber-700 mt-1 block">
                {userRequests.filter((r) => r.status.toLowerCase() === 'in progress').length}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block">Completed</span>
              <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">
                {userRequests.filter((r) => r.status.toLowerCase() === 'completed').length}
              </span>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={activeTab === 'requests' ? 'Search requests by customer name, mobile, service...' : 'Search registered users...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
            />
          </div>

          {activeTab === 'requests' && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600">Filter:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
        </div>

        {/* User Service Requests Table */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Service Requested</th>
                    <th className="py-3.5 px-4">Message / Query</th>
                    <th className="py-3.5 px-4">Status (Live Firebase User Doc)</th>
                    <th className="py-3.5 px-4 text-right">Quick Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">
                        No customer service requests found in Firebase users collection.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => {
                      const waUrl = `https://wa.me/91${req.userMobile.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Hello ${req.userName}, regarding your requested service for ${req.service} at Muna Tech World:`
                      )}`;

                      return (
                        <tr key={req.requestId} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <User className="w-4 h-4 text-slate-400" />
                              <span>{req.userName}</span>
                            </div>
                            <div className="text-xs text-slate-500 space-y-0.5 mt-1">
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-emerald-600" />
                                <a href={`tel:${req.userMobile}`} className="hover:underline font-mono">
                                  {req.userMobile}
                                </a>
                              </div>
                              {req.userEmail && (
                                <div className="flex items-center gap-1 text-slate-400">
                                  <Mail className="w-3 h-3" />
                                  <span className="truncate max-w-[180px]">{req.userEmail}</span>
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-bold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-lg text-xs inline-block">
                              {req.service}
                            </span>
                            <span className="text-[11px] text-slate-400 block mt-1">Date: {req.createdAt}</span>
                          </td>

                          <td className="py-4 px-4">
                            <p className="text-xs text-slate-600 max-w-xs leading-relaxed line-clamp-2">
                              {req.message || 'No additional query.'}
                            </p>
                          </td>

                          <td className="py-4 px-4">
                            <select
                              value={req.status}
                              onChange={(e) => handleStatusChange(req.userDocId, req.requestId, e.target.value)}
                              className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                                req.status.toLowerCase() === 'new'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : req.status.toLowerCase() === 'in progress'
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
                                href={`tel:${req.userMobile}`}
                                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                title="Call Customer"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Registered Users Table */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">User Name</th>
                    <th className="py-3.5 px-4">Email Address</th>
                    <th className="py-3.5 px-4">Mobile Number</th>
                    <th className="py-3.5 px-4">Requested Services Count</th>
                    <th className="py-3.5 px-4">Registered On</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                        No registered users found in Firebase users collection.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-900">{u.name}</td>
                        <td className="py-4 px-4 text-slate-600">{u.email}</td>
                        <td className="py-4 px-4 text-slate-800 font-mono">{u.mobile}</td>
                        <td className="py-4 px-4">
                          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            {Array.isArray(u.requests) ? u.requests.length : 0} Services Requested
                          </span>
                        </td>
                        <td className="py-4 px-4 text-xs text-slate-500">{u.createdAt}</td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={async () => {
                              if (confirm(`Are you sure you want to delete customer ${u.name} (${u.mobile}) from Firebase?`)) {
                                try {
                                  const res = await fetch(`/api/auth/delete-user?id=${u.id}`, { method: 'DELETE' });
                                  if (res.ok) {
                                    setRegisteredUsers((prev) => prev.filter((item) => item.id !== u.id));
                                    fetchLiveAdminData();
                                  } else {
                                    alert('Failed to delete user.');
                                  }
                                } catch (e) {
                                  alert('Error deleting user.');
                                }
                              }
                            }}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            title="Delete User from Firebase"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
