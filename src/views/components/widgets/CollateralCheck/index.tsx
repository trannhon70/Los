
import { FC, ReactNode, useEffect, useRef, useState, memo, ForwardRefRenderFunction, forwardRef, useImperativeHandle} from 'react';
import Radio, { RadioRef } from 'views/components/base/Radio';
import { Theme, SxProps } from '@mui/system';
import useMasterData from 'app/hooks/useMasterData';

export interface CollateralCheckProps{
  value?: string;
  label?: ReactNode;
  onChange?(value: string): void;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  className?: string;
}

export interface CollateralCheckRef {
  setValue(value: string): void;
}

export interface CollateralCheckComponent 
  extends ForwardRefRenderFunction<CollateralCheckRef, CollateralCheckProps>{}

const CollateralCheck: CollateralCheckComponent = (props, ref) => {

  const { onChange, value, label, required, sx, disabled, className } = props;

  const { Collateral, register } = useMasterData();

  useEffect(() => {
    register('collateral')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const checkboxRef = useRef<RadioRef>(null);
  
  useImperativeHandle(ref, () => ({
    setValue: val => setCurrentValue(val)
  }))
  
  useEffect(() => {
    // Current.current = value;
    // checkboxRef.current?.setValue(value ?? "");
    // setCurrentValue(value);
    // onChange && onChange(value ?? '');

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

  return <Radio
    label={ label }
    ref={ checkboxRef }
    required={required}
    variant="checkbox"
    disabled={disabled}
    onChange={ changeCheckbox }
    className={className}
    options={Collateral.map((item)=>({
      value:item.code,
      label:<span dangerouslySetInnerHTML={{__html: item.name}}></span>,
    }))}
    value={CurrentValue}
    sx={{ flexDirection: 'column', ...sx }}
  />

}

export default forwardRef(CollateralCheck);