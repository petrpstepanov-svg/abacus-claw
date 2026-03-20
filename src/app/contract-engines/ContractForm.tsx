'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, PhoneMask } from '@/components/ui';
import { contractFormSchema, type ContractFormData } from '@/schemas';
import { getUtmFromUrl } from '@/lib/utm';
import type { LeadCreateResponse } from '@/types/api';

export function ContractForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: { consent: true },
  });

  const onSubmit = async (data: ContractFormData) => {
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
          comment: `Авто: ${data.carModel}. Агрегат: ${data.aggregate}`,
          consent: data.consent,
          leadType: 'CONTRACT' as const,
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
          Мы подберём агрегат и перезвоним.
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
        label="Марка и модель авто"
        placeholder="Toyota Camry 2018"
        error={errors.carModel?.message}
        registration={register('carModel')}
      />
      <Input
        label="Нужный агрегат"
        placeholder="Двигатель, КПП, редуктор..."
        error={errors.aggregate?.message}
        registration={register('aggregate')}
      />
      <label className="flex items-start gap-2 text-sm text-gray-600">
        <input type="checkbox" {...register('consent')} className="mt-1" />
        Согласен на обработку персональных данных (ФЗ-152)
      </label>
      {errors.consent && (
        <p className="text-sm text-red-500">{errors.consent.message}</p>
      )}
      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full">
        Отправить заявку
      </Button>
    </form>
  );
}
