import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import useMasterData from 'app/hooks/useMasterData';
import { Theme, SxProps } from '@mui/system';

export interface SelectIssuerProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  placeholder?: string;
  sx?: SxProps<Theme>;
}

// Đơn vị phát hành
const SelectIssuer: FC<SelectIssuerProps> = props => {
  
  const { label, required, message, value, onChange, disabled, sx, placeholder } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { Issuer, register } = useMasterData();
  useEffect(() => {
    register('issuer')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    Current.current = value;
    setCurrentValue(value);
  }, [ value ]);

  useEffect(() => {
    if (CurrentValue !== Current.current){
      Current.current = CurrentValue;
      onChange && onChange(CurrentValue ?? '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  const changeSelect = (value: string) => {
    setCurrentValue(value);
  }

  const options = Issuer.map(c => ({ value: c.id, label: c.name }));

  return <Autocomplete 
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    disabled={ disabled }
    placeholder={ placeholder }
    sx={ sx }
  />
}

export default SelectIssuer;