import { SxProps, Theme } from '@mui/system';
import { getLOANNormalConfigMetadataConstant } from 'features/loan/normal/configs/metadata/selector';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { METADATA_CONSTANT } from 'utils/constants';
import Autocomplete from 'views/components/base/Autocomplete';

export interface SelectCareerProps {
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  disabled?: boolean;
  onChange?(value: string): void;
  sx?: SxProps<Theme>;
}

const SelectCareer: FC<SelectCareerProps> = props => {

  const { label, required, message, value, onChange, disabled, sx } = props;

  const [CurrentValue, setCurrentValue] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  // const { Careers } = useMasterData();
  const metadataConstant = useSelector(getLOANNormalConfigMetadataConstant)

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
  
  const options = metadataConstant?.data[METADATA_CONSTANT.NGHE_NGHIEP]?.map(c => ({ value: c.id, label: c.name })) ?? [];

  return <Autocomplete
    label={label}
    required={required}
    value={CurrentValue}
    message={message}
    onChange={changeSelect}
    disabled={disabled}
    options={options}
    sx={ sx }
  />
}

export default SelectCareer;