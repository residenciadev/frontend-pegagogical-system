import { parseISO, addHours, getYear } from 'date-fns';
import { format } from 'date-fns-tz';
import { pt } from 'date-fns/esm/locale';
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';

export default function formatDate(date) {
  const parsedDate = parseISO(date);

  const addedDate = addHours(parsedDate, 3);
  const correctedDate = format(addedDate, "'Dia' dd 'de' MMMM 'às' HH:mm", {
    timeZone: 'America/Sao_Paulo',
    locale: pt,
  });
  return correctedDate;
}

export function differenceDate(startDate) {
  const startMonth = parseInt(startDate.slice(0, 2), 10);
  const startYear = parseInt(startDate.slice(3), 10);
  const endMonth = format(new Date(), 'MM');
  const endYear = getYear(new Date());

  const result = differenceInCalendarMonths(
    new Date(endYear, endMonth, 1),
    new Date(startYear, startMonth, 1)
  );

  return result;
}

export function getFormatNowDate() {
  const date = format(new Date(), 'MM/yyyy');
  return date;
}
