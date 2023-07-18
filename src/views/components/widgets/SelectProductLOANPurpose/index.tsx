import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Select from 'views/components/base/Select';
import useMasterData from 'app/hooks/useMasterData';
import { getLOANNormalStorageProductIsBusiness } from 'features/loan/normal/storage/product/selectors';
import { useSelector } from 'react-redux';

export interface SelectProductLOANPurposeProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
}

const SelectProductLOANPurpose: FC<SelectProductLOANPurposeProps> = props => {
  
  const { label, required, message, value, onChange, disabled } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { LoanPurpose, register } = useMasterData();
  const isBusiness = useSelector(getLOANNormalStorageProductIsBusiness) ?? ""
  
  useEffect(() => {
    register('loanPurpose')
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

  const NewLoanPurposeCore = LoanPurpose.filter(e => {
    if(!isBusiness) return true;
    else return e.id === isBusiness
  })
  const options = NewLoanPurposeCore.map(c => ({ value: c.id, label: c.name }));

  return <Select 
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    disabled={ disabled }
  />

}

export default SelectProductLOANPurpose;