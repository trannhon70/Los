import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Radio, { RadioRef } from 'views/components/base/Radio';
import useMasterData from 'app/hooks/useMasterData';

export interface AcceptCreditCheckProps{
  value?: string;
  label?: ReactNode;
  onChange?(value: string): void;
  disabled?:boolean;
}

const AcceptCreditCheck: FC<AcceptCreditCheckProps> = props => {

  const { onChange, value, label ,disabled} = props;

  const { AcceptCreditLabel, register } = useMasterData();

  useEffect(() => {
    register('acceptCreditLabel')
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

  return <Radio
    label={ label }
    ref={ checkboxRef }
    disabled={disabled}
    variant="checkbox"
    onChange={ changeCheckbox }
    options={AcceptCreditLabel.map(b => ({
      value: b.code, label: b.name
    }))}
    value={CurrentValue}
    sx={{ flexDirection: 'column' }}
  />

}

export default AcceptCreditCheck;