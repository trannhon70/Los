import { ForwardRefRenderFunction, forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { FaCalendarAlt } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import clsx from "clsx";
import inputDateStyle from './style'
import Label from '../Label';
import FormControl from '@mui/material/FormControl';
import { SxDateDisabled } from 'views/pages/LOAN/screens/Normal/Initialize/Legal/style';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
export interface InputDateRef{
  getValue(): number | null;
  // setValue(value: string | number): void;
}

export interface InputDateProps{
  disabled?: boolean,
  label?: string,
  className?: string,
  fullWidth?: boolean,
  required?: boolean,
  value?: number | null;
  onChange?(value: number | null): void;
  message?: string;
  sx?: SxProps<Theme>;
  onAcept?:(value: number | Date | any) => void;
  // onViewChange?: (value: number | Date | any) => void;
  // onBlur?: (value: number | Date) => void;
}
export interface InputDateComponent 
  extends ForwardRefRenderFunction<InputDateRef, InputDateProps>{}

const InputDate: InputDateComponent = (props, ref) => {

  const {
    label,
    disabled,
    className,
    fullWidth = true,
    required,
    value,
    onChange,
    message,
    sx,
    onAcept,
    // onViewChange,
  } = props;

  const classes = inputDateStyle();
  const inputClass = clsx("mscb-input", classes.InputDateClass ,className);
  const InputDateRef = useRef<HTMLInputElement>(null);
  const TextRef = useRef<HTMLDivElement>(null);
  const prevValue = useRef<number | null>(value ? new Date(value).getTime() : null);
  const [ LocalMessage, setLocalMessage ] = useState<string | undefined>();
  const [ defaultValue, setDefaultValue ] = useState<Date | null>(value ? new Date(value) : null);

  useImperativeHandle(ref, () => ({
    getValue: () => defaultValue?.getTime() ?? null,
    // setValue: (val) => setDefaultValue(new Date(val))
  }));

  useEffect(() => {
    prevValue.current = value ? new Date(value).getTime() : null;
    setDefaultValue(value ? new Date(value) : null)
  }, [value]);

  useEffect(() => {
    const newVal = defaultValue?.getTime() ?? null;
    if (newVal !== prevValue.current){
      prevValue.current = newVal;
      onChange && onChange(defaultValue?.getTime() ?? null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  const handleChangeValue = (newValue: Date | null) => {

    const ts = newValue?.getTime();
    const valueTextLength = TextRef.current?.querySelector('input')?.value.length;
    if(ts === undefined){
      setLocalMessage('Vui lòng nhập');
    }
    if (ts !== undefined && isNaN(ts)){
      if (valueTextLength !== undefined && valueTextLength > 6){
        setLocalMessage('Ngày không tồn tại');
      }else{
         setLocalMessage(undefined);
      }
    } else if(Number(ts) < 0){
        setLocalMessage(undefined); // ???????????????????????
        setDefaultValue(newValue);
    } else {
      // console.log("vo C",newValue);
      setLocalMessage(undefined);
      setDefaultValue(newValue);
    }
  }


  return (
    <FormControl className={inputClass} fullWidth={ fullWidth } sx={ disabled === true ? SxDateDisabled : sx }>
      {!!label && <Label required={ required }>{ label }</Label>}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          inputFormat="dd/MM/yyyy"
          disabled={disabled}
          value={defaultValue}
          ref={InputDateRef}
          onChange={handleChangeValue}
          onAccept={onAcept}
          renderInput={(params:any) => (
            <TextField {...params} ref={ TextRef } fullWidth helperText={ message || LocalMessage }/>
          )}
          InputAdornmentProps={{
            sx: {
              maxHeight: '36px'
            }
          }}
          components={{
            OpenPickerIcon: FaCalendarAlt,
          }}
          OpenPickerButtonProps={{
            className: "text-primary",
            sx: {
              height: '36px',
              '& svg': {
                fontSize: '16px'
              }
            }
          }}     
          // onViewChange={onViewChange}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export default forwardRef(InputDate);