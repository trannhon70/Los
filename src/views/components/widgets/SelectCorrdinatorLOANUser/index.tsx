import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import { Theme, SxProps } from '@mui/system';
import { useSelector } from 'react-redux';
import { getStoredCorrdinatorLOANUsers } from 'features/loan/corrdinator/corrdinatorUser/selector';

export interface ISelectCorrdinatorLOANUserProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  placeholder?: string;
  sx?: SxProps<Theme>;
  isFullName?: boolean;
}

const SelectCorrdinatorLOANUser: FC<ISelectCorrdinatorLOANUserProps> = props => {
  
  const { label, required, message, value, onChange, disabled, sx, placeholder, isFullName = false } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);

  const StoredCorrdinatorLOANUsers = useSelector(getStoredCorrdinatorLOANUsers);
  
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

  return  <Autocomplete 
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ [] } 
    onChange={ changeSelect }
    disabled={ disabled }
    placeholder={ placeholder }
    sx={ sx }
    isTooltip
  /> 
}

export default SelectCorrdinatorLOANUser;