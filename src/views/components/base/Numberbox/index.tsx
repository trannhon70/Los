import { ChangeEvent, forwardRef, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import InputNumber, { InputNumberProps } from '@kensoni/react-input-number'
import TextField from "@mui/material/TextField";
import { SxBaseApp } from "types/app";
import clsx from 'clsx'
import FormControl from "@mui/material/FormControl";
import Label from "../Label";

export interface NumberboxProps extends Omit<InputNumberProps, "renderInput"> {
  sx?: SxBaseApp
  disabled?: boolean;
  fullWidth?: boolean;
  label?: ReactNode;
  message?: string;
  placeholder?: string;
  required?: boolean;
  classInput?: string;
  onDebounce?(value: string): void;
  timeout?: number;
  labelColor?: string;
  isTooltip?: boolean;
}

const Numberbox = forwardRef<HTMLInputElement, NumberboxProps>(
  function Numberbox(props, ref){
    const {
      value,
      sx,
      disabled,
      fullWidth = true,
      label,
      message,
      placeholder,
      required,
      classInput,
      onDebounce,
      timeout = 300,
      labelColor,
      isTooltip,
      onChange,
      className,
      ...rest
    
    } = props

    const [currentMessage, setCurrentMessage] = useState(message)
    const [currentValue, setCurrentValue] = useState(value)

    const numberRef = useRef<HTMLInputElement>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {
      message === currentMessage || setCurrentMessage(message)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[message])
    
    useEffect(() => {
      value === currentValue || setCurrentValue(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value])
    
    useEffect(() => {
      if(ref){
        if(typeof ref === 'function'){
          ref(numberRef.current)
        }
        else {
          (ref as MutableRefObject<HTMLInputElement>).current = numberRef.current!;
        }
      }
    })

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setCurrentValue(value)
      
      if(onDebounce && timeout > 0){
        timerRef.current && clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
          onDebounce(value)
          clearTimeout(timerRef.current)
        }, timeout)
      }
      else {
        onChange && onChange(event)
      }
    }
    const inputClass = clsx("mscb-input", className);

    return <FormControl className={inputClass} fullWidth={ fullWidth } sx={ sx }>
      {!!label && (
        <Label required={ required } color={ labelColor } className="ellipsis">{ label }</Label>
      )}
      <InputNumber
        {...rest}
        ref={numberRef} 
        value={ value }
        onChange={ onChangeInput }
        renderInput={(inputProps, inputRef) => (
          <TextField
              fullWidth={fullWidth}
              error={!!currentMessage}
              disabled={disabled}
              placeholder={placeholder}
              className={ clsx({ error : !!currentMessage }) }
              variant="standard"
              helperText={currentMessage}
              inputProps={inputProps}
              inputRef={inputRef} 
            />
        )}
      />
    </FormControl>
  }
);

export default Numberbox;

