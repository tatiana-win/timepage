/**
 * Returns date of Monday for week that contains passed date
 * @param date
 */
export const getStartOfWeek = (date: Date) => {
  const dayOfWeek = date.getDay();
  const result = new Date(date);
  result.setDate(date.getDate() - dayOfWeek + 1);

  return result;
}

/**
 * Returns date of Sunday for week that contains passed date
 * @param date
 */
export const getEndOfWeek = (date: Date) => {
  const startOfWeek = getStartOfWeek(date);
  const result = new Date(startOfWeek);
  result.setDate(startOfWeek.getDate() + 6);

  return result;
}

/**
 * Returns new date calculated as passed date - passed days
 * @param date
 * @param days
 */
export const subtractDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(date.getDate() - days);

  return result;
}

/**
 * Returns new date calculated as passed date + passed days
 * @param date
 * @param days
 */
export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(date.getDate() + days);

  return result;
}

/**
 * Returns true if passed date is the same as current date
 * @param date
 */
export const isToday = (date: Date) => {
  const now = new Date();

  return now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate();
}
