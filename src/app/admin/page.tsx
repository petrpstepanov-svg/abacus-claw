'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { setAuthToken } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Введите пароль');
      return;
    }

    setLoading(true);

    try {
      // Verify password by making a test API call
      const res = await fetch('/api/admin/leads?page=1&limit=1', {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (res.ok) {
        setAuthToken(password);
        router.push('/admin/leads');
      } else {
        setError('Неверный пароль');
      }
    } catch {
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center font-unbounded text-xl font-semibold text-secondary">
          Админ-панель
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            label="Пароль"
            placeholder="Введите пароль администратора"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error || undefined}
            autoComplete="current-password"
          />

          <Button type="submit" variant="primary" loading={loading}>
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}
