import { type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';

type InputTone = 'slate' | 'rose' | 'blue';
type InputSize = 'md' | 'lg';
type InputShape = 'md' | 'xl';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  error?: string;
  labelSuffix?: ReactNode;
  tone?: InputTone;
  inputSize?: InputSize;
  shape?: InputShape;
  uniqueClassName?: string;
  onValueChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

const INPUT_SIZE_CLASS: Record<InputSize, string> = {
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

const INPUT_TONE_CLASS: Record<InputTone, string> = {
  slate: 'border-slate-300 focus:ring-blue-500',
  rose: 'border-rose-200 focus:ring-rose-200',
  blue: 'border-blue-300 focus:ring-blue-400',
};

export function Input({
  label,
  error,
  labelSuffix,
  tone = 'slate',
  inputSize = 'md',
  shape = 'md',
  uniqueClassName,
  onChange,
  onValueChange,
  ...props
}: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      <input
        className={`${INPUT_SIZE_CLASS[inputSize]} border ${shape === 'xl' ? 'rounded-xl' : 'rounded-md'} focus:ring-2 outline-none transition disabled:bg-gray-100 ${
          error ? 'border-red-500 focus:ring-red-500' : INPUT_TONE_CLASS[tone]
        }`}
        onChange={handleChange}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

type InputPresetProps = Omit<Props, 'type'>;

export function TextInput(props: InputPresetProps) {
  return <Input type="text" {...props} />;
}

export function SearchInput(props: InputPresetProps) {
  return <Input type="search" {...props} />;
}

export function EmailInput(props: InputPresetProps) {
  return <Input type="email" {...props} />;
}

export function PasswordInput(props: InputPresetProps) {
  return <Input type="password" {...props} />;
}

export function NumberInput(props: InputPresetProps) {
  return <Input type="number" {...props} />;
}