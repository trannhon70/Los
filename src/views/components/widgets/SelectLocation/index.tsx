import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { ILOANNormalStorageAddress } from 'types/models/loan/normal/storage/Legal';
import Grid, { GridSize } from '@mui/material/Grid';
import SelectDistrict from '../SelectDistrict';
import SelectProvince from '../SelectProvince';
import SelectWard from '../SelectWard';
import SelectCountry from '../SelectCountry';

export type SelectLocationValue = Pick<ILOANNormalStorageAddress, 'province' | 'district' | 'ward'> & { country: string };

export interface SelectLocationProps{
  before?: ReactNode;
  after?: ReactNode;
  col?: GridSize;
  value?: SelectLocationValue;
  enableCountry?: boolean;
  message?: string[];
  label?: ReactNode[];
  onChange?(value: SelectLocationValue): void;
  spacing?: number;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  required?: boolean[];
  className?: string;
  isWard?: boolean;
}

const SelectLocation: FC<SelectLocationProps> = props => {

  const {
    before,
    after,
    col = 4,
    value = {
      country: '',
      province: '',
      district: '',
      ward: '',
    },
    enableCountry,
    onChange,
    message = [],
    spacing = 3,
    label = [],
    sx,
    disabled,
    required = [],
    className,
    isWard = true
  } = props;

  const [ CurrentValue, setCurrentValue ] = useState<SelectLocationValue>(value);
  const ValueRef = useRef<SelectLocationValue>(value);

  useEffect(() => {
    ValueRef.current = value;
    if (
      value.country !== CurrentValue.country
        || value.province !== CurrentValue.province
        || value.district !== CurrentValue.district
        || value.ward !== CurrentValue.ward
    ){
      setCurrentValue(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);

  useEffect(() => {
    if (
      ValueRef.current.country !== CurrentValue.country
        || ValueRef.current.province !== CurrentValue.province
        || ValueRef.current.district !== CurrentValue.district
        || ValueRef.current.ward !== CurrentValue.ward
    ){
      ValueRef.current = CurrentValue;
      onChange && onChange(CurrentValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  const ElementBefore = useMemo(() => before, [ before ]);
  const ElementAfter = useMemo(() => after, [ after ]);

  const changeCountry = (value: string) => {
    setCurrentValue({
      country: value,
      province: '',
      district: '',
      ward: ''
    });
  }

  const changeProvince = (value: string) => {
    setCurrentValue({
      ...CurrentValue,
      province: value,
      district: '',
      ward: ''
    });
  }

  const changeDistrict = (value: string) => {
    setCurrentValue({
      ...CurrentValue,
      district: value,
      ward: ''
    });
  }

  const changeWard = (value: string) => {
    setCurrentValue({
      ...CurrentValue,
      ward: value
    });
  }

  const msgPos = enableCountry ? 1 : 0;

  return <Grid container spacing={ spacing } sx={ sx } className={ className }>
    { ElementBefore }
    {
      enableCountry &&
      <Grid item xl={ col }>
        <SelectCountry 
          label={ label[0] } 
          onChange={ changeCountry }
          value={ CurrentValue.country }
          message={ message[0] }
          required={ required[0] }
          disabled={ disabled }
        />
      </Grid>
    }
    <Grid item xl={ col }>
      <SelectProvince 
        country={ CurrentValue.country }
        label={ label[ msgPos ] } 
        onChange={ changeProvince }
        value={ CurrentValue.province }
        message={ message[ msgPos ] }
        required={ required[ msgPos ] }
        disabled={ disabled }
      />
    </Grid>
    <Grid item xl={ col }>
      <SelectDistrict 
        province={ CurrentValue.province }
        label={ label[ msgPos + 1 ] } 
        onChange={ changeDistrict }
        value={ CurrentValue.district }
        message={ message[ msgPos + 1 ] }
        required={ required[ msgPos + 1 ] } 
        disabled={ disabled }
      />
    </Grid>
    {
      isWard ? <Grid item xl={ col }>
        <SelectWard 
          district={ CurrentValue.district }
          label={ label[ msgPos + 2 ] } 
          onChange={ changeWard }
          value={ CurrentValue.ward }
          message={ message[ msgPos + 2 ] }
          required={ required[ msgPos + 2 ] } 
          disabled={ disabled }
        />
      </Grid> : null
    }
    
    { ElementAfter }
  </Grid>

}

export default SelectLocation;