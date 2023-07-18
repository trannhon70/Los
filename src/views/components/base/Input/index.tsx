import {
  ChangeEvent,
  ClipboardEvent,
  FocusEvent,
  forwardRef,
  ForwardRefRenderFunction,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { withStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import clsx from "clsx";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import Label from "views/components/base/Label";
import { SxSelectDisabled } from "views/pages/LOAN/screens/Normal/Initialize/Legal/style";
export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "date"
  | "time"
  | "datetime";

export interface InputRef {
  getValue(): string | undefined;
  setValue(value: string): void;
  focus(): void;
  setSelectionRange(pos: number): void;
}

export interface InputProps {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: ReactNode;
  message?: string;
  onChange?(value: string): void;
  onKeyup?(e: KeyboardEvent<HTMLInputElement>): void;
  onKeypress?(e: KeyboardEvent<HTMLInputElement>): void;
  onFocus?(e: FocusEvent<HTMLInputElement>): void;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  placeholder?: string;
  prefix?: ReactNode;
  required?: boolean;
  suffix?: ReactNode;
  type?: InputType;
  value?: string;
  classInput?: string;
  onDebounce?(value: string): void;
  timeout?: number;
  format?: boolean,
  sx?: SxProps<Theme>;
  labelColor?: string;
  disabedNegative?: boolean;
  maxlength?: number;
  regex?: RegExp;
  isMinus?:boolean;
  isTooltip?: boolean;
}

export type InputComponent = ForwardRefRenderFunction<
  InputRef,
  InputProps
>;

const converNumberToString = (value?:string) =>{
  if(value){
    let minus = value.indexOf('-') === 0
    let numbers = value.replace(/-/g, '').replace('.', ',').split(',');
    if(numbers.length>1){
      let end = numbers[1].replace(/\./g, '')
      if(end.length>2){
        end = end.substring(0,2);
      }
      return minus?'-':''+ numbers[0].replace(/\B(?=(\d{3})+(?!\d))/g,".")+","+end;
    }else{
      return minus?'-':''+numbers[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    }
  }
  return '';
}
const converNumberToStringNotFormat=(value?:string)=>{
  if(value){
    return value.replace(/[^0-9]+/g, '')
  }
  return '';
}
const reverStringToNumber = (val:string)=>{
  //dữ liệu nhập 123.425.234,2312  ==> 123425234.2312
  let minus = false
  if(val.startsWith(',')){
    val = "0"+val;
  }else if(val.startsWith('-')){
    minus = true;
  }
  // eslint-disable-next-line no-useless-escape
  let data = minus?'-':''+ val.replace(/-/g, '').replace(/[^0-9\.,]+/g, '').replace(/\./g, '').replace(/,/g, '.');
  return data;

}

const Input: InputComponent = (props, ref) => {

  const {
    className,
    fullWidth = true,
    value,
    disabled,
    label,
    message,
    onChange,
    placeholder,
    prefix,
    required,
    suffix,
    type = "text",
    classInput,
    onKeyup,
    timeout = 500,
    onDebounce,
    format,
    sx = {},
    labelColor,
    maxlength = 255,
    regex,
    onBlur,
    isMinus,
    isTooltip
  } = props;

  const isNumber = type === 'number' && !isNaN(+(value??''));
//   const propValue = isNumber?( format ? converNumberToString(value??''):converNumberToStringNotFormat(value??'')) : value;
  const propValue = isNumber?( format ?((isMinus&&value?.startsWith('-'))?"-"+ converNumberToString(value?.replace('-','')??''): converNumberToString(value?.replace('-','')??'')):converNumberToStringNotFormat(value??'')) : value;

  const [ defaultValue, setDefaultValue ] = useState<string | undefined>(value);
  const [ formatValue, setFormatValue ] = useState<string | undefined>(propValue);
  const [ inputMessage, setMessage ] = useState(message);
  const currentValue = useRef(value);

  const inputRef = useRef<HTMLInputElement>(null);
  // const currentValue = useRef(propValue);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  // const focused = useRef(false);
  // const beforeFocus = useRef<string | undefined>(defaultValue);

  useEffect(() => {
    message === inputMessage || setMessage(message);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ message ]);

  useImperativeHandle(ref, () => ({
    getValue: () => {
      // if (!isNumber || !defaultValue) return defaultValue;
      return defaultValue;
    },
    setValue: (val) => val === defaultValue || setDefaultValue(val),
    focus: () => inputRef.current?.focus(),
    setSelectionRange: pos => {
      if (inputRef.current){
        inputRef.current.selectionStart = pos;
      }
    }
  }));

  const inputClass = clsx("mscb-input", className);
  const error = Boolean(inputMessage);
  useEffect(() => {
    const valueFormat =value??'';
    if(!(currentValue.current)||currentValue.current!==valueFormat){
      currentValue.current = valueFormat;
      if(isNumber){
        const valueF = format? ((isMinus&&valueFormat.startsWith('-'))?"-"+converNumberToString(valueFormat.replace('-','')??''):converNumberToString(valueFormat.replace('-','')??'')): valueFormat
        // const valueF = format? converNumberToString(reverStringToNumber(valueFormat)):valueFormat
        setDefaultValue(valueFormat);
        setFormatValue(valueF);
      }else{
        setDefaultValue(valueFormat);
        setFormatValue(valueFormat);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const revertNumber = (value: string) => {
    if (isNumber) {
      return reverStringToNumber(value??'')
    }
    return value;
  }

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let selectionStart = e.target.selectionStart;
    let val = e.target.value;
    if((e.target.value && regex)&&!regex?.test(val)) return;
    //xử lý
    let selected = selectionStart
    if(isNumber){
      const valueFormat = format?((isMinus&&val.startsWith('-'))?"-"+converNumberToString(reverStringToNumber(val.replace('-','')??'')):converNumberToString(reverStringToNumber(val.replace('-','')??''))) : converNumberToStringNotFormat(val??'');
      const isPointLast = (val??'').length === selected
      if((selectionStart as number)<valueFormat.length){
        selected =(selectionStart as number ) + valueFormat.length-val.length
      }
      setDefaultValue((isMinus&&valueFormat.startsWith('-'))?"-"+revertNumber(valueFormat.replace('-','')):revertNumber(valueFormat.replace('-','')));
      setFormatValue(valueFormat);
      if(!isPointLast){
        e.target.blur();
        setTimeout(()=>{
          e.target.focus();
          e.target.setSelectionRange(selected,selected)
        },50)
      }
    }else{
      setDefaultValue(val??'');
      setFormatValue(val??'');
    }
  };
  useEffect(() => {
    // let valueFormat = revertNumber(defaultValue ?? '')
    if (defaultValue!==undefined && defaultValue !== currentValue.current) {
      currentValue.current = defaultValue;
      if (timeout <= 0 || !onDebounce){
        onChange && onChange(defaultValue??'');
      }
      else{
        timer.current && clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          onDebounce && onDebounce(defaultValue??'');
        }, timeout);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const pasteInput = (e: ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData('text');
    if(isNumber){
      if(!/^[0-9\b]+$/.test(data)){
        e.preventDefault();
      }
    }
  }

  const inputProps = { className: classInput };
  prefix && Object.assign(inputProps, { startAdornment: prefix });
  suffix && Object.assign(inputProps, { endAdornment: suffix });

  const BaseTooltip = withStyles({
    tooltip: {
      fontSize: "12px !important",
      border: 'unset !important',
      color: "var(--mscb-secondary) !important",
      backgroundColor: "var(--mscb-white) !important",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2) !important",
      fontFamily: 'Roboto, Helvetica, Arial,sans-serif !important'
    },
    arrow: {
      fontSize: "20px !important",
      color: "var(--mscb-white) !important",
      fontFamily: 'Roboto, Helvetica, Arial,sans-serif !important'
    }
  })(Tooltip);

  return (
    <FormControl className={inputClass} fullWidth={ fullWidth }>
      {!!label && (
        <Label required={ required } color={ labelColor } className="ellipsis">{ label }</Label>
      )}

      {
        isTooltip ? <BaseTooltip 
            title={formatValue ?? ''} 
            arrow
          >
            <TextField
              error={error}
              disabled={disabled}
              placeholder={placeholder}
              className={ clsx({ error }) }
              variant="standard"
              helperText={message}
              ref={inputRef}
              onChange={changeInput}
              type={ isNumber ? 'text' : type==="email" ? 'text' : type }
              InputProps={inputProps}
              value={formatValue ?? ''}
              onKeyUp={ onKeyup }
              // onKeyPress={ keypressInput }
              // onKeyDown={keypressInput}
              onBlur={ onBlur }
              onPaste={ pasteInput }
              sx={ sx }
              inputProps={{ maxLength: maxlength}}
            />

          </BaseTooltip>
          :
          <TextField
            error={error}
            disabled={disabled}
            placeholder={placeholder}
            className={ clsx({ error }) }
            variant="standard"
            helperText={message}
            ref={inputRef}
            onChange={changeInput}
            type={ isNumber ? 'text' : type==="email" ? 'text' : type }
            InputProps={inputProps}
            value={formatValue ?? ''}
            onKeyUp={ onKeyup }
            // onKeyPress={ keypressInput }
            // onKeyDown={keypressInput}
            onBlur={ onBlur }
            onPaste={ pasteInput }
            sx={ disabled === true ? SxSelectDisabled : sx }
            inputProps={{ maxLength: maxlength}}
          />
      }
      {/* <TextField
            error={error}
            disabled={disabled}
            placeholder={placeholder}
            className={ clsx({ error }) }
            variant="standard"
            helperText={message}
            ref={inputRef}
            onChange={changeInput}
            type={ isNumber ? 'text' : type==="email" ? 'text' : type }
            InputProps={inputProps}
            value={formatValue ?? ''}
            onKeyUp={ onKeyup }
            // onKeyPress={ keypressInput }
            // onKeyDown={keypressInput}
            onBlur={ onBlur }
            onPaste={ pasteInput }
            sx={ sx }
            inputProps={{ maxLength: maxlength}}
          /> */}
      
    </FormControl>
  );
};

export default forwardRef(Input);