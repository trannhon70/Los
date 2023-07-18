import useMasterData from 'app/hooks/useMasterData';
import { registerMasterData } from 'features/master-data/actions';
import { getMasterData } from 'features/master-data/selectors';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchedBussinessType } from 'features/master-data/bussinessType/actions';
// import { getLOANNormalConfigBussniessType } from 'features/master-data/bussinessType/selectors';
import { IDefaultFlag, IIdCodeName } from 'types';
// import {  fetchBussiness } from 'features/master-data/bussinessType/actions';
import Select, { SelectRef } from 'views/components/base/Select';

export interface SelectBussniessTypeRef {
  getPartnerCode(): (IIdCodeName & IDefaultFlag)[] | undefined;
}

export interface SelectBussniessTypeProps {
  code?: string;
  required?: boolean; 
  value?: string;
  disabled?: boolean;
  label:string;
  onChange?(value: string): void;
}

export interface SelectBussniessTypeComponent
  extends ForwardRefRenderFunction<SelectBussniessTypeRef, SelectBussniessTypeProps> { }

const SelectBussniessType: SelectBussniessTypeComponent = (props, ref) => {

  const { code = "", value, disabled, onChange, label, required } = props;

  const { BusinessType, register } = useMasterData();
  // const fetched = useSelector(fetchBussiness);
  // const fetching = useSelector(fetchBussinessTypeStarted);
  const dispatch = useDispatch();

  const [CurrentCode, setCurrentCode] = useState<string>(code);
  // const dataBuss = useSelector(getLOANNormalConfigBussniessType(code));
  const dataBuss =  BusinessType?.data?.data?.filter(b => b.id.includes(code)) ?? [];


  // const test = dispatch(registerMasterData("bussinessType", {param: code}))

  useEffect(()=>{
    register('businessType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [CurrentValue, setCurrentValue] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const bussinessTypeRef = useRef<SelectRef>(null);



  useEffect(() => {
    setCurrentCode(code);
    if(code !== CurrentCode){
      dispatch(registerMasterData("businessType", {param: code}))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    Current.current = value;
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    CurrentValue !== Current.current
      && !disabled
      && onChange
      && onChange(CurrentValue ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentValue]);

  useEffect(() => {
    // code && dispatch(fetchBussiness(CurrentCode))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentCode]);


  const changeSelect = () => {
    setCurrentValue(bussinessTypeRef.current?.getValue()?.toString())
  }

  const options = dataBuss?.length > 0
    ? dataBuss?.map(c => ({ value: c.id, label: c.name })) : [];

  return <Select
    label={label}
    value={CurrentValue}
    onChange={changeSelect}
    options={options}
    ref={bussinessTypeRef}
    required={required}
  />

}

export default forwardRef(SelectBussniessType);
