import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import useMasterData from 'app/hooks/useMasterData';

export interface SelectWardProps{
  district?: string;
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  disabled?: boolean;
  onChange?(value: string) : void;
}

const SelectWard: FC<SelectWardProps> = props => {

  const { label, required, message, value, onChange, district, disabled } = props;

  const [ CurrentDistrict, setCurrentDistrict ] = useState<string | undefined>(district);
  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { Ward, register } = useMasterData();

  useEffect(() => {
    setCurrentDistrict(district);
  }, [ district ]);

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

  useEffect(() => {
    CurrentDistrict && register('ward', CurrentDistrict);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[CurrentDistrict])

  const changeSelect = (value: string) => {
    setCurrentValue(value);
  }

  const options = Ward[CurrentDistrict ?? '']?.data
  ?.map(d => ({ value: d.id, label: d.name }));

  return <Autocomplete
    label={ label }
    required={ required }
    value={ CurrentValue }
    message={ message }
    onChange={ changeSelect }
    options={ options }
    disabled={disabled }
  />

}

export default SelectWard;