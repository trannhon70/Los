import { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import useMasterData from 'app/hooks/useMasterData';

export interface SelectCreditInstitutionRef{
  setValue(value: string): void;
  getValue(): string | undefined
}

export interface SelectCreditInstitutionProps{
  label?: ReactNode;
  value?: string;
  message?: string;
  onChange?(value: string): void;
  required?: boolean;
  disabled?: boolean;
}

export interface SelectCreditInstitutionComponent 
  extends ForwardRefRenderFunction<SelectCreditInstitutionRef, SelectCreditInstitutionProps>{}

const SelectCreditInstitution: SelectCreditInstitutionComponent = (props, ref) => {

  const { label, value, message, onChange, required, disabled } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { CreditInstitution, register } = useMasterData();
  
  useEffect(() => {
    register('creditInstitution')
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

  useImperativeHandle(ref, () => ({
    setValue: val => setCurrentValue(val),
    getValue: () => CurrentValue
  }))

  const changeSelect = (value: string) => {
    setCurrentValue(value);
  }

  const options = CreditInstitution.map(c => ({ value: c.code, label: `${c.code} - ${c.name}` }));

  return <Autocomplete
    label={ label }
    required={ required }
    value={ CurrentValue }
    message={ message }
    onChange={ changeSelect }
    options={  options }
    disabled={ disabled }
  />

}

export default forwardRef(SelectCreditInstitution);