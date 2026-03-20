'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, PhoneMask } from '@/components/ui';
import { sosFormSchema, type SosFormData } from '@/schemas';
import { getUtmFromUrl } from '@/lib/utm';
import { reachGoal } from '@/lib/yandex-metrika';
import type { LeadCreateResponse } from '@/types/api';

export function SosForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SosFormData>({
    resolver: zodResolver(sosFormSchema),
    defaultValues: { consent: true },
  });

  const onSubmit = async (data: SosFormData) => {
    setServerError(null);
    setIsSuccess(false);

    try {
      const utm = getUtmFromUrl();
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          leadType: 'EVACUATION' as const,
          ...utm,
        }),
      });

      const result: LeadCreateResponse = await res.json() as LeadCreateResponse;

      if (!result.success) {
        setServerError(result.error);
        return;
      }

      setIsSuccess(true);
      reset();

      reachGoal('FORM_SUBMIT_SOS', {
        leadType: 'EVACUATION',
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
        </p>
        <p className="mt-2 text-green-600">
          Мы перезвоним в течение 2 минут.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sm text-accent underline"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
      {serverError && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {serverError}
        </div>
      )}
      <Input
        label="Ваше имя"
        placeholder="Иван"
        error={errors.name?.message}
        registration={register('name')}
      />
      <PhoneMask control={control} name="phone" label="Телефон" />
      <Input
        label="Где находится авто?"
        placeholder="Адрес или ориентир"
        error={errors.location?.message}
        registration={register('location')}
      />
      <Input
        label="Комментарий"
        placeholder="Опишите ситуацию"
        error={errors.comment?.message}
        registration={register('comment')}
      />
      <label className="flex items-start gap-2 text-sm text-gray-600">
        <input type="checkbox" {...register('consent')} className="mt-1" />
        Согласен на обработку персональных данных (ФЗ-152)
      </label>
      {errors.consent && (
        <p className="text-sm text-red-500">{errors.consent.message}</p>
      )}
      <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full">
        🆘 Отправить заявку
      </Button>
    </form>
  );
}
