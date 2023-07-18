import { Theme, SxProps } from '@mui/system';
import useMasterData from 'app/hooks/useMasterData';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Select from 'views/components/base/Select';

export interface SelectMachineTypeProps {
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string): void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  className?: string;
}

const SelectMachineType: FC<SelectMachineTypeProps> = props => {

  const { label, required, message, value, onChange, disabled, sx ,className} = props;

  const [CurrentValue, setCurrentValue] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { MachineType, register } = useMasterData();
  
  useEffect(() => {
    register('machineType')
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

  const options = MachineType.map(c => ({ value: c.id, label: c.name }));

  return <Select
    className={className}
    label={label}
    required={required}
    message={message}
    value={CurrentValue}
    options={options}
    onChange={changeSelect}
    disabled={disabled}
    sx={sx}
    displayEmptyLabel="--- Chọn loại MMTB ---"
  />
}

export default SelectMachineType;