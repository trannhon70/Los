import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete as MuiAutocomplete, FormControl, TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
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
import { diffArray } from 'utils';
import { SxAutoCompleteDisabled } from 'views/pages/LOAN/screens/Normal/Initialize/Legal/style';
import Label from '../Label';
import AutocompleteStyles from "./style";

export interface AutocompleteOption{
  value: string | number;
  label: string;
  group: string
}

export interface AutocompleteRef{
  getValue(): AutocompleteOption | null;
  setValue(val: string | number): void;
}

export interface AutocompleteProps{
  className?: string;
  disabled?: boolean;
  label?: ReactNode;
  message?: string;
  onChange?(value: string | number): void;
  options?: AutocompleteOption[];
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  isTooltip?: boolean;
  sx?: SxProps<Theme>;
}

const Autocomplate: ForwardRefRenderFunction<AutocompleteRef, AutocompleteProps> = (props, ref) => {

  const classes = AutocompleteStyles();

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
    sx,
    isTooltip = false
  } = props;

  const [ Options, setOptions ] = useState<AutocompleteOption[]>(options);
  const [ CurrentValue, setCurrentValue ] = useState<string | number | undefined>(value);
  const Current = useRef<string | number | undefined>(value);

  useEffect(() => {
    Current.current = value;
    setCurrentValue(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);

  useEffect(() => {
    if (CurrentValue !== Current.current){
      Current.current = CurrentValue;
      onChange && onChange(CurrentValue ?? '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  useEffect(() => {
    diffArray(options, Options) && setOptions(options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ options ]);

  useImperativeHandle(ref, () => ({
    getValue: () => Options.find(o => o.value === CurrentValue) ?? null,
    setValue: val => {
      setCurrentValue(val);
    }
  }))

  const handleChange = (e: SyntheticEvent, selected: AutocompleteOption | null) => {
    setCurrentValue(selected?.value);
  }

  const clickClear = () => {
    setCurrentValue('');
  }

  const BaseTooltip = withStyles({
    tooltip: {
      fontSize: "12px !important",
      border: 'unset !important',
      color: "var(--mscb-secondary) !important",
      backgroundColor: "var(--mscb-white) !important",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2) !important",
      fontFamily: 'Roboto, Helvetica, Arial,sans-serif !important'
    },
    arrow: {
      fontSize: "20px !important",
      color: "var(--mscb-white) !important",
      fontFamily: 'Roboto, Helvetica, Arial,sans-serif !important'
    }
  })(Tooltip);

  return <MuiAutocomplete 
    className={clsx(classes.root, className,classes.autoCustom)}
    disabled={ disabled }
    options={ Options }
    getOptionLabel={(option: AutocompleteOption) => option.label}
    onChange={ handleChange }
    value={ Options.find(o => o.value === CurrentValue) ?? null }
    groupBy={(option) => option.group}
    isOptionEqualToValue={ (opt, val) => opt?.value === val?.value }
    popupIcon={ <KeyboardArrowDownIcon fontSize="small" /> }
    classes={{
      groupLabel: classes.groupLabel
    }}
    // sx={{
    //     "& .MuiAutocomplete-option":{
    //       fontSize:"10px !important"
    //     },
    //   '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
    //     padding: '0 30px 0 12px',
    //     textOverflow: 'ellipsis',
    //     whiteSpace: 'nowrap',
    //     overflow: 'hidden'
    //   },
    //   '& .MuiAutocomplete-endAdornment': {
    //     pr: '9px',
    //     top: 'unset !important',

    //     '& .MuiAutocomplete-popupIndicator': {
    //       '& .Mui-disabled': {
    //         bgcolor: 'transparent!important'
    //       }

    //     },

    //     '& .MuiSvgIcon-root': {
    //       fontSize: '18px'
    //     }
    //   },
    //   '& .MuiAutocomplete-clearIndicator': {
    //     bgcolor: '#f2f3f9',
    //     '&:hover': {
    //       bgcolor: '#f2f3f9',
    //     }
    //   },
    //   ...sx
    // }}
    sx={disabled === true ? SxAutoCompleteDisabled : {
          "& .MuiAutocomplete-option":{
            fontSize:"10px !important"
          },
        '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
          padding: '0 30px 0 12px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        },
        '& .MuiAutocomplete-endAdornment': {
          pr: '9px',
          top: 'unset !important',
          '& .MuiAutocomplete-popupIndicator': {
            '& .Mui-disabled': {
              bgcolor: 'transparent!important'
            }
          },
          '& .MuiSvgIcon-root': {
            fontSize: '18px'
          }
        },
        '& .MuiAutocomplete-clearIndicator': {
          bgcolor: '#f2f3f9',
          '&:hover': {
            bgcolor: '#f2f3f9',
          }
        },
        ...sx
      }}
    renderInput={param => (
      <FormControl fullWidth className="mscb-input">
        {!!label && <Label required={ required }>{ label }</Label>}
        {
          isTooltip ? 
            <BaseTooltip 
              title={Options.find(o => o.value === CurrentValue)?.label ?? ""} 
              arrow
            >
              <TextField
                { ...param }
                variant="outlined"
                placeholder={ placeholder }
                error={ Boolean(message).valueOf() }
                helperText={ message }
              />  
            </BaseTooltip>
            : 
            <TextField
              { ...param }
              variant="outlined"
              placeholder={ placeholder }
              error={ Boolean(message).valueOf() }
              helperText={ message }
            />
        }
        
      </FormControl>
      
    )}
    renderOption={(props, option) => (
      <li {...props}><Typography sx={{fontSize:"14px", color:"var"}}>{option.label}</Typography></li>
    )}
    componentsProps={{
      clearIndicator: {
        onClick: clickClear
      }
    }}
  />

}

export default forwardRef(Autocomplate);