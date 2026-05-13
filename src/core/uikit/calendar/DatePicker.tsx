import type { ReactNode } from 'react';
import { DayPicker, type DateRange, type Matcher } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import 'react-day-picker/style.css';

interface BaseProps {
  label?: string;
  description?: string;
  error?: string;
  uniqueClassName?: string;
  month?: Date;
  numberOfMonths?: number;
  disabled?: Matcher | Matcher[];
  fromDate?: Date;
  toDate?: Date;
  required?: boolean;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  showWeekNumber?: boolean;
  footer?: ReactNode;
  onMonthChange?: (month: Date) => void;
  onDayClick?: (day: Date) => void;
}

interface SingleProps extends BaseProps {
  mode: 'single';
  value?: Date;
  onValueChange?: (value: Date | undefined) => void;
}

interface MultipleProps extends BaseProps {
  mode: 'multiple';
  value?: Date[];
  onValueChange?: (value: Date[] | undefined) => void;
}

interface RangeProps extends BaseProps {
  mode: 'range';
  value?: DateRange;
  onValueChange?: (value: DateRange | undefined) => void;
}

type Props = SingleProps | MultipleProps | RangeProps;
type SelectedValue = Date | Date[] | DateRange | undefined;

export function DatePicker(props: Props) {
  const {
    label,
    description,
    error,
    uniqueClassName,
    month,
    numberOfMonths = 1,
    disabled,
    fromDate,
    toDate,
    required,
    showOutsideDays = true,
    fixedWeeks = false,
    showWeekNumber = false,
    footer,
    onMonthChange,
    onDayClick,
  } = props;

  return (
    <div className={`space-y-2 ${uniqueClassName ?? ''}`}>
      {label && <div className="text-sm font-semibold text-slate-700">{label}</div>}
      {description && <div className="text-xs text-slate-500">{description}</div>}

      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <DayPicker
          locale={ko}
          mode={props.mode}
          selected={props.value as never}
          onSelect={(selected: SelectedValue) => props.onValueChange?.(selected as never)}
          month={month}
          numberOfMonths={numberOfMonths}
          disabled={disabled}
          startMonth={fromDate}
          endMonth={toDate}
          required={required}
          showOutsideDays={showOutsideDays}
          fixedWeeks={fixedWeeks}
          showWeekNumber={showWeekNumber}
          onMonthChange={onMonthChange}
          onDayClick={(day) => onDayClick?.(day)}
            classNames={{
            months: 'flex gap-4',
            month: 'space-y-2',
            caption_label: 'text-sm font-semibold text-slate-700',
            nav: 'flex items-center gap-1',
            button_previous: 'h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50',
            button_next: 'h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50',
            week: 'flex w-full mt-1',
            weekday: 'w-9 text-center text-xs text-slate-400',
            day: 'h-9 w-9 p-0 text-sm rounded-lg hover:bg-slate-100',
            selected: 'bg-blue-600 text-white hover:bg-blue-700',
            today: 'ring-1 ring-blue-300',
            outside: 'text-slate-300',
            disabled: 'text-slate-300 opacity-50',
            range_start: 'bg-blue-600 text-white',
            range_middle: 'bg-blue-100 text-blue-700',
            range_end: 'bg-blue-600 text-white',
          }}
        />
      </div>

      {footer}
      {error && <div className="text-xs text-rose-500">{error}</div>}
    </div>
  );
}