import { getMasterData } from 'features/master-data/selectors';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { IIdName } from 'types';
import Checkbox, { CheckboxRef } from 'views/components/base/Checkbox';

export interface CheckBoxCustomerTypeRef {
  getCustomerType(): IIdName | undefined;
}
const checkArray = (arr1: string[], arr2: string[]) => {
  const o1 = arr2.filter(v => arr1.indexOf(v) === -1);
  const o2 = arr1.filter(v => arr2.indexOf(v) === -1);

  return !!o1.length || !!o2.length
}
export interface CheckBoxCustomerTypeProps {
  value?: string[];
  disabled?: boolean;
  onChange?(value: string[]): void;
}

export interface CheckBoxCustomerTypeComponent
  extends ForwardRefRenderFunction<CheckBoxCustomerTypeRef, CheckBoxCustomerTypeProps> { }

const CheckBoxCustomerType: CheckBoxCustomerTypeComponent = (props, ref) => {

  const { value = [], disabled, onChange } = props;

  const { customerSegment } = useSelector(getMasterData);

  const [CurrentValue, setCurrentValue] = useState<string[]>(value ?? []);

  const Current = useRef<string[]>(value ?? []);

  const customerTypeRef = useRef<CheckboxRef>(null);

  useEffect(() => {
    Current.current = value;
    if (checkArray(value, CurrentValue)) {
      setCurrentValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    CurrentValue !== Current.current
      && !disabled
      && onChange
      && onChange(CurrentValue ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentValue]);



  useImperativeHandle(ref, () => ({
    getCustomerType() {
      return customerSegment.data.find(p => p.id === CurrentValue[0]);
    }
  }))

  const changeCustomerType = () => {
    setCurrentValue(customerTypeRef.current?.getValue()
      .filter(item => item.checked)
      .map(q => q.value.toString()) ?? []);
  }
  return <Checkbox
    disabled={disabled}
    required
    className="checkbox_type_customer w-full"
    ref={customerTypeRef}
    options={customerSegment.data.map(item => ({
      value: item.id,
      label: item.name,
      checked: CurrentValue.indexOf(item.id) > -1
    }))}
    onChange={changeCustomerType}
  />
}

export default forwardRef(CheckBoxCustomerType);