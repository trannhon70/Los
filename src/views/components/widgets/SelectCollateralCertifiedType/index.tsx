import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Select from 'views/components/base/Select';
import useMasterData from 'app/hooks/useMasterData';
import { SxProps, Theme } from '@mui/system';

export interface ISelectCollateralCertifiedTypeProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  placeholder?: string;
}

// TODO: Loại GCN quyền sử dụng đất - Loại GCN
const SelectCollateralCertifiedType: FC<ISelectCollateralCertifiedTypeProps> = props => {
  
  const { label, required, message, value, onChange, disabled, sx, placeholder } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { CollateralCertifiedType, register } = useMasterData();

  useEffect(()  =>{
    register('collateralCertifiedType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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

  const options = CollateralCertifiedType.map(c => ({ value: c.code, label: c.name }));

  return <Select 
    placeholder={ placeholder } 
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    disabled= { disabled }
    sx={ sx }
  />

}

export default SelectCollateralCertifiedType;