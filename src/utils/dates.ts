import { isDate, parse } from 'date-fns';

function parseDateString(_value: string, originalValue: string) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
}

export { parseDateString };
