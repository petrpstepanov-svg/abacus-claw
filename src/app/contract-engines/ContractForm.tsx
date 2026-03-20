'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, PhoneMask } from '@/components/ui';

const contractFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().regex(/^\+7\d{10}$/, 'Введите корректный номер телефона'),
  carModel: z.string().min(2, 'Укажите марку и модель авто'),
  aggregate: z.string().min(1, 'Укажите нужный агрегат'),
  consent: z.literal(true, {
    error: 'Необходимо согласие на обработку персональных данных',
  }),
});

type ContractFormData = z.infer<typeof contractFormSchema>;

export function ContractForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: { consent: true },
  });

  const onSubmit = (data: ContractFormData) => {
    console.log('Contract form data:', data);
    alert('Заявка отправлена! Мы подберём агрегат и перезвоним.');
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
