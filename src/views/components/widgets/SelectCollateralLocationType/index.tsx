import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Select from 'views/components/base/Select';
import useMasterData from 'app/hooks/useMasterData';

export interface ISelectCollateralLocationTypeProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  disabled?:boolean;
  onChange?(value: string) : void;
}

// TODO: Loại vị trí
const SelectCollateralLocationType: FC<ISelectCollateralLocationTypeProps> = props => {
  
  const { label, required, message, value, onChange,disabled } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { CollateralLocationType, register } = useMasterData();

  useEffect(() => {
    register('collateralLocationType')
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

  const options = CollateralLocationType.map(c => ({ value: c.code, label: c.name }));

  return <Select 
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    disabled= { disabled }
  />

}

export default SelectCollateralLocationType;