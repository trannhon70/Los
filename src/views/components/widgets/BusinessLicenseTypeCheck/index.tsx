
import { FC, ReactNode, useEffect, useRef, useState, memo} from 'react';
import Radio, { RadioRef } from 'views/components/base/Radio';
import { Theme, SxProps } from '@mui/system';
import useMasterData from 'app/hooks/useMasterData';

export interface BusinessLicenceTypeProps{
  value?: string;
  label?: ReactNode;
  onChange?(value: string): void;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const BusinessLicenceTypeCheck: FC<BusinessLicenceTypeProps> = props => {

  const { onChange, value, label, required, sx, disabled } = props;

  const { BusinessLicenceType , register} = useMasterData();

  useEffect(() => {
    register('businessLicenceType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const checkboxRef = useRef<RadioRef>(null);
  
  useEffect(() => {
    // Current.current = value;
    // checkboxRef.current?.setValue(value ?? "");
    // setCurrentValue(value);
    // onChange && onChange(value ?? '');

    if(value !== Current.current){
      Current.current = value;
      checkboxRef.current?.setValue(value ?? "");
      setCurrentValue(value);
      onChange && onChange(value ?? '');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);

  useEffect(() => {
    if (CurrentValue !== Current.current){
      Current.current = CurrentValue;
      onChange && onChange(CurrentValue ?? '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  const changeCheckbox = () => {
    setCurrentValue(checkboxRef.current?.getValue().value)
  }

  return <Radio
    label={ label }
    ref={ checkboxRef }
    required={required}
    variant="checkbox"
    disabled={disabled}
    onChange={ changeCheckbox }
    options={BusinessLicenceType.map((item)=>({
      value:item.code,
      label:item.name,
    }))}
    value={CurrentValue}
    sx={{ flexDirection: 'column'}}
  />

}

export default memo(BusinessLicenceTypeCheck);