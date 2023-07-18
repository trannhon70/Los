import { isPhoneVN, isTelephone } from "./phoneVN";

export const Validator = {
  equal(value: number, compare: number): boolean{
    return value === compare;
  },
  min(value: number, compare: number, equal = true): boolean{
    return value > compare || (equal && Validator.equal(value, compare));
  },
  max(value: number, compare: number, equal = true): boolean{
    return value < compare || (equal || Validator.equal(value, compare));
  },
  minLength(value: string | unknown[], compare: number, equal = true): boolean{
    return Validator.min(value.length, compare, equal);
  },
  maxLength(value: string | unknown[], compare: number, equal = true): boolean{
    return Validator.max(value.length, compare, equal);
  },
  email(email: string): boolean{
    return !!email.match(/^[a-z\d_.-]+@([a-z\d_-]+\.){1,2}[a-z]{2,}$/gi);
  },
  empty(value: string | unknown[]): boolean{
    return !value.length;
  },
  in(value: string, find: string | unknown[]): boolean{
    return !!~find.indexOf(value)
  },
  notIn(value: string, find: string | unknown[]): boolean{
    return !Validator.in(value, find);
  },
  startsWith(value: string, source: string): boolean{
    return source.startsWith(value);
  },
  endsWith(value: string, source: string): boolean{
    return source.endsWith(value);
  },
  isPhoneVN(phone: string): boolean{
    return isPhoneVN(phone);
  },
  isTelephone(phone: string): boolean{
    return isTelephone(phone);
  },
  isDate(date: string): boolean{
    return !!date.match(/^\d{2}\/\d{2}\/\d{4}$/);
  },
}