import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Radio, { RadioRef } from 'views/components/base/Radio';
import useMasterData from 'app/hooks/useMasterData';

export interface AbelPayLabelCheckProps{
  value?: string;
  label?: ReactNode;
  onChange?(value: string): void;
  disabled?: boolean;
}

const AbelPayLabelCheck: FC<AbelPayLabelCheckProps> = props => {

  const { onChange, value, label, disabled } = props;

  const { AblePayLabel, register } = useMasterData();

  useEffect(() => {
    register("ablePayLabel")
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
    variant="checkbox"
    onChange={ changeCheckbox }
    options={AblePayLabel.map((item)=>({
      value:item.code,
      label:<span dangerouslySetInnerHTML={{__html: item.name}}></span>,
    }))}
    value={CurrentValue}
    sx={{ flexDirection: 'column' }}
    disabled={disabled}
    
  />

}

export default AbelPayLabelCheck;