interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onKeyPress,
  required = false,
  disabled = false,
  fullWidth = true,
  className = '',
}: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="text-sm font-medium text-[var(--sp-gray-dark)]">
          {label}
          {required && <span className="text-[var(--sp-alert-coral)] ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        required={required}
        disabled={disabled}
        className={`px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] focus:border-transparent transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  );
}
