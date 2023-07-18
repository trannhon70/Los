import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Radio, { RadioRef } from 'views/components/base/Radio';
import useMasterData from 'app/hooks/useMasterData';

export interface MethodReceivingSalaryCheckProps{
  value?: string;
  label?: ReactNode;
  onChange?(value: string): void;
  required?: boolean;
  disabled?: boolean;
}

const MethodReceivingSalaryCheck: FC<MethodReceivingSalaryCheckProps> = props => {

  const { onChange, value, label, required=true, disabled} = props;

  const { MethodReceiveSalary, register } = useMasterData();
  
  useEffect(() => {
    register('methodReceiveSalary')
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
    disabled={disabled}
    required={required}
    label={ label }
    ref={ checkboxRef }
    variant="checkbox"
    onChange={ changeCheckbox }
    options={MethodReceiveSalary.map(b => ({
      value: b.id, 
      label: b.name, 
      // checked: b.id === CurrentValue
    }))}
    value={CurrentValue}
    sx={{ flexDirection: 'column' }}
  />

}

export default MethodReceivingSalaryCheck;