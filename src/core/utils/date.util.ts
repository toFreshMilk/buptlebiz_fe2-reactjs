// src/core/utils/date.util.ts
import { format } from 'date-fns';

export const formatDate = (date: string | Date, formatString = 'yyyy-MM-dd') => {
    if (!date) return '-';
    return format(new Date(date), formatString);
};
