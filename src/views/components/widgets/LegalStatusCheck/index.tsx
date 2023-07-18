
import { FC, ReactNode, useEffect, useRef, useState, memo } from 'react';
import Radio, { RadioRef } from 'views/components/base/Radio';
import { Theme, SxProps } from '@mui/system';
import useMasterData from 'app/hooks/useMasterData';

export interface LegalStatusCheckProps{
  value?: string;
  label?: ReactNode;
  onChange?(value: string): void;
  required?: boolean;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

const LegalStatusCheck: FC<LegalStatusCheckProps> = props => {

  const { onChange, value, label, required, sx, disabled = false } = props;

  const { LegalStatus , register} = useMasterData();

  useEffect(() => {
    register('legalStatus')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const checkboxRef = useRef<RadioRef>(null);
  
  useEffect(() => {
    // Current.current = value;
    // setCurrentValue(value);
    if(value !== Current.current){
      Current.current = value;
      checkboxRef.current?.setValue(value ?? "");
      setCurrentValue(value);
      onChange && onChange(value ?? '');
    }
    // if(value !== Current.current){
    //   Current.current = value;
    //   checkboxRef.current?.setValue(value ?? "");
    //   setCurrentValue(value);
    // }

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
    onChange={ changeCheckbox }
    options={LegalStatus.map((item)=>({
      value:item.code,
      label:<span dangerouslySetInnerHTML={{__html: item.name}}></span>,
      disabled: disabled
    }))}
    value={CurrentValue}
    sx={{ flexDirection: 'column', ...sx }}
  />

}

export default memo(LegalStatusCheck);