import { type ButtonHTMLAttributes, type MouseEvent } from 'react';

type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonTone = 'slate' | 'blue' | 'rose' | 'amber';
type ButtonSize = 'sm' | 'md' | 'icon';
type ButtonAlign = 'center' | 'start';
type ButtonShape = 'lg' | 'xl';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  fullWidth?: boolean;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  align?: ButtonAlign;
  shape?: ButtonShape;
  uniqueClassName?: string;
  onPress?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
  icon: 'p-0',
};

const VARIANT_TONE_CLASS: Record<ButtonVariant, Record<ButtonTone, string>> = {
  solid: {
    slate: 'bg-slate-700 text-white hover:bg-slate-800',
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    rose: 'bg-rose-600 text-white hover:bg-rose-700',
    amber: 'bg-amber-300 text-slate-900 hover:bg-amber-400',
  },
  outline: {
    slate: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
    blue: 'border border-blue-200 bg-white text-blue-700 hover:bg-blue-50',
    rose: 'border border-rose-200 bg-white text-rose-800 hover:bg-rose-50',
    amber: 'border border-amber-200 bg-white text-amber-800 hover:bg-amber-50',
  },
  ghost: {
    slate: 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50',
    blue: 'bg-transparent text-blue-600 hover:text-blue-700 hover:bg-blue-50',
    rose: 'bg-transparent text-rose-600 hover:text-rose-700 hover:bg-rose-50',
    amber: 'bg-transparent text-amber-700 hover:text-amber-800 hover:bg-amber-50',
  },
};

export function Button({
  fullWidth,
  variant = 'solid',
  tone = 'slate',
  size = 'md',
  align = 'center',
  shape = 'lg',
  uniqueClassName,
  onClick,
  onPress,
  ...props
}: Props) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    onPress?.(event);
  };

  const rounded = size === 'icon' || shape === 'xl' ? 'rounded-xl' : 'rounded-lg';
  const justify = align === 'start' ? 'justify-start' : 'justify-center';
  const iconBox = size === 'icon' ? 'w-10 h-10' : '';

  return (
    <button
      className={`inline-flex items-center font-bold transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
        fullWidth ? 'w-full' : ''
      } ${rounded} ${justify} ${iconBox} ${SIZE_CLASS[size]} ${VARIANT_TONE_CLASS[variant][tone]} ${uniqueClassName ?? ''}`}
      onClick={handleClick}
      {...props}
    />
  );
}