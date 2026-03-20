'use client';

import React, { useCallback } from 'react';
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

/* ─── Types ─── */

interface PhoneMaskProps<T extends FieldValues> {
  /** react-hook-form control */
  control: Control<T>;
  /** Field name inside the form */
  name: Path<T>;
  /** Label displayed above the field */
  label?: string;
  /** Placeholder */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Extra className */
  className?: string;
}

/* ─── Helpers ─── */

/** Keep only digits */
function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Format a digit string into +7 XXX XXX-XX-XX.
 * Stores the raw value as +7XXXXXXXXXX (11 digits) for API.
 */
function formatPhone(raw: string): string {
  // Strip everything except digits
  let digits = digitsOnly(raw);

  // If the user typed 8 at the start, replace with 7
  if (digits.startsWith('8') && digits.length <= 11) {
    digits = '7' + digits.slice(1);
  }

  // Ensure starts with 7
  if (!digits.startsWith('7') && digits.length > 0) {
    digits = '7' + digits;
  }

  // Limit to 11 digits
  digits = digits.slice(0, 11);

  // Build formatted string progressively
  let result = '+7';
  const d = digits.slice(1); // digits after 7

  if (d.length === 0) return result;
  result += ' ' + d.slice(0, 3);
  if (d.length <= 3) return result;
  result += ' ' + d.slice(3, 6);
  if (d.length <= 6) return result;
  result += '-' + d.slice(6, 8);
  if (d.length <= 8) return result;
  result += '-' + d.slice(8, 10);

  return result;
}

/** Extract clean +7XXXXXXXXXX from any input */
function toCleanPhone(value: string): string {
  let digits = digitsOnly(value);
  if (digits.startsWith('8') && digits.length <= 11) {
    digits = '7' + digits.slice(1);
  }
  if (!digits.startsWith('7') && digits.length > 0) {
    digits = '7' + digits;
  }
  return '+' + digits.slice(0, 11);
}

/* ─── Component ─── */

function PhoneMaskInner<T extends FieldValues>(
  {
    control,
    name,
    label,
    placeholder = '+7 ___ ___-__-__',
    disabled,
    className = '',
  }: PhoneMaskProps<T>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ref: React.Ref<HTMLInputElement>,
) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const cleaned = toCleanPhone(e.target.value);
      field.onChange(cleaned);
    },
    [field],
  );

  const displayValue = field.value ? formatPhone(String(field.value)) : '';
  const inputId = `phone-${String(name)}`;

  const stateClass = (() => {
    if (disabled)
      return 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed';
    if (error)
      return 'border-red-500 focus:ring-red-500/30 focus:border-red-500';
    return 'border-gray-300 focus:ring-accent/30 focus:border-accent';
  })();

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
        id={inputId}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        disabled={disabled}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        onBlur={field.onBlur}
        name={field.name}
        className={[
          'w-full rounded-lg border px-4 py-2.5 text-base text-secondary font-mono',
          'placeholder:text-gray-400',
          'outline-none transition-colors duration-150',
          'focus:ring-2 focus:ring-offset-0',
          stateClass,
          className,
        ].join(' ')}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-sm text-red-500"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}

const PhoneMask = React.forwardRef(PhoneMaskInner) as <T extends FieldValues>(
  props: PhoneMaskProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export { PhoneMask, formatPhone, toCleanPhone };
export type { PhoneMaskProps };
