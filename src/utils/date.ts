import type {
  UtilDateFormatW3CDateTimeParams,
  UtilDateFormatW3CDateTimeResult,
} from '@/types/utils.types';

// TODO: Use this for every date time conversation
const date = {
  formatW3CDateTime: ({
    timestamp,
    locale = 'en-US',
    dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' },
    timeFormat = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
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
};

export default date;
