import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Select from 'views/components/base/Select';
import useMasterData from 'app/hooks/useMasterData';
import { SxProps, Theme } from '@mui/system';

export interface SelectDependentPersonProps{
  label?: ReactNode;
  message?: string;
  value?: number;
  required?: boolean;
  onChange?(value: number): void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const SelectDependentPerson: FC<SelectDependentPersonProps> = props => {

  const { label, message, value, required, onChange, disabled ,sx} = props;

  const [ CurrentValue, setCurrentValue ] = useState<number | undefined>(value);
  const Current = useRef<number | undefined>(value);
  const { PeopleDepend } = useMasterData();
  useEffect(() => {
    Current.current = value;
    setCurrentValue(value);
  }, [ value ]);

  useEffect(() => {
    if (CurrentValue !== Current.current){
      Current.current = CurrentValue;
      onChange && onChange(CurrentValue ?? -1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  const changeSelect = (value: number) => {
    setCurrentValue(value);
  }

  const options = new Array(PeopleDepend.max_value + 1).fill('')
    .map((_, i) => ({ value: PeopleDepend.min_value + i }));

  return <Select
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    disabled={ disabled }
    sx={sx}
  />

}

export default SelectDependentPerson;