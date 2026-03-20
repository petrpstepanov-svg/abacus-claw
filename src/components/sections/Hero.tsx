import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  /** Accent color for the title. Default: text-primary */
  titleColor?: string;
}

export function Hero({ title, subtitle, children, titleColor = 'text-primary' }: HeroProps) {
  return (
    <section className="bg-secondary text-white py-16 md:py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <h1 className={`font-unbounded text-3xl md:text-5xl font-bold mb-4 ${titleColor}`}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
