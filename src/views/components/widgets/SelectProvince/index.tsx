import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import useMasterData from 'app/hooks/useMasterData';

export interface SelectProvinceProps{
  country?: string;
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
}

const SelectProvince: FC<SelectProvinceProps> = props => {

  const { label, required, message, value, onChange, country, disabled } = props;

  const [ CurrentCountry, setCurrentCountry ] = useState<string | undefined>(country);
  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { Province, register } = useMasterData();

  useEffect(() => {
    setCurrentCountry(country);
  }, [ country ]);

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
    CurrentCountry && register('province', CurrentCountry);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[CurrentCountry])

  const changeSelect = (value: string) => {
    setCurrentValue(value);
  }

  // const options = Province[Number(CurrentCountry) ?? '']?.data
  // ?.map(p => ({ value: p.id, label: p.name }));

  const options = Province
  ?.map(p => ({ value: p.id, label: p.name }));

  return <Autocomplete
    label={ label }
    required={ required }
    value={ CurrentValue }
    message={ message }
    onChange={ changeSelect }
    options={ options }
    disabled={ disabled }
  />

}

export default SelectProvince;