import useMasterData from 'app/hooks/useMasterData';
import { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IDefaultFlag, IIdName } from 'types';
import Select, { SelectRef } from 'views/components/base/Select';
import { Theme, SxProps } from '@mui/system';

export interface SelectBussniessTypeShRef{
  getBussinessTypeSH(): (IIdName & IDefaultFlag) | undefined;
}

export interface SelectBussniessTypeShProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}
export interface SelectBussniessTypeShtComponent
  extends ForwardRefRenderFunction<SelectBussniessTypeShRef, SelectBussniessTypeShProps>{}

const SelectBussniessTypeSh: SelectBussniessTypeShtComponent =  (props, ref)  => {
  
  const { label, required, message, value, onChange, disabled, sx } = props;

  // const [ CurrentType, setCurrentType ] = useState<string>(codeType);

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const bussinessTypeRef = useRef<SelectRef>(null);
  const { BusinessTypeSh, register } = useMasterData();
  useEffect(()=> {
    register('businessTypeSh')
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
    setCurrentValue(bussinessTypeRef.current?.getValue().toString())
  }

  useImperativeHandle(ref, () => ({
    getBussinessTypeSH(){
      return BusinessTypeSh.find(p => p.id === CurrentValue)
    }
  }))
  const options = BusinessTypeSh.map(c => ({ value: c.id, label: c.name }));

  return <Select 
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ options } 
    onChange={ changeSelect }
    disabled={ disabled }
    ref={bussinessTypeRef}
    sx={sx}
  />
}

export default forwardRef(SelectBussniessTypeSh);