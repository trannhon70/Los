import useMasterData from 'app/hooks/useMasterData';
import { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IDefaultFlag, IIdCodeName } from 'types';
import Select, { SelectRef } from 'views/components/base/Select';
import { Theme, SxProps } from '@mui/system';
export interface ISelectAppraisalUnitTypeRef{
  getBussinessTypeSH(): (IIdCodeName & IDefaultFlag) | undefined;
}

export interface ISelectAppraisalUnitTypeProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  placeholder?: string;
  sx?: SxProps<Theme>;
}
export interface SelectAppraisalUnitTypeComponent
  extends ForwardRefRenderFunction<ISelectAppraisalUnitTypeRef, ISelectAppraisalUnitTypeProps>{}


//TODO: Đơn vị thực hiện thẩm định giá
const SelectAppraisalUnitType: SelectAppraisalUnitTypeComponent =  (props, ref)  => {
  
  const { label, required, message, value, onChange, disabled, placeholder,sx } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const appraisalUnitTypeRef = useRef<SelectRef>(null);
  const { AppraisalUnitType, register } = useMasterData();
  useEffect(() => {
    register('appraisalUnitType')
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

  const changeSelect = () => {
    setCurrentValue(appraisalUnitTypeRef.current?.getValue().toString())
  }

  useImperativeHandle(ref, () => ({
    getBussinessTypeSH(){
      return AppraisalUnitType.find(p => p.id === CurrentValue)
    }
  }))
  const options = AppraisalUnitType.map(c => ({ value: c.id, label: c.name }));

  return <Select 
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    disabled={ disabled }
    ref={appraisalUnitTypeRef}
    placeholder={placeholder}
    sx={ sx }
  />
}

export default forwardRef(SelectAppraisalUnitType);