
import { FC, ReactNode, useEffect, useRef, useState, memo} from 'react';
import Radio, { RadioRef } from 'views/components/base/Radio';
import { Theme, SxProps } from '@mui/system';

export interface RadioCheckProps{
  value?: string;
  label?: ReactNode;
  onChange?(value: string): void;
  required?: boolean;
  disabled?: boolean;
  checkValueDisabled?:string
  sx?: SxProps<Theme>;
  className?: string;
}

const RadioCheck: FC<RadioCheckProps> = props => {

  const { onChange, value, label, required, sx, disabled, className,checkValueDisabled } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const checkboxRef = useRef<RadioRef>(null);
  
  useEffect(() => {
    if(value !== Current.current){
      Current.current = value;
      checkboxRef.current?.setValue(value ?? "");
      setCurrentValue(value);
      onChange && onChange(value ?? '');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);

  useEffect(() => {
    if (CurrentValue !== Current.current){
      Current.current = CurrentValue;
      onChange && onChange(CurrentValue ?? '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  const changeCheckbox = () => {
    setCurrentValue(checkboxRef.current?.getValue().value)
  }

  const optionsRadio = [
    {
      id:"Y",
      name:"Có",
      code:"Y",
      is_default: "Y"
    },
    {
      id:"N",
      name:"Không",
      code:"N",
      is_default: "N"
    }
  ]

  return <Radio
    label={ label }
    ref={ checkboxRef }
    required={required}
    variant="checkbox"
    disabled={disabled}
    onChange={ changeCheckbox }
    className={className}
    options={optionsRadio.map((item)=>({
      value:item.code,
      label:<span dangerouslySetInnerHTML={{__html: item.name}}></span>,
      disabled:!!checkValueDisabled
    }))}
    value={CurrentValue}
    sx={{ flexDirection: 'column', ...sx }}
  />

}

export default memo(RadioCheck);