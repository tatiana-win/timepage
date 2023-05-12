const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekDaysNames = ['San', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const addLeadingZero = (value: number) => {
  return value < 10 ? `0${value}` : value;
};

/**
 * Returns string with format '2023-04-15'
 * @param date
 */
export const formatDateForApi = (date: Date) => {
  return `${date.getFullYear()}-${addLeadingZero(
    date.getMonth() + 1,
  )}-${addLeadingZero(date.getDate())}`;
};

/**
 * Returns string with format 'May 2023'
 * @param date
 */
export const formatToMonthAndYear = (date: Date) => {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Returns string with format '02.12'
 * @param date
 */
export const formatToDateAndMonth = (date: Date) => {
  return `${addLeadingZero(date.getDate())}.${addLeadingZero(
    date.getMonth() + 1,
  )}`;
};

/**
 * Returns name of week day in short format like 'Mon'
 * @param date
 */
export const formatToDayOfWeek = (date: Date) => {
  return weekDaysNames[date.getDay()];
};

/**
 * Returns string with format '2023-05-01T01:00:00.000Z'
 * @param date
 */
export const formatDateWithTimeForApi = (date: Date) => {
  return `${date.getFullYear()}-${addLeadingZero(
    date.getMonth() + 1,
  )}-${addLeadingZero(date.getDate())}T01:00:00.000Z`;
};
