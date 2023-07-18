import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete as MuiAutocomplete, FormControl, TextField } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import clsx from "clsx";
import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import Label from '../Label';
import AutocompleteMultipleStyles from "./style";

export interface  AutocompleteMultipleOption{
  label: string;
  value: string | number;
}

export interface  AutocompleteMultipleRef{
  getValue():  AutocompleteMultipleOption[];
  setValue(val: string[] | number[]): void;
}

export interface  AutocompleteMultipleProps{
  className?: string;
  disabled?: boolean;
  label?: ReactNode;
  message?: string;
  onChange?(): void;
  options?:  AutocompleteMultipleOption[];
  placeholder?: string;
  required?: boolean;
  value?: string[] | number[];
  tag?: boolean;
  sx?: SxProps<Theme>
}

const  AutocompleteMultiple: ForwardRefRenderFunction< AutocompleteMultipleRef,  AutocompleteMultipleProps> = (props, ref) => {

  const classes =  AutocompleteMultipleStyles();

  const {
    className,
    disabled,
    label,
    message,
    onChange,
    options = [],
    placeholder,
    required,
    value,
    tag,
    sx
  } = props;

  const valuesPartArrayString = value?.map(v=> v.toString());

  const OriginValue: AutocompleteMultipleOption[] = options.filter(o => valuesPartArrayString?.includes(o.value.toString()) ?? undefined) ;

  const [ CurrentValue, setCurrentValue ] = useState<AutocompleteMultipleOption[]>(OriginValue);
  const SelectedValue = useRef<AutocompleteMultipleOption[] | []>(OriginValue);
  useEffect(() => {
    if (!onChange || CurrentValue === undefined) return;

    if (!CurrentValue){
      if (SelectedValue.current){
        SelectedValue.current = CurrentValue;
        onChange();
      }
      return;
    }

    if (!SelectedValue.current || CurrentValue.filter(c => SelectedValue.current.map(s=> s.value).includes(c.value))){
      SelectedValue.current = CurrentValue;
      onChange();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  useImperativeHandle(ref, () => ({
    getValue: () => CurrentValue,
    setValue: val => {
      const partArrayString = val?.map(v=> v.toString()) ?? [];
      const OriginValue: AutocompleteMultipleOption[] = options.filter(o => partArrayString?.includes(o.value.toString()) ?? []);

      SelectedValue.current = OriginValue;
      setCurrentValue(OriginValue);
    }
  }))

  // useEffect(() => {
  //   // CurrentValue = value;
  //   setCurrentValue(OriginValue);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[]);

  const handleChanges = (e: SyntheticEvent, selected:AutocompleteMultipleOption[] | AutocompleteMultipleOption | null) => {
    if(selected){
      if (Array.isArray(selected)){
        setCurrentValue(selected)
      }
      else{
        setCurrentValue([selected])
      }
    }
  }
  return <MuiAutocomplete
    sx={sx}
    className={clsx(classes.root, className, { 'MuiAutocomplete-tag tag': !!tag })}
    multiple={ tag }
    disabled={ disabled }
    options={ options }
    getOptionLabel={(option: AutocompleteMultipleOption | AutocompleteMultipleOption[]) => {
        let defaultValue: string
        if (Array.isArray(option)){
          defaultValue = option[0]?.label ?? ""
        }else{
          defaultValue = option.label
        }
        return defaultValue
      }
    }
    onChange={ handleChanges }
    value={OriginValue.length === 0 ? (tag ? [] : null) : OriginValue}
    // value={CurrentValue.length === 0 ? (tag ? [] : null) : CurrentValue}
    isOptionEqualToValue={ (opt, val) =>  {
      let defaultValue;
      if (Array.isArray(val)){
        defaultValue = opt?.value === val[0]?.value
      }else{
        defaultValue = opt?.value === val.value
      }
      return defaultValue;
    }}
    popupIcon={ <KeyboardArrowDownIcon fontSize="small" /> }
    renderInput={param => (
      <FormControl fullWidth className="mscb-input">
        {label ? <Label required={ required }>{ label }</Label> : ""}
        <TextField
          { ...param }
          variant="outlined"
          placeholder={ placeholder }
          error={ Boolean(message).valueOf() }
          helperText={ message }
        />
      </FormControl>
    )}
  />
}

export default forwardRef(AutocompleteMultiple);
