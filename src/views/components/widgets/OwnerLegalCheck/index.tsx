
import { SxProps, Theme } from '@mui/system';
import useMasterData from 'app/hooks/useMasterData';
import { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Radio, { RadioRef } from 'views/components/base/Radio';

export interface CollateralCheckProps{
  value?: string;
  label?: ReactNode;
  onChange?(value: string): void;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  listDesabled?: string[];
}
export interface CollateralCheckRef {
  setValue(value: string): void;
  // getChecked(): boolean[];
}
export interface OwnerLegalCheckComponent
  extends ForwardRefRenderFunction<CollateralCheckRef, CollateralCheckProps> {}

const OwnerLegalCheck: OwnerLegalCheckComponent = (props,ref) => {

  const { onChange, value, label, required, sx, disabled,listDesabled} = props;

  const { CollateralOwnerType , register } = useMasterData();
  useEffect(() => {
    register('collateralOwnerType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
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
  
  useImperativeHandle(ref, () => ({

    setValue(values) {
      setCurrentValue(values);
    },
  }));

  return <Radio
    label={ label }
    ref={ checkboxRef }
    required={required}
    variant="checkbox"
    disabled={disabled}
    onChange={ changeCheckbox }
    options={  CollateralOwnerType.map(
        (cot) => ({
          label: cot.name,
          value: cot.code,
          disabled: cot.code === listDesabled?.find(i=> i === cot.code)
        })
      )}
    value={CurrentValue}
    sx={{ flexDirection: 'column', ...sx }}
  />

}

export default forwardRef(OwnerLegalCheck);