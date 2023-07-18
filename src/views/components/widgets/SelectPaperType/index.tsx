import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { SxProps, Theme } from '@mui/system';
import Select from 'views/components/base/Select';
import useMasterData from 'app/hooks/useMasterData';

export interface SelectPaperTypeProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const SelectPaperType: FC<SelectPaperTypeProps> = props => {
  
  const { label, required, message, value, onChange, disabled, sx} = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { PaperType, register } = useMasterData();
  
  useEffect(() => {
    register('paperType')
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

  const options = PaperType.map(c => ({ value: c.id, label: c.name }));

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

export default SelectPaperType;