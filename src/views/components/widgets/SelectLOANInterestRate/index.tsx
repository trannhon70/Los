import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Select from 'views/components/base/Select';
import useMasterData from 'app/hooks/useMasterData';
import { capitalizeString } from 'utils';

export interface SelectLOANInterestRateProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
}

const SelectLOANInterestRate: FC<SelectLOANInterestRateProps> = props => {
  
  const { label, required, message, value, onChange, disabled } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { LoanInterestRate, register } = useMasterData();
  
  useEffect(() => {
    register('loanInterestRate')
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

  const options = LoanInterestRate.map(c => ({ value: c.id, label: capitalizeString(c.name) }));

  return <Select
    sx={{
      '& .MuiFormControl-root': {
        '& .MuiInput-root': {
          '& .MuiSelect-select::first-letter': {
            textTransform: 'uppercase'
          }
        }
      }
    }}
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    disabled={ disabled }
  />

}

export default SelectLOANInterestRate;