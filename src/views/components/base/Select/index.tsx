import {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { SxProps, Theme } from '@mui/system';
import { diffArray } from 'utils';
import clsx from 'clsx';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Label from '../Label';
import { SxSelectDisabled } from 'views/pages/LOAN/screens/Normal/Initialize/Legal/style';

export interface SelectOption{
  value: string | number;
  label?: ReactNode;
  disabled?: boolean;
  isGroup?: boolean;
  display_order?:number
}

export interface SelectRef{
  getValue(): string | number;
  setValue(value: string | number): void;
  setOptions(options: SelectOption[]): void;
  setMessage(msg: string): void;
}

export interface SelectProps{
  className?: string;
  colorLabel?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: ReactNode;
  message?: string;
  onChange?(value: string | number): void;
  handleValidValueBeforeOnChange?:(value: string | number)=> boolean;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  multiple?:boolean;
  sx?: SxProps<Theme>;
  displayEmptyLabel?: string
}

export interface SelectComponent extends ForwardRefRenderFunction<SelectRef, SelectProps>{}

const Select: SelectComponent = (props, ref) => {

  const {
    className,
    colorLabel,
    disabled,
    fullWidth = true,
    label,
    message,
    onChange,
    handleValidValueBeforeOnChange=()=>true,
    options,
    placeholder,
    required,
    value = '',
    multiple,
    displayEmptyLabel,
    sx,
  } = props;

  const [ SelectOptions, setSelectOptions ] = useState<SelectOption[]>(options);
  const [ SelectedValue, setSelectedValue ] = useState<string | number>(value);
  const [ SelectMessage, setSelectMessage ] = useState<string>(message ?? '');
  const Selected = useRef<string | number>(value);

  useEffect(() => {
    Selected.current = value;
    setSelectedValue(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);

  useEffect(() => {
    diffArray(SelectOptions, options) && setSelectOptions(options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ options ]);

  useEffect(() => {
    if (SelectedValue !== undefined && SelectedValue !== Selected.current){
      Selected.current = SelectedValue;
      onChange && onChange(SelectedValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ SelectedValue ]);

  useEffect(() => {
    setSelectMessage(message ?? '');
  }, [ message ]);

  useImperativeHandle(ref, () => ({
    getValue(){
      return SelectedValue;
    },
    setValue(val){
      setSelectedValue(val);
    },
    setOptions(opts){
      setSelectOptions(opts);
    },
    setMessage(msg){
      setSelectMessage(msg);
    }
  }));

  const error = Boolean(SelectMessage).valueOf();
  const selectClass = clsx('mscb-input', className);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!handleValidValueBeforeOnChange(e.target.value)) return;
    setSelectedValue(e.target.value);
  }

  const existValue = SelectOptions?.find(o => o.value === SelectedValue);

  return (
    <FormControl className={selectClass} fullWidth={ fullWidth } sx={{
      '& .MuiSelect-select': {
        pr: '30px!important'
      },
      '& .MuiSelect-icon': {
        mr: '9px',
      },
      ...sx
    }}>
      {!!label && <Label required={ required } color={ colorLabel } className="ellipsis">{ label }</Label>}
      <TextField
        error={ error }
        select
        value={ existValue ? SelectedValue : '' }
        onChange={ handleChange }
        helperText={ SelectMessage }
        className={clsx({ error })}
        variant="standard"
        disabled={ disabled }
        
        SelectProps={{
          IconComponent: KeyboardArrowDownIcon,
          multiple: multiple,
          displayEmpty: !!displayEmptyLabel,
        }}
        sx={disabled === true ? SxSelectDisabled : sx}
      >
        {
          !!displayEmptyLabel && <MenuItem sx={{fontSize:"14px"}} disabled value="" key="-2">
            { displayEmptyLabel }
          </MenuItem>
        }
        {
          !!placeholder &&
          <MenuItem sx={{fontSize:"14px"}} disabled value="" key="-1">
            <em>{ placeholder }</em>
          </MenuItem>
        }
        {SelectOptions?.map((option) => {
          if (option.isGroup){
            return <ListSubheader key={ option.value }>
              { option.label ?? option.value }
            </ListSubheader>
          }

          return <MenuItem sx={{}} key={option.value} value={option.value} selected={ option.value === SelectedValue } disabled={option.disabled} className={clsx(className,'text-14 text-normal')}>
            { option.label ?? option.value }
          </MenuItem>
        })}
      </TextField>

    </FormControl>
  );

}

export default forwardRef(Select);  