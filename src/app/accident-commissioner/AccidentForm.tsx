'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, PhoneMask } from '@/components/ui';
import { getUtmFromUrl } from '@/lib/utm';
import { reachGoal } from '@/lib/yandex-metrika';
import type { LeadCreateResponse } from '@/types/api';

/* ─── Schema ─── */

const accidentFormSchema = z.object({
    name: z
      .string()
      .min(2, 'Имя должно содержать минимум 2 символа')
      .max(100, 'Имя слишком длинное'),
    phone: z
      .string()
      .regex(/^\+7\d{10}$/, 'Введите корректный номер телефона (+7XXXXXXXXXX)'),
    comment: z.string().max(1000, 'Комментарий слишком длинный').optional(),
    consent: z.literal(true, {
          error: 'Необходимо согласие на обработку персональных данных (ФЗ-152)',
    }),
});

type AccidentFormData = z.infer<typeof accidentFormSchema>;

/* ─── Component ─── */

export function AccidentForm() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

  const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
  } = useForm<AccidentFormData>({
        resolver: zodResolver(accidentFormSchema),
        defaultValues: { consent: true },
  });

  const onSubmit = async (data: AccidentFormData) => {
        setServerError(null);
        setIsSuccess(false);

        try {
                const utm = getUtmFromUrl();
                const res = await fetch('/api/leads', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                                      name: data.name,
                                      phone: data.phone,
                                      comment: data.comment,
                                      consent: data.consent,
                                      leadType: 'ACCIDENT' as const,
                                      ...utm,
                          }),
                });

          const result: LeadCreateResponse = (await res.json()) as LeadCreateResponse;

          if (!result.success) {
                    setServerError(result.error);
                    return;
          }

          setIsSuccess(true);
                reset();

          reachGoal('FORM_SUBMIT_ACCIDENT', {
                    leadType: 'ACCIDENT',
                    utm_source: utm.utm_source,
                    utm_medium: utm.utm_medium,
                    utm_campaign: utm.utm_campaign,
          });
        } catch {
                setServerError('Ошибка соединения. Попробуйте позже.');
        }
  };

  if (isSuccess) {
        return (
                <div className="rounded-xl bg-green-50 p-6 text-center shadow-lg">
                        <p className="text-lg font-semibold text-green-700">
                                  ✅ Заявка отправлена!
                        </p>p>
                        <p className="mt-2 text-green-600">
                                  Аварийный комиссар свяжется с вами в ближайшее время.
                        </p>p>
                        <button
                                    type="button"
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-4 text-sm text-accent underline"
                                  >
                                  Отправить ещё одну заявку
                        </button>button>
                </div>div>
              );
  }
  
    return (
          <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 rounded-xl bg-white p-6 shadow-lg"
                >
            {serverError && (
                          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {serverError}
                          </div>div>
                )}
                <Input
                          label="Ваше имя"
                          placeholder="Иван"
                          error={errors.name?.message}
                          registration={register('name')}
                        />
                <PhoneMask control={control} name="phone" label="Телефон" />
                <Input
                          label="Опишите ситуацию"
                          placeholder="Что произошло, где находитесь"
                          error={errors.comment?.message}
                          registration={register('comment')}
                        />
                <label className="flex items-start gap-2 text-sm text-gray-600">
                        <input type="checkbox" {...register('consent')} className="mt-1" />
                        Согласен на обработку персональных данных (ФЗ-152)
                </label>label>
            {errors.consent && (
                          <p className="text-sm text-red-500">{errors.consent.message}</p>p>
                )}
                <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          loading={isSubmitting}
                          className="w-full"
                        >
                        📋 Вызвать комиссара
                </Button>Button>
          </form>form>
        );
}</div>
