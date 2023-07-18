import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import useMasterData from 'app/hooks/useMasterData';

export interface SelectDistrictProps{
  province?: string;
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
}

const SelectDistrict: FC<SelectDistrictProps> = props => {

  const { label, required, message, value, onChange, province, disabled } = props;

  const [ CurrentProvince, setCurrentProvince ] = useState<string | undefined>(province);
  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { District, register } = useMasterData();

  useEffect(() => {
    setCurrentProvince(province);
  }, [ province ]);

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
    CurrentProvince && register('district', CurrentProvince);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[CurrentProvince])

  const changeSelect = (value: string) => {
    setCurrentValue(value);
  }

  const options = District[CurrentProvince ?? '']?.data
  ?.map(d => ({ value: d.id, label: d.name }));

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

export default SelectDistrict;