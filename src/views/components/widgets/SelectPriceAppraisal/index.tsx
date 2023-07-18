import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import useMasterData from 'app/hooks/useMasterData';

export interface ISelectPriceAppraisalProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * @todo TT.TĐTS thực hiện thẩm định giá
 * 
 */
const SelectPriceAppraisal: FC<ISelectPriceAppraisalProps> = props => {
  
  const { label, required, message, value, onChange, disabled, placeholder } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { PriceAppraisal, register } = useMasterData();
  
  useEffect(() => {
    register('priceAppraisal')
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

  const options = PriceAppraisal.map(c => ({ value: c.code, label: c.name }));

  return <Autocomplete 
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    disabled={ disabled }
    placeholder={placeholder}
  />

}

export default SelectPriceAppraisal;