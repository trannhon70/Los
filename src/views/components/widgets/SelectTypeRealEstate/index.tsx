import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Theme, SxProps } from '@mui/system';
import Select, { SelectOption } from 'views/components/base/Select';
import useMasterData from 'app/hooks/useMasterData';
import { ITypeRealEstate } from 'types/models/master-data/state';
import _ from "lodash"
export interface ISelectTypeRealEstateProps{
  label?: ReactNode;
  required?: boolean;
  message?: string;
  value?: string;
  onChange?(value: string) : void;
  disabled?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}

const SelectTypeRealEstate: FC<ISelectTypeRealEstateProps> = props => {
  
  const { label, required, message, value, onChange, disabled, className, sx } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | undefined>(value);
  const Current = useRef<string | undefined>(value);
  const { TypeRealEstate, register } = useMasterData();
  
  useEffect(() => {
    register('typeRealEstate')
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

  const generateOptions = (data: ITypeRealEstate[], dept = 0): SelectOption[] => {
    let rs: SelectOption[] = [];
    
    data.forEach(item => {
      if(item.list.length) {
        rs.push(...item.list.map(e => ({
          label: e.real_estate_name,
          value: e.real_estate_code,
          display_order: e.display_order
        })))
      }
      // rs.push({
      //   label: item.type_real_estate_name,
      //   value: item.type_real_estate_id,
      //   isGroup: dept === 0 ? false : true,
      //   disabled: true
      // });


      // if (item.list?.length) {
      //   item.list.map(l => {
      //     rs.push({
      //       label: l.real_estate_name,
      //       value: l.real_estate_code,
      //     })
      //     return null;
      //   }, dept + 1)
       
      // }

      // return null;
    });

    return rs;
  }
  // console.log(generateOptions(TypeRealEstate),'generateOptions(TypeRealEstate)')
  return <Select
    className={className}
    label={ label }
    required={ required }
    message={ message }
    value={ CurrentValue }
    options={ _.sortBy(generateOptions(TypeRealEstate),'display_order')} 
    onChange={ changeSelect }
    sx={sx}
    disabled={ disabled }
    displayEmptyLabel="--- Chọn loại BĐS ---"
  />

}

export default SelectTypeRealEstate;