import type { SupportedLocales } from '@/composables/locale';
import { DateStyle } from '@/interfaces/utilities/enums';

export const formatDate = (
  dateString: string,
  style: DateStyle,
  locale?: SupportedLocales,
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { dateStyle: style });
};

export const formatTime = (dateString: string, locale?: SupportedLocales) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(locale);
};

export const invalidDate = (date: Date) => Number.isNaN(date.valueOf());

export const getIsoDateString = (datestring: string) => {
  const date = new Date(datestring);
  if (!invalidDate(date)) {
    return date.toISOString();
  }
  return '';
};

export const formatTimezone = (country: string, locale: SupportedLocales, dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(`${locale}-${country}`, { day: '2-digit', timeZoneName: 'short' }).slice(4);
};

export const isLeapYear = (year: number) => (
  (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))
);

const stringArrayOfNums = (startNumber: number, total: number, toLocaleString: boolean) => {
  const arrayNums = Array.from({ length: total }, (_, i) => i + startNumber);
  return arrayNums.map((num) => {
    if (toLocaleString) {
      return num.toLocaleString(undefined, { minimumIntegerDigits: 2 });
    }
    return String(num);
  });
};

export const daysOfMonth = (month: string) => {
  if (['04', '06', '09', '11'].includes(month)) {
    return stringArrayOfNums(1, 30, true);
  }
  if (['01', '03', '05', '07', '08', '10', '12'].includes(month)) {
    return stringArrayOfNums(1, 31, true);
  }
  if (['02'].includes(month)) {
    if (isLeapYear(parseInt(month, 10))) {
      return stringArrayOfNums(1, 29, true);
    }
    return stringArrayOfNums(1, 28, true);
  }
  return stringArrayOfNums(1, 31, true);
};

export const months = stringArrayOfNums(1, 12, true);
export const years = stringArrayOfNums(2021, 2, false);
export const hours = stringArrayOfNums(0, 24, true).map((hour) => `${hour}:00`);

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
