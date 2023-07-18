import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Radio, { RadioRef } from 'views/components/base/Radio';
import useMasterData from 'app/hooks/useMasterData';

export interface GuaranteeRadioProps{
  value?: string;
  label?: ReactNode;
  onChange?(value: string): void;
}

const GuaranteeRadio: FC<GuaranteeRadioProps> = props => {

  const { onChange, value, label } = props;

  const { GuaranteeForm , register } = useMasterData();
  
  useEffect(() => {
    register('guaranteeForm')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const checkboxRef = useRef<RadioRef>(null);
  
  useEffect(() => {
    Current.current = value;
    setCurrentValue(value);
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
    variant="checkbox"
    onChange={ changeCheckbox }
    options={GuaranteeForm.map(b => ({
      value: b.id, label: b.name
    }))}
    value={CurrentValue}
    sx={{ flexDirection: 'column' }}
  />

}

export default GuaranteeRadio;