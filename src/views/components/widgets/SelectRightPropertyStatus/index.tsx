import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Select from 'views/components/base/Select';
import useMasterData from 'app/hooks/useMasterData';

export interface SelectRightPropertyStatusProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  typeProperty: 'QTS' | 'VTHH' | 'MMTB'
  placeHolder?: string;
}

const SelectRightPropertyStatus: FC<SelectRightPropertyStatusProps> = props => {
  
  const { label, required, message, value, onChange, disabled,typeProperty, placeHolder } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { RightPropertyPropertyStatus, GoodPropertyStatus, DevicesPropertyStatus, register } = useMasterData();
  
  useEffect(() => {
    register('rightPropertyPropertyStatus')
    register('goodPropertyStatus')
    register('devicesPropertyStatus')
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

  const options =()=> {
    switch(typeProperty){
      case 'QTS':
        return RightPropertyPropertyStatus.map(c => ({ value: c.code, label: c.name }))
      case 'VTHH':
        return GoodPropertyStatus.map(c => ({ value: c.code, label: c.name }))
      case 'MMTB':
        return DevicesPropertyStatus.map(c => ({ value: c.code, label: c.name }))
      default:
        return RightPropertyPropertyStatus.map(c => ({ value: c.code, label: c.name }))
    }
  };

  return <Select 
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options() } 
    onChange={ changeSelect }
    disabled={ disabled }
    placeholder={placeHolder}
  />

}

export default SelectRightPropertyStatus;