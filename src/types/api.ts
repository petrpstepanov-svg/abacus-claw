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

export type {
  LeadCreateSuccess,
  LeadCreateError,
  LeadCreateResponse,
  LeadCreateRequest,
};
