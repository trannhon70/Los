import { FC, useEffect, useRef, useState } from 'react';
import Checkbox, { CheckboxOption, CheckboxRef } from 'views/components/base/Checkbox';
import useMasterData from 'app/hooks/useMasterData';

const NoUse = [
  'BORROWER'
];

export interface DeclareCheckProps{
  value?: string[];
  onChange?(value: string[]): void;
  disabled?: boolean;
}

const checkArray = (arr1: string[], arr2: string[]) => {
  const o1 = arr2.filter(v => arr1.indexOf(v) === -1);
  const o2 = arr1.filter(v => arr2.indexOf(v) === -1);

  return !!o1.length || !!o2.length
}

const DeclareCheck: FC<DeclareCheckProps> = props => {

  const { onChange, value = [], disabled } = props;
  const {register, PersonalRep} = useMasterData()
  // register("personalRep", "Loan")

  const [ CurrentValue, setCurrentValue ] = useState<string[]>(value);
  const Current = useRef<string[]>(value);
  const checkboxRef = useRef<CheckboxRef>(null);

  useEffect(()=>{
    register("personalRep", "Loan")
  })
  useEffect(() => {
    if(value.length > 0) {
      Current.current = value;
      setCurrentValue(value);
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);


  useEffect(() => {
    if (checkArray(CurrentValue, Current.current)){
      Current.current = [ ...CurrentValue ];
      onChange && onChange(CurrentValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  const changeCheckbox = () => {
    setCurrentValue(
      checkboxRef.current?.getValue()
        .filter(t => t.checked)
        .map(t => t.value.toString()) 
      ?? []
    )
  }

  const options: CheckboxOption[] = PersonalRep
    .filter(p => NoUse?.indexOf(p.id) === -1 || p.is_default !== 'Y')
    .map((p,i) => {
      return  { 
        value: p.id, 
        label: p.name, 
        checked: CurrentValue?.indexOf(p.code) > -1 ,
        disabled: p.code === "RELATED" ? true : disabled ? true : false
      }
    })


  return <Checkbox
    label="2. Những đối tượng khai báo thông tin"
    ref={ checkboxRef }
    onChange={ changeCheckbox }
    options={ options }
    sx={{ 
      flexDirection: 'column',
      color: "var(--mscb-disable)" ,
      "& .MuiFormControlLabel-label.Mui-disabled":{
        color: "var(--mscb-disable) !important" 
      }
      
    }}
  />

}

export default DeclareCheck;