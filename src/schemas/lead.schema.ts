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

/* ─── Exports ─── */

export {
  sosFormSchema,
  appointmentFormSchema,
  phoneRegex,
};

export type { SosFormData, AppointmentFormData };
