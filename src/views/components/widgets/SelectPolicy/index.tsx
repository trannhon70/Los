import { getLOANNormalConfigMetadataConstant } from "features/loan/normal/configs/metadata/selector";
import {
  FC, useEffect, useRef,
  useState
} from "react";
import { useSelector } from "react-redux";
import { METADATA_CONSTANT } from "utils/constants";
import Select from "views/components/base/Select";

export interface SelectPolicyDetailProps {
  code: number | null;
  value?: number;
  disabled?: boolean;
  onChange?(value: number): void;
  label?: string;
  message?: string;
  required?:boolean;
}


const SelectPolicy: FC<SelectPolicyDetailProps> = props=> {

  const { code, value, disabled, onChange, label, message, required } = props;

  const metadataConstant = useSelector(getLOANNormalConfigMetadataConstant)

  const [CurrentValue, setCurrentValue] = useState<number | undefined>(value);
  const Current = useRef<number | undefined>(value);
  
  useEffect(() => {
    Current.current = value;
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    CurrentValue !== Current.current
      && !disabled
      && onChange
      && onChange(CurrentValue ?? -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentValue]);

  const changeSelect = (value: number) => {
    setCurrentValue(value)
  }

  const options = metadataConstant.data[METADATA_CONSTANT.CONST_POLICY_GROUP_DETAIL]?.filter(e => e.policy_group_id === code)?.map(c => ({ value: Number(c.id), label: c.name })) ?? [];

  return (
    <Select
      value={CurrentValue}
      onChange={changeSelect}
      options={options}
      disabled={disabled}
      label={label}
      message={message}
      required={required}
    />
  );
};

export default SelectPolicy;
