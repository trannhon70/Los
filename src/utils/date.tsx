import moment from 'moment';
import { APP_DATE_FORMAT } from './constants';

export const timestampToDate = (time: number, format = APP_DATE_FORMAT, mili = false): string => {
  // if (time <= 0) return '';
  mili || (time = time * 1000);
  return moment(time).format(format)
}

export const dateToTimestamp = (date: string, mili = false) => {
  if (!date) return 0;
  const d = moment(date).format();
  const t = +moment(d).format("X");
  return mili ? t * 1000 : t;
}