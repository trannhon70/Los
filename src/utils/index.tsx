import Buffer from "buffer";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import moment from "moment";
import { ITokenLocal, IValidate, TAuthHeader } from "types";
import { APP_LANG_DEFAULT, APP_TOKEN_NAME } from "./constants";

export const PREFIX_UPDATE='UPDATE_';
export const PREFIX_LOCAL='LOCAL_';
export const PREFIX_HANDLE_INCOMES = [PREFIX_UPDATE,PREFIX_LOCAL];
export const TOKEN_EXPIRED = "TOKEN_EXPIRED";


export const tokenExpired = (error_message: string, nameStored: string) => {
  if(error_message === TOKEN_EXPIRED){
    removeStorage(nameStored);
  }
}

export const generateLOCALUUID = (): string => {
  return PREFIX_LOCAL + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

export const checkIsLocalUUID = (uuid: string) => {
  return uuid?.slice(0,6) === PREFIX_LOCAL
}

export const generateUUID = (): string => {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
const s4 = (): string => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}

export const contentType = (type: string): Record<"Content-Type", string> => {
  return { "Content-Type": type };
};

export const decodeToken = (): ITokenLocal => {
  const UT: ITokenLocal = { token: "", userid: "" };
  let localToken = getStorage(APP_TOKEN_NAME);
  if(!localToken)return UT;

  const parse = Buffer.Buffer.from(localToken, "base64").toString().split(".");
  UT.userid = parse.pop() ?? "";
  UT.token = parse.join(".");
  return UT;
};

export const fixNullToString = <T,>(data: T): T => {
  const rs: Record<string, any> = {};

  for (let v in data){
    rs[v] = data[v] === null ? '' : data[v];
  }

  return rs as T;
}

export const formatPath = (path: string, ...params: (string | number)[]): string => {
  if (!path) return path;

  let match = path.match(/:[a-z][a-z\d_]*\??/gi);
  if (!match) return path;

  match
  .map(param => param.replace(/\?$/, ''))
  .filter((value, index, self) => self.indexOf(value) === index)
  .map((param, index) => path = path.replace(
    new RegExp(param + '\\??', 'gi'), 
    (params[index] ?? '').toString()
  ));
  return path;
}

export const getAuthHeader = (token: string, type: TAuthHeader = 'Bearer'): Record<'Authorization', string> => {
  return { Authorization: `${ type } ${ token }` };
}


export const stringToBase64 = (str: string): string => {
  return Buffer.Buffer.from(str).toString("base64");
};

export const encodeToken = (UT: ITokenLocal): string => {
  return stringToBase64([UT.token, UT.userid].join("."));
};


export const getSearchPage = (search: string, name: string): number => {
  const params = new URLSearchParams(search);
  const page = Number(params.get(name)) || 1;
  return page < 1 ? 1 : page;
}

export const getQueryString = (init: Record<string, string | number | null | undefined | boolean>) => {
  const qs: Record<string, string> = {};
  // eslint-disable-next-line array-callback-return
  Object.keys(init).map((k) => {
    const t = typeof init[k];
    switch (t) {
      case 'object':
        qs[k] = '';
        break;
      case 'string':
      case 'number':
        qs[k] = (init[k] as string | number).toString();
        break;
      case 'boolean':
        qs[k] = (init[k] as boolean) ? "true" : "false";
        break;
    }
  })
  return new URLSearchParams(qs).toString();
}

export const getDefaultLang = () => {
  return (
    window.localStorage.i18nextLng ??
    document.querySelector("html")?.lang ??
    APP_LANG_DEFAULT.code
  );
};

export const getLocalItem = (name: string) => {
  let data = localStorage.getItem(name);

  try {
    data = JSON.parse(data as string);
  } catch (e) {
    return null;
  }

  return data;
};

export const getValidate = (message = '', params = {}): IValidate => {
  return { message, params };
}

export const removeLocalItem = (name: string) => {
  localStorage.removeItem(name);
};

export const setLocalItem = (name: string, data: unknown) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getSessionItem = (name: string) => {
  let data = sessionStorage.getItem(name);

  try {
    data = JSON.parse(data as string);
  } catch (e) {
    return null;
  }

  return data;
};

export const setSessionItem = (name: string, data: unknown) => {
  sessionStorage.setItem(name, JSON.stringify(data));
};


export const removeSessionItem = (name: string) => {
  sessionStorage.removeItem(name);
};

export const getStorage = (name: string) => {
  return getLocalItem(name) || getSessionItem(name);
}

export const removeStorage = (name: string,notAuth?:boolean) => {
  removeLocalItem(name);
  removeSessionItem(name);
  notAuth && window.location.pathname !=='/login/' && window.location.replace('/login')
}

export const updateDocumentTitle = (title: string) => {
  const current = document.title.split('|').pop()?.trim();
  const newTitle = [ title.toLocaleUpperCase() ];
  current && newTitle.push(current);
  document.title = newTitle.join(' | ');
}

export const intToRoman = (original: number): string => {
  if (original < 1 || original > 3999) {
    throw new Error('Error: Input integer limited to 1 through 3,999');
  }

  const numerals = [
    ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
    ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
    ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
    ['M', 'MM', 'MMM'], // 1000-3000
  ];

  const digits = Math.round(original).toString().split('');
  let position = (digits.length - 1);

  return digits.reduce((roman, digit) => {
    if (digit !== '0') {
      roman += numerals[position][parseInt(digit) - 1];
    }

    position -= 1;

    return roman;
  }, '');
}

export const intToAlphabet = (original: number): string => {
  if (original < 0 || original > 3999) {
    throw new Error('Error: Input integer limited to 1 through 3,999');
  }

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
                    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return alphabet[original].concat('.');
}

export const convertToFloatingPoint = (first: number, second: number): string => {
  return first.toString().concat('.'+second);
}

export const numberToCurrency = (num: number | string) => {
  num = num.toString().replace(".", ",");
  let splitNum = num.split(',');
  let newNum = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".").concat(',' + splitNum[splitNum.length-1])
  return newNum;
}

export const formatNumber = (value: string | undefined) => {
  if (isNaN(Number(value))) {
    return '0';
  }
  if(value){
    if(value.indexOf('e')){
      value = Number(value).toLocaleString('fullwide', {
        useGrouping: false
      })
    }
    let numbers = value.replace('.', ',').split(',');
    if(numbers.length>1){
      let end = numbers[1].replace(/\./g, '')
      if(end.length>2){
        end = end.substring(0,2);
      }
      return numbers[0].replace(/\B(?=(\d{3})+(?!\d))/g,".")+","+end;
    }else{
      return numbers[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    }
  }
  return ''
}

export const formatRoundNumber = (num:number, fix: number = 2) =>{
  return (+(Math.round(num * 100) / 100).toFixed(fix))
}

export const formatFloorNumber = (num:number) =>{
  return (+(Math.floor(num * 100) / 100).toFixed(2))
}


export const  formatNumberDecimal = (num: number ) =>{
  return (
    num
      .toFixed(2) // always two decimal digits
      .replace('.', ',') // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  )
 
}

/**
 * Compare `Timestamp 1` with `Timestamp 2`
 * @param ts1 Timestamp 1
 * @param ts2 Timestamp 2
 * @returns 
 *  - `-1`: `Timestamp 1` < `Timestamp 2`
 *  - ` 0`: `Timestamp 1` = `Timestamp 2`
 *  - ` 1`: `Timestamp 1` > `Timestamp 2`
 */
export const compareTimestampOnlyDate = (ts1: number, ts2: number): -1 | 0 | 1 => {
  const _ts1 = new Date(ts1);
  const _ts1Date = `${ _ts1.getFullYear() }-${ _ts1.getMonth() + 1 }-${ _ts1.getDate() }`;
  const ts1Date = new Date(_ts1Date).getTime();

  const _ts2 = new Date(ts2);
  const _ts2Date = `${ _ts2.getFullYear() }-${ _ts2.getMonth() + 1 }-${ _ts2.getDate() }`;
  const ts2Date = new Date(_ts2Date).getTime();

  const rs = ts1Date - ts2Date;
  if (rs === 0) return 0;
  return (Math.abs(rs) / rs) as -1 | 1;
}

/**
 * Checking difference between two arrays
 * @type {T} - Type of item in array
 * @param arr1 - An array of `{T}` type 
 * @param arr2 - An array of `{T}` type
 * @returns `true`: If they are different
 * @returns `false`: If they are same
 */
export const diffArray = <T,>(arr1: T[], arr2: T[]): boolean => {
  const outside1 = arr2?.filter(a => arr1.indexOf(a) === -1);
  const outside2 = arr1?.filter(a => arr2.indexOf(a) === -1);
  return !!outside1?.length || !!outside2?.length;
}

export const getDateFromTimestamp = (ts: number | null) => {
  if (ts === null) return '';
  const date = new Date(ts);
  return `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() }`;
}

export const s2ms = (ts?: number | null): number | null => {
  if (ts === undefined || ts === null) return null;
  return ts * 1000;
}

export const measure = {
  exec(name: string){
    if (
      process.env.NODE_ENV === 'development' ||
      sessionStorage.getItem('enabledMeasure') === 'allowed'
    ){
      console.time(name);
    }
  },
  execEnd(name: string){
    if (
      process.env.NODE_ENV === 'development' ||
      sessionStorage.getItem('enabledMeasure') === 'allowed'
    ){
      console.timeEnd(name);
    }
  }
}

export const ucfirst = (str: string) => {
  if (!str.length) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const converStringDate = (data:string, isHour?: boolean):string =>{
  // convert YYYY-MM-DD to DD-MM-YYYY
  if (!data) return '';
  return moment(new Date(data)).format(isHour ? 'HH:mm - DD/MM/YYYY' : 'DD/MM/YYYY');
}

export const calcInputNumber = (input: number) => {
  return Number(Number.isInteger(input)? input : parseFloat(`${input}`).toFixed(2));
};


export const removeAccents = (str: string ) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

export const pathKeyStore = (param: any) => {
  const values = Object.keys(param).map(key => param[key]);
  return values.join("_");
}

export const convertTypeMapping = (declare: string):string => {
  let typeName: string = ""
  switch(declare){
    case "borrower":
      return typeName = "BORROWER";
    case "marriage":
      return typeName = "MARRIAGE"; 
    case "co-borrower":
      return typeName = "CO_BRW";
    case "co-payer":
      return typeName = "CO_PAYER";
    case "legal-related":
      return typeName = "LAW_RLT";
    case "contact":
      return typeName = "REALTED";
    case "other":
      return typeName = "OTHER";
    default:
      return typeName;
  }
}

export const generateLegalDeclareTypeName = (declare: string):string => {
  let typeName: string = ""
  switch(declare){
    case ELegalTypeScreen.BORROWER:
      return typeName = "người vay chính";
    case ELegalTypeScreen.MARRIAGE:
      return typeName = "người hôn phối"; 
    case ELegalTypeScreen.CO_BRW:
      return typeName = "người đồng vay";
    case ELegalTypeScreen.CO_PAYER:
      return typeName = "người đồng trả nợ";
    case ELegalTypeScreen.LAW_RLT:
      return typeName = "người liên quan theo qđpl";
    case ELegalTypeScreen.REALTED:
      return typeName = "người liên hệ";
    case ELegalTypeScreen.OTHER:
      return typeName = "Đối tượng khác";
    default:
      return typeName;
  }
}

export const getUuidRemovePrefix = (uuid:string | null | undefined) =>{
  if(!uuid) return '';
  const result = uuid;
  return result.replace(PREFIX_LOCAL,'').replace(PREFIX_UPDATE,''); 
}

export const checkIncludePrefix = (uuid:string | null | undefined)=>{
  if(!uuid) return false;
  return PREFIX_HANDLE_INCOMES.some(pr => uuid.includes(pr));
}

export const makeAvatarLink = (link: string | undefined) => {
  if (!link) return undefined;
  return link;
}

export const splitAvatarLink = (link: string | undefined) => {
  if (!link) return undefined;
  return makeAvatarLink('/cdn-profile/' + link.split('/').pop());
}
export const getFormatNumber=(num:number|undefined|null)=>formatNumber((num ?? 0)?.toString());

const acceptFileDocument = '.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt';
const acceptFileImage = '.jpg, .jpeg, .png, .gif, .bmp';

export const renderAccept = (type: string) => {
  let accept = '';
  switch (type) {
    case 'DOCUMENT':
      accept = acceptFileDocument;
      break;
    case 'IMAGE':
      accept = acceptFileImage;
      break;
  
    default:
      accept = acceptFileDocument + ',' + acceptFileImage;
      break;
  }
  return accept;
}
export const capitalizeString = (string: string) =>{
  const str2 = string.toLowerCase()[0].toUpperCase() + string.toLowerCase().slice(1);
  return str2.toString()
}

export const download = ({ filename = '', url = '' }: { filename: string, url: string }) => {
  fetch(url)
  .then(response => response.blob())
  .then(blob => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  })
  .catch(console.error);
}