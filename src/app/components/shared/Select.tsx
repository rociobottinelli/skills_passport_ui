import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
  disabled = false,
  fullWidth = true,
  className = '',
}: SelectProps) {
  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="text-sm font-medium text-[var(--sp-gray-dark)]">
          {label}
          {required && <span className="text-[var(--sp-alert-coral)] ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`px-4 py-3 bg-[var(--sp-gray-light)] border rounded-xl focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-[var(--sp-alert-coral)] ring-2 ring-[var(--sp-alert-coral)]'
            : 'border-transparent focus:ring-[var(--sp-violet)] focus:border-transparent'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-sm text-[var(--sp-alert-coral)]">{error}</span>
      )}
    </div>
  );
}

