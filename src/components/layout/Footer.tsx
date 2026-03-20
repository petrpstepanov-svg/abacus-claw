'use client';

import Link from 'next/link';
import { reachGoal } from '@/lib/yandex-metrika';

const PHONE = '+7 (863) 303-XX-XX';
const PHONE_HREF = 'tel:+78633030000';
const EMAIL = 'info@autohub-rostov.ru';

const SERVICE_LINKS = [
  { href: '/evacuation', label: 'Эвакуатор 24/7' },
  { href: '/autoservice', label: 'Автосервис' },
  { href: '/accident-commissioner', label: 'Аварийный комиссар' },
  { href: '/contract-engines', label: 'Контрактные агрегаты' },
] as const;

const INFO_LINKS = [
  { href: '/contacts', label: 'Контакты' },
  { href: '/privacy-policy', label: 'Политика конфиденциальности' },
] as const;

export function Footer() {
  const handlePhoneClick = () => {
    reachGoal('PHONE_CLICK', { location: 'footer' });
  };

  return (
    <footer className="bg-secondary text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold text-white font-unbounded">AutoHub</p>
            <p className="text-sm text-accent font-unbounded">РОСТОВ</p>
            <p className="mt-3 text-sm leading-relaxed">
              Эвакуатор, автосервис и аварийный комиссар в&nbsp;Ростове&#8209;на&#8209;Дону. Работаем 24/7.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Услуги</h4>
            <ul className="space-y-2">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Информация</h4>
            <ul className="space-y-2">
              {INFO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={PHONE_HREF}
                  onClick={handlePhoneClick}
                  className="font-mono text-accent hover:text-white transition-colors"
                >
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
                  {EMAIL}
                </a>
              </li>
              <li>г. Ростов-на-Дону</li>
              <li>Режим работы: 24/7</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs">
          © 2026 AutoHub Rostov. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
