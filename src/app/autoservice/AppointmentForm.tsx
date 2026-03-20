'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, PhoneMask } from '@/components/ui';
import { appointmentFormSchema, type AppointmentFormData } from '@/schemas';

const SERVICE_OPTIONS = [
  'Замена масла',
  'Ремонт двигателя',
  'Шиномонтаж',
  'Электрика',
  'Кондиционер',
  'Ходовая часть',
  'Другое',
] as const;

export function AppointmentForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: { consent: true },
  });

  const onSubmit = (data: AppointmentFormData) => {
    console.log('Appointment form data:', data);
    alert('Заявка отправлена! Мы перезвоним для подтверждения.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
      <Input
        label="Ваше имя"
        placeholder="Иван"
        error={errors.name?.message}
        registration={register('name')}
      />
      <PhoneMask control={control} name="phone" label="Телефон" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="service" className="text-sm font-medium text-secondary">Услуга</label>
        <select
          id="service"
          {...register('service')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base text-secondary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
        >
          <option value="">Выберите услугу</option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service && <p className="text-sm text-red-500">{errors.service.message}</p>}
      </div>

      <Input
        label="Комментарий"
        placeholder="Опишите проблему"
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

      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full">
        Записаться
      </Button>
    </form>
  );
}
