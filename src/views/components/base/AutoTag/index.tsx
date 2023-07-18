import { FC, ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { diffArray } from 'utils';
import { AutocompleteOption } from '../Autocomplete';
import MuiAutocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import Label from '../Label';

export interface AutoTagProps{
  className?: string;
  label?: ReactNode;
  required?: boolean;
  placeholder?: string;
  message?: string;
  deleteIcon?: ReactNode;
  disabled?: boolean;
  value?: (string | number)[];
  options?: AutocompleteOption[];
  sx?: SxProps<Theme>;
  onChange?(values: (string | number)[]): void;
}

const AutoTag: FC<AutoTagProps> = props => {

  const {
    className,
    required,
    label,
    placeholder,
    message,
    deleteIcon,
    disabled,
    value = [],
    options = [],
    sx,
    onChange
  } = props;

  const [ CurrentOptions, setCurrentOptions ] = useState<AutocompleteOption[]>(options);
  const [ CurrentValue, setCurrentValue ] = useState<(string | number)[]>(value);
  const Current = useRef<(string | number)[]>(value);

  useEffect(() => {
    if (diffArray(value, CurrentValue)){
      Current.current = value;
      setCurrentValue(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);

  useEffect(() => {
    if (diffArray(CurrentValue, Current.current)){
      Current.current = CurrentValue;
      onChange && onChange(CurrentValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  useEffect(() => {
    diffArray(options, CurrentOptions) && setCurrentOptions(options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ options ]);

  const changeValue = (_: SyntheticEvent, values: AutocompleteOption[]) => {
    setCurrentValue(values.map(v => v.value));
  }

  return <MuiAutocomplete 
    multiple 
    className={ className }
    disabled={ disabled }
    value={ CurrentOptions.filter(o => CurrentValue.indexOf(o.value) > -1) }
    isOptionEqualToValue={ (opt, val) => opt?.value === val?.value }
    getOptionLabel={(option: AutocompleteOption) => option.label}
    popupIcon={ <KeyboardArrowDownIcon fontSize="small" /> }
    onChange={ changeValue }
    renderInput={param => (
      <FormControl fullWidth className="mscb-input">
        {!!label && <Label required={ required }>{ label }</Label>}
        <TextField
          { ...param }
          variant="outlined"
          placeholder={ placeholder }
          error={ Boolean(message).valueOf() }
          helperText={ message }
        />
      </FormControl>
    )}
    options={ CurrentOptions }
    ChipProps={{
      deleteIcon: <IconButton size="small">
        {
          deleteIcon !== undefined ? deleteIcon : 
          <ClearIcon 
            sx={{ 
              fontSize: '0.9rem', 
              color: 'var(--mscb-secondary)!important',
              '&:hover': {
                color: 'var(--mscb-primary)!important'
              }
            }} 
          /> 
        }
      </IconButton>,
      sx: {
        bgcolor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 0,
        height: '30px'
      }
    }}
    sx={{
      '& .MuiInputBase-root': {
        pl: '8px!important',

        '& .MuiAutocomplete-input': {
          p: '0 30px 0 8px',
        }
      },
      '& .MuiAutocomplete-endAdornment': {
        pr: '9px',

        '& .MuiAutocomplete-popupIndicator': {
          '& .Mui-disabled': {
            bgcolor: 'transparent!important'
          }
        },

        '& .MuiSvgIcon-root': {
          fontSize: '18px'
        }
      },
      ...sx
    }}
  />

}

export default AutoTag;