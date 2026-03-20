'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { reachGoal } from '@/lib/yandex-metrika';

const NAV_ITEMS = [
  { href: '/evacuation', label: 'Эвакуатор' },
  { href: '/autoservice', label: 'Автосервис' },
  { href: '/accident-commissioner', label: 'Аварийный комиссар' },
  { href: '/contract-engines', label: 'Контрактные агрегаты' },
  { href: '/contacts', label: 'Контакты' },
] as const;

const PHONE = '+7 (863) 303-XX-XX';
const PHONE_HREF = 'tel:+78633030000';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePhoneClick = () => {
    reachGoal('PHONE_CLICK', { location: 'header' });
  };

  return (
    <header className="sticky top-0 z-50 bg-secondary text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="AutoHub Rostov — Главная">
          <Image
            src="/logo-placeholder.svg"
            alt="AutoHub Rostov"
            width={140}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Phone (desktop) */}
        <a
          href={PHONE_HREF}
          onClick={handlePhoneClick}
          className="hidden lg:inline-flex items-center gap-2 font-mono text-sm font-semibold text-accent hover:text-white transition-colors"
        >
          📞 {PHONE}
        </a>

        {/* Burger */}
        <button
          type="button"
          className="lg:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Меню навигации"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-white/10 px-4 pb-4" aria-label="Мобильная навигация">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-gray-300 hover:text-white transition-colors border-b border-white/5 last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={PHONE_HREF}
            onClick={handlePhoneClick}
            className="mt-3 block py-3 font-mono font-semibold text-accent"
          >
            📞 {PHONE}
          </a>
        </nav>
      )}
    </header>
  );
}
