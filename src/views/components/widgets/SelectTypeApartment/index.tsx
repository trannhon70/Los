import { Theme, SxProps } from '@mui/system';
import useMasterData from 'app/hooks/useMasterData';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Select from 'views/components/base/Select';

export interface SelectVehicleTypeProps {
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string): void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

// Loại căn hộ
const SelectTypeApartment: FC<SelectVehicleTypeProps> = props => {

  const { label, required, message, value, onChange, disabled, sx } = props;

  const [CurrentValue, setCurrentValue] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { TypeApartment, register } = useMasterData();
  
  useEffect(() => {
    register('typeApartment')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    Current.current = value;
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (CurrentValue !== Current.current) {
      Current.current = CurrentValue;
      onChange && onChange(CurrentValue ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentValue]);

  const changeSelect = (value: string) => {
    setCurrentValue(value);
  }

  const options = TypeApartment.map(c => ({ value: c.id, label: c.name }));

  return <Select
    label={label}
    required={required}
    message={message}
    value={CurrentValue}
    options={options}
    onChange={changeSelect}
    disabled={disabled}
    sx={sx}
  />
}

export default SelectTypeApartment;