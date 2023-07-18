import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import useMasterData from 'app/hooks/useMasterData';
import { Theme, SxProps } from '@mui/system';

export interface ISelectTypeBusinessShProps{
  typeBusiness?: string;
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  disabled?: boolean;
  onChange?(value: string) : void;
  sx?: SxProps<Theme>;
}

// Loại hình doanh nghiệp (Vay Thường)
const SelectTypeBusinessSh: FC<ISelectTypeBusinessShProps> = props => {

  const { label, required, message, value, onChange, typeBusiness, disabled, sx } = props;

  const [ CurrentTypeBusiness, setCurrentTypeBusiness ] = useState<string | undefined>(typeBusiness);
  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { BusinessType, register } = useMasterData();

  useEffect(() => {
    if(typeBusiness !== CurrentTypeBusiness){
      setCurrentTypeBusiness(typeBusiness);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ typeBusiness ]);

 

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
    CurrentTypeBusiness && register('businessType', CurrentTypeBusiness);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  const changeSelect = (value: string) => {
    setCurrentValue(value);
  }

  const options = BusinessType[CurrentTypeBusiness ?? ""]?.data?.map(d => ({ value: d.code, label: d.name }));
  
  return <Autocomplete
    label={ label }
    required={ required }
    value={ CurrentValue }
    message={ message }
    onChange={ changeSelect }
    options={ options }
    disabled={disabled }
    sx={ sx }
  />
}

export default SelectTypeBusinessSh;