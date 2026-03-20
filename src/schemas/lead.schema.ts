import { z } from 'zod';

/* ─── Shared fields ─── */

const phoneRegex = /^\+7\d{10}$/;

const nameField = z
  .string()
  .min(2, 'Имя должно содержать минимум 2 символа')
  .max(100, 'Имя слишком длинное');

const phoneField = z
  .string()
  .regex(phoneRegex, 'Введите корректный номер телефона (+7XXXXXXXXXX)');

const consentField = z.literal(true, {
  error: 'Необходимо согласие на обработку персональных данных (ФЗ-152)',
});

const utmFields = z.object({
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

/* ─── SOS Form (Эвакуатор) ─── */

const sosFormSchema = z
  .object({
    name: nameField,
    phone: phoneField,
    location: z.string().max(500, 'Слишком длинный адрес').optional(),
    comment: z.string().max(1000, 'Комментарий слишком длинный').optional(),
    consent: consentField,
  })
  .merge(utmFields);

type SosFormData = z.infer<typeof sosFormSchema>;

/* ─── Appointment Form (Запись на автосервис) ─── */

const appointmentFormSchema = z
  .object({
    name: nameField,
    phone: phoneField,
    service: z.string().min(1, 'Выберите услугу'),
    date: z.string().optional(),
    comment: z.string().max(1000, 'Комментарий слишком длинный').optional(),
    consent: consentField,
  })
  .merge(utmFields);

type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

/* ─── Contract Form (Контрактные агрегаты) ─── */

const contractFormSchema = z
  .object({
    name: nameField,
    phone: phoneField,
    carModel: z.string().min(2, 'Укажите марку и модель авто'),
    aggregate: z.string().min(1, 'Укажите нужный агрегат'),
    consent: consentField,
  })
  .merge(utmFields);

type ContractFormData = z.infer<typeof contractFormSchema>;

/* ─── API Lead Schema (server-side validation) ─── */

const leadTypeEnum = z.enum(['EVACUATION', 'SERVICE', 'ACCIDENT', 'CONTRACT']);

const leadApiSchema = z.object({
  name: nameField,
  phone: phoneField,
  email: z.string().email('Некорректный email').optional(),
  comment: z.string().max(1000, 'Комментарий слишком длинный').optional(),
  leadType: leadTypeEnum,
  service: z.string().optional(),
  date: z.string().optional(),
  location: z.string().max(500, 'Слишком длинный адрес').optional(),
  consent: consentField,
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

type LeadApiData = z.infer<typeof leadApiSchema>;

/* ─── Exports ─── */

export {
  sosFormSchema,
  appointmentFormSchema,
  contractFormSchema,
  leadApiSchema,
  leadTypeEnum,
  phoneRegex,
};

export type { SosFormData, AppointmentFormData, ContractFormData, LeadApiData };
