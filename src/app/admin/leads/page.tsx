'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken, removeAuthToken } from '@/lib/auth';
import { Button } from '@/components/ui';
import {
  LeadsTable,
  LeadsFilters,
  Pagination,
  type LeadsFiltersState,
} from '@/components/admin';
import type { AdminLead, AdminLeadsResponse, AdminResendResponse } from '@/types/api';

const DEFAULT_FILTERS: LeadsFiltersState = {
  leadType: 'all',
  dateFilter: 'all',
  notificationStatus: 'all',
};

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<LeadsFiltersState>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchLeads = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      router.push('/admin');
      return;
    }

    setLoading(true);

    const params = new URLSearchParams({
      page: String(page),
      limit: '20',
    });

    if (filters.leadType !== 'all') params.set('leadType', filters.leadType);
    if (filters.dateFilter !== 'all') params.set('dateFilter', filters.dateFilter);
    if (filters.notificationStatus !== 'all')
      params.set('notificationStatus', filters.notificationStatus);

    try {
      const res = await fetch(`/api/admin/leads?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        removeAuthToken();
        router.push('/admin');
        return;
      }

      const data: AdminLeadsResponse = await res.json() as AdminLeadsResponse;

      if (data.success) {
        setLeads(data.leads);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      }
    } catch {
      showToast('error', 'Ошибка загрузки заявок');
    } finally {
      setLoading(false);
    }
  }, [page, filters, router]);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  const handleResend = async (id: string) => {
    const token = getAuthToken();
    if (!token) return;

    setResendingId(id);

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'resend' }),
      });

      const data: AdminResendResponse = await res.json() as AdminResendResponse;

      if (data.success) {
        showToast('success', 'Уведомления переотправлены');
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? data.lead : l)),
        );
      } else {
        showToast('error', data.error);
      }
    } catch {
      showToast('error', 'Ошибка при переотправке');
    } finally {
      setResendingId(null);
    }
  };

  const handleFilterChange = (newFilters: LeadsFiltersState) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleLogout = () => {
    removeAuthToken();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      {/* Toast */}
      {toast && (
        <div
          className={[
            'fixed right-4 top-4 z-50 rounded-lg px-4 py-3 text-sm font-medium shadow-lg',
            toast.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800',
          ].join(' ')}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-unbounded text-xl font-semibold text-secondary sm:text-2xl">
            Панель управления заявками
          </h1>
          <p className="mt-1 text-sm text-gray-500">Всего заявок: {total}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Выйти
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <LeadsFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex h-40 items-center justify-center text-gray-400">
          Загрузка...
        </div>
      ) : (
        <>
          <LeadsTable
            leads={leads}
            onResend={handleResend}
            resendingId={resendingId}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
