'use client';

import React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

/* ─── Types ─── */

type InputType = 'text' | 'tel' | 'email';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** HTML input type */
  type?: InputType;
  /** Label displayed above the field */
  label?: string;
  /** Error message rendered below the field */
  error?: string;
  /** react-hook-form register return */
  registration?: Partial<UseFormRegisterReturn>;
}

/* ─── Style helpers ─── */

function stateClasses(error?: string, disabled?: boolean): string {
  if (disabled) {
    return 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed';
  }
  if (error) {
    return 'border-red-500 focus:ring-red-500/30 focus:border-red-500';
  }
  return 'border-gray-300 focus:ring-accent/30 focus:border-accent';
}

/* ─── Component ─── */

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      label,
      error,
      disabled,
      registration,
      className = '',
      id,
      ...rest
    },
    ref,
  ) => {
    const inputId = id ?? registration?.name ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5 font-manrope">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-secondary"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          className={[
            'w-full rounded-lg border px-4 py-2.5 text-base text-secondary',
            'placeholder:text-gray-400',
            'outline-none transition-colors duration-150',
            'focus:ring-2 focus:ring-offset-0',
            stateClasses(error, disabled),
            className,
          ].join(' ')}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...registration}
          {...rest}
        />

        {error && (
          <p
            id={inputId ? `${inputId}-error` : undefined}
            role="alert"
            className="text-sm text-red-500"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
export type { InputProps, InputType };
