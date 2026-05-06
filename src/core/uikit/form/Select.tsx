import { type ChangeEvent, type SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

type SelectTone = 'slate' | 'rose' | 'blue';
type SelectSize = 'md' | 'lg';
type SelectShape = 'md' | 'xl';

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label?: string;
  options: Option[];
  tone?: SelectTone;
  selectSize?: SelectSize;
  shape?: SelectShape;
  uniqueClassName?: string;
  onValueChange?: (value: string, event: ChangeEvent<HTMLSelectElement>) => void;
}

const SELECT_SIZE_CLASS: Record<SelectSize, string> = {
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

const SELECT_TONE_CLASS: Record<SelectTone, string> = {
  slate: 'border-slate-300 focus:ring-blue-500',
  rose: 'border-rose-200 focus:ring-rose-200',
  blue: 'border-blue-300 focus:ring-blue-400',
};

export function Select({
  label,
  options,
  tone = 'slate',
  selectSize = 'md',
  shape = 'md',
  uniqueClassName,
  onChange,
  onValueChange,
  ...props
}: Props) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event);
    onValueChange?.(event.target.value, event);
  };

  return (
    <div className={`flex flex-col gap-1 ${uniqueClassName ?? ''}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        className={`${SELECT_SIZE_CLASS[selectSize]} border ${shape === 'xl' ? 'rounded-xl' : 'rounded-md'} focus:ring-2 outline-none bg-white ${SELECT_TONE_CLASS[tone]}`}
        onChange={handleChange}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}