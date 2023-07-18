import useMasterData from "app/hooks/useMasterData";
import {
  ForwardRefRenderFunction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IDefaultFlag, IIdCodeName } from "types";
import Select, { SelectRef } from "views/components/base/Select";
// import { fetchExceptionType } from "features/master-data/exception-type/actions";
// import { getLOANNormalConfigExceptionType } from "features/master-data/exception-type/selectors";

export interface SelectExceptionTypeRef {
  getPartnerCode(): (IIdCodeName & IDefaultFlag)[] | undefined;
}

export interface SelectExceptionTypeProps {
  code: string;
  value?: string;
  disabled?: boolean;
  onChange?(value: string): void;
  message?: string;
  required?: boolean;
}

export interface SelectExceptionTypeComponent
  extends ForwardRefRenderFunction<
    SelectExceptionTypeRef,
    SelectExceptionTypeProps
  > {}

const SelectExceptionType: SelectExceptionTypeComponent = (props, ref) => {

  const { value, disabled, onChange, message, required } = props;

  const [CurrentValue, setCurrentValue] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const exceptionTypeRef = useRef<SelectRef>(null);
  const { PolicyGroup, register } = useMasterData()
  useEffect(() => {
    register('policyGroup')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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

  const changeSelect = () => {
    setCurrentValue(exceptionTypeRef.current?.getValue()?.toString())
  }

  const options = PolicyGroup?.length > 0 
    ? PolicyGroup?.map(c => ({ value: c.id.toString(), label: c.name })) : [];

  return (
    <Select
      value={CurrentValue}
      onChange={changeSelect}
      ref={exceptionTypeRef}
      options={options}
      disabled={disabled}
      message={ message }
      required={required}
      sx={{
        '& .MuiSelect-select,& .Mui-disabled': {
          '&.MuiInputBase-input': {
            bgcolor: 'var(--mscb-primary)!important',
          },
          color: '#fff',
          textTransform: 'uppercase',
          fontSize: 'var(--mscb-fontsize)',
          WebkitTextFillColor: '#fff'
        },
        '& .MuiSvgIcon-root': {
          color: '#fff!important'
        }

      }}
    />
  );
};

export default SelectExceptionType;
