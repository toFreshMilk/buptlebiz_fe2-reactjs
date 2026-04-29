import { type ChangeEvent, type ReactNode, type TextareaHTMLAttributes } from 'react';

type TextareaTone = 'slate' | 'rose' | 'blue';
type TextareaSize = 'md' | 'lg';
type TextareaShape = 'md' | 'xl';

interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label?: string;
  labelSuffix?: ReactNode;
  error?: string;
  tone?: TextareaTone;
  size?: TextareaSize;
  shape?: TextareaShape;
  uniqueClassName?: string;
  onValueChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TEXTAREA_SIZE_CLASS: Record<TextareaSize, string> = {
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

const TEXTAREA_TONE_CLASS: Record<TextareaTone, string> = {
  slate: 'border-slate-300 focus:ring-blue-500',
  rose: 'border-rose-200 focus:ring-rose-200',
  blue: 'border-blue-300 focus:ring-blue-400',
};

export function Textarea({
  label,
  labelSuffix,
  error,
  tone = 'slate',
  size = 'md',
  shape = 'md',
  uniqueClassName,
  onChange,
  onValueChange,
  ...props
}: Props) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event);
    onValueChange?.(event.target.value, event);
  };

  return (
    <div className={`flex flex-col gap-1 ${uniqueClassName ?? ''}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {labelSuffix}
        </label>
      )}
      <textarea
        className={`${TEXTAREA_SIZE_CLASS[size]} border ${shape === 'xl' ? 'rounded-xl' : 'rounded-md'} focus:ring-2 outline-none transition disabled:bg-gray-100 ${
          error ? 'border-red-500 focus:ring-red-500' : TEXTAREA_TONE_CLASS[tone]
        }`}
        onChange={handleChange}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}