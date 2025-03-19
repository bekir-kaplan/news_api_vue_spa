import type {
  UtilDateFormatW3CDateTimeParams,
  UtilDateFormatW3CDateTimeResult,
} from '@/types/utils.types';

// TODO: Use this for every date time conversation
const defaultDateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};
const defaultTimeFormat: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};
const defaultLocale = 'en-US';

const date = {
  formatW3CDateTime: ({
    timestamp,
    locale = defaultLocale,
    dateFormat = defaultDateFormat,
    timeFormat = defaultTimeFormat,
    separator = '/',
  }: UtilDateFormatW3CDateTimeParams): UtilDateFormatW3CDateTimeResult => {
    let formattedDate = '';
    let formattedTime = '';

    if (timestamp !== undefined && timestamp !== null) {
      const date = new Date(timestamp);

      // Format the date using Intl.DateTimeFormat
      formattedDate = new Intl.DateTimeFormat(locale, dateFormat).format(date);

      // Format the time using Intl.DateTimeFormat
      formattedTime = new Intl.DateTimeFormat(locale, timeFormat).format(date);

      // Ensure the date uses the correct separator (replacing default separators)
      formattedDate = formattedDate.replace(/[/-]/g, separator);
    }

    return {
      date: formattedDate,
      time: formattedTime,
    };
  },
  getDate: ({
    currentDate = Date.now(),
    dayBefore = 0,
    locale = defaultLocale,
    dateFormat = defaultDateFormat,
    separator = '/',
  }: {
    currentDate?: number;
    dayBefore?: number;
    locale?: string;
    dateFormat?: Intl.DateTimeFormatOptions;
    separator?: string;
  }) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - dayBefore); // Subtract specified number of days

    let formattedDate = new Intl.DateTimeFormat(locale, dateFormat).format(date);
    formattedDate = formattedDate.replace(/[/-]/g, separator);

    return formattedDate;
  },
};

export default date;
