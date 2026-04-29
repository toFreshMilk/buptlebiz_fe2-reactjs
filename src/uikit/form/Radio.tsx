import { type ChangeEvent, type InputHTMLAttributes } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  tone?: 'slate' | 'rose' | 'blue';
  uniqueClassName?: string;
  onCheckedChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RADIO_TONE_CLASS = {
  slate: 'border-slate-300',
  rose: 'border-rose-300',
  blue: 'border-blue-300',
} as const;

export function Radio({ label, tone = 'slate', uniqueClassName, onChange, onCheckedChange, ...props }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onCheckedChange?.(event.target.checked, event);
  };

  return (
    <label className={`inline-flex items-center gap-2 ${uniqueClassName ?? ''}`}>
      <input type="radio" className={RADIO_TONE_CLASS[tone]} onChange={handleChange} {...props} />
      {label && <span className="text-sm text-slate-600">{label}</span>}
    </label>
  );
}