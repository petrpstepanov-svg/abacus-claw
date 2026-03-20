/* ─── API Response Types ─── */

import type { LeadType } from '@prisma/client';

/** Successful lead creation response */
interface LeadCreateSuccess {
  success: true;
  leadId: string;
}

/** Failed lead creation response */
interface LeadCreateError {
  success: false;
  error: string;
}

/** Union type for POST /api/leads response */
type LeadCreateResponse = LeadCreateSuccess | LeadCreateError;

/** Request body for POST /api/leads */
interface LeadCreateRequest {
  name: string;
  phone: string;
  email?: string;
  comment?: string;
  leadType: LeadType;
  service?: string;
  date?: string;
  location?: string;
  consent: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/* ─── Admin API Types ─── */

/** Lead data returned by admin API */
interface AdminLead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  comment: string | null;
  leadType: LeadType;
  telegram_sent: boolean;
  sms_sent: boolean;
  not_notified: boolean;
  createdAt: string;
  updatedAt: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  ip: string | null;
  user_agent: string | null;
}

/** Successful admin leads list response */
interface AdminLeadsSuccess {
  success: true;
  leads: AdminLead[];
  total: number;
  page: number;
  totalPages: number;
}

/** Admin leads error response */
interface AdminLeadsError {
  success: false;
  error: string;
}

/** Union type for GET /api/admin/leads response */
type AdminLeadsResponse = AdminLeadsSuccess | AdminLeadsError;

/** Successful admin lead resend response */
interface AdminResendSuccess {
  success: true;
  lead: AdminLead;
}

/** Admin resend error response */
interface AdminResendError {
  success: false;
  error: string;
}

/** Union type for PATCH /api/admin/leads/[id] response */
type AdminResendResponse = AdminResendSuccess | AdminResendError;

/** Request body for PATCH /api/admin/leads/[id] */
interface AdminResendRequest {
  action: 'resend';
}

export type {
  LeadCreateSuccess,
  LeadCreateError,
  LeadCreateResponse,
  LeadCreateRequest,
  AdminLead,
  AdminLeadsSuccess,
  AdminLeadsError,
  AdminLeadsResponse,
  AdminResendSuccess,
  AdminResendError,
  AdminResendResponse,
  AdminResendRequest,
};
