'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, PhoneMask } from '@/components/ui';
import { sosFormSchema, type SosFormData } from '@/schemas';

export function SosForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SosFormData>({
    resolver: zodResolver(sosFormSchema),
    defaultValues: { consent: true },
  });

  const onSubmit = (data: SosFormData) => {
    // TODO: API call
    console.log('SOS form data:', data);
    alert('Заявка отправлена! Мы перезвоним в течение 2 минут.');
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
