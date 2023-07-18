import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import useMasterData from 'app/hooks/useMasterData';

export interface ISelectOriginLaneUseProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
}

/**
 * @todo Nguồn gốc sử dụng đất theo GCN | Nguồn gốc SD đất theo GCN
 * 
 */
const SelectOriginLaneUse: FC<ISelectOriginLaneUseProps> = props => {
  
  const { label, required, message, value, onChange, disabled } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { OriginLaneUse, register } = useMasterData();
  
  useEffect(() => {
    register('originLaneUse')
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

  const options = OriginLaneUse.map(c => ({ value: c.code, label: c.name }));

  return <Autocomplete 
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    disabled={ disabled }
  />

}

export default SelectOriginLaneUse;