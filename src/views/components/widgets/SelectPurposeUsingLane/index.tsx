import { SxProps, Theme } from '@mui/system';
import useMasterData from 'app/hooks/useMasterData';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Select from 'views/components/base/Select';

export interface ISelectPurposeUsingLaneProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}

/**
 * @TODO Mục đích sử dụng đất (theo thẩm định giá)
 * 
 */
const SelectPurposeUsingLane: FC<ISelectPurposeUsingLaneProps> = props => {
  
  const { label, required, message, value, onChange, disabled, className, sx } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { PurposeUsingLane } = useMasterData();
  
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

  const options = PurposeUsingLane.map(c => ({ value: c.code, label: c.name }));

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

export default SelectPurposeUsingLane;