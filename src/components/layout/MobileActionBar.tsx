'use client';

import Link from 'next/link';
import { reachGoal } from '@/lib/yandex-metrika';

const PHONE_HREF = 'tel:+78633030000';

export function MobileActionBar() {
  const handlePhoneClick = () => {
    reachGoal('PHONE_CLICK', { location: 'mobile_action_bar' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center gap-2 bg-secondary/95 backdrop-blur px-3 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
      {/* SOS Button */}
      <Link
        href="/evacuation"
        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-base font-bold text-white active:bg-primary/80 transition-colors"
      >
        🆘 SOS Эвакуатор
      </Link>

      {/* Call Button */}
      <a
        href={PHONE_HREF}
        onClick={handlePhoneClick}
        className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3 px-5 text-base font-bold text-secondary active:bg-accent/80 transition-colors"
      >
        📞 Звонок
      </a>
    </div>
  );
}
