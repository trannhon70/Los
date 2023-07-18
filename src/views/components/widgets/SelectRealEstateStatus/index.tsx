import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Theme, SxProps } from '@mui/system';
import Select from 'views/components/base/Select';
import useMasterData from 'app/hooks/useMasterData';

export interface SelectRealEstateStatusProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}

const SelectRealEstateStatus: FC<SelectRealEstateStatusProps> = props => {
  
  const { label, required, message, value, onChange, disabled, className, sx } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { TypeRealEstateStatus, register } = useMasterData();
  
  useEffect(() => {
    register('typeRealEstateStatus')
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
  
  const options = TypeRealEstateStatus.map(c => ({ value: c.code, label: c.name }));

  return <Select
    className={className}
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    sx={sx}
    // colorLabel={ 'var(--mscb-danger)!important' }
    disabled={ disabled }
  />

}

export default SelectRealEstateStatus;