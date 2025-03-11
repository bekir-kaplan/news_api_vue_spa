interface UtilDateFormatW3CDateTimeParams {
  timestamp: number | undefined | null;
  locale?: string;
  dateFormat?: Intl.DateTimeFormatOptions;
  timeFormat?: Intl.DateTimeFormatOptions;
  separator?: string;
}

interface UtilDateFormatW3CDateTimeResult {
  date: string;
  time: string;
}

export function utilDateFormatW3CDateTime({
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
}: UtilDateFormatW3CDateTimeParams): UtilDateFormatW3CDateTimeResult {
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
}
