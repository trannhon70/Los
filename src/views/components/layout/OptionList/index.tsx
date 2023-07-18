import { 
  forwardRef, 
  ForwardRefRenderFunction, 
  ReactNode, 
  useEffect, 
  useImperativeHandle, 
  useRef, 
  useState 
} from 'react';
import clsx from 'clsx';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { SxProps, Theme } from '@mui/system';

export interface OptionItem{
  value: string | number;
  label?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export interface OptionListRef{
  getValue(): string | number | undefined;
  setValue(value: string | number): void;
}

export interface OptionListProps{
  before?: boolean;
  center?: boolean;
  checkIcon?: ReactNode;
  checkedBg?: boolean;
  checkedIcon?: ReactNode;
  className?: string;
  disabled?: boolean;
  disableRipple?: boolean;
  maxWidth?: number;
  onChange?(current: string | number | undefined): void;
  options: OptionItem[];
  sx?: SxProps<Theme>;
  value?: string | number;
  wrap?: boolean;
}

export interface OptionListComponent extends ForwardRefRenderFunction<OptionListRef, OptionListProps>{}

const OptionList: OptionListComponent = (props, ref) => {

  const {
    before,
    center,
    checkIcon, 
    checkedBg,
    checkedIcon, 
    className, 
    disabled,
    disableRipple = true, 
    maxWidth, 
    onChange, 
    options, 
    sx = {},
    value,
    wrap = true
  } = props;

  const [ CurrentValue, setCurrentValue ] = useState<string | number | undefined>(value);
  const Current = useRef<string | number | undefined>(value);

  useEffect(() => {
    Current.current = value;
    value === CurrentValue || setCurrentValue(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);

  useEffect(() => {
    if (CurrentValue !== Current.current){
      Current.current = CurrentValue;
      onChange && onChange(CurrentValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  useImperativeHandle(ref, () => ({
    getValue(){
      return CurrentValue;
    },
    setValue(value){
      Current.current = value;
      setCurrentValue(value);
    }
  }))

  const clickedOption = (option: OptionItem) => () => {
    disabled || setCurrentValue(option.value);
  }

  return <List 
    dense 
    sx={{ 
      width: '100%', 
      maxWidth, 
      bgcolor: 'background.paper',
      '& .mscb-option-list-checked': {
        '& .MuiTypography-root': {
          color: 'var(--mscb-danger)!important',
          fontWeight: 'bold!important'
        }
      },
      ...sx
    }} 
    className={ className }
  >
    {options.map((option, index) => {
      const checked = option.value === CurrentValue;
      return <ListItem
        key={ index }
        onClick={ clickedOption(option) }
        sx={{ 
          transition: 'all ease 0.3s',
          borderBottom: '1px solid #d7d8e4',
        }}
        disablePadding
        className={ clsx({ 
          'mscb-option-list-checked': checked,
          'bg-primary': checked && checkedBg,
          'mscb-option-list-before': before
        }) }
      >
        <ListItemButton 
          sx={{ 
            px: 0, 
            py: '3px', 
            maxWidth: '100%', 
            alignItems: center ? 'center' : 'flex-start',
            justifyContent: 'space-around'
          }}
        >
          { option.prefix }
          {
            before &&
            <ListItemIcon sx={{ minWidth: '38px' }}>
              <Checkbox
                edge="start"
                checked={ checked }
                tabIndex={ -1 }
                disableRipple={ disableRipple }
                icon={ checkIcon || <RadioButtonUncheckedIcon /> }
                checkedIcon={ checkedIcon || <CheckCircleIcon /> }
                sx={{ 
                  p: 0, 
                  ml: '-2px',
                  '& svg': {
                    color: checkedBg && checked ? '#fff' : undefined,
                    transition: 'all ease 0.3s'
                  }
                }}
              />
            </ListItemIcon>
          }
          <ListItemText 
            primary={ option.label === undefined ? option.value : option.label }
            sx={{
              my: '1px',
              maxWidth: 'calc(100% - 38px)',
              ...(wrap ? {} : {
                '&>.MuiTypography-root': {
                  whiteSpace: 'nowrap',
                  overflow:'hidden',
                  textOverflow: 'ellipsis',
                }
              }),
              ...(checked ? {
                color: 'var(--mscb-primary)',
                fontWeight: 'bold'
              }: {})
            }}
          />
          { option.suffix }
          {
            before ? null :
            <ListItemIcon sx={{ minWidth: '22px', justifyContent: 'flex-end' }}>
              <Checkbox
                edge="start"
                checked={ checked }
                tabIndex={ -1 }
                disableRipple={ disableRipple }
                icon={ checkIcon || <RadioButtonUncheckedIcon /> }
                checkedIcon={ checkedIcon || <CheckCircleIcon /> }
                sx={{ 
                  p: 0, 
                  mr: '-2px',
                  '& svg': {
                    color: checkedBg && checked ? '#fff' : undefined,
                    transition: 'all ease 0.3s'
                  }
                }}
              />
            </ListItemIcon>
          }
        </ListItemButton>
      </ListItem>
    })}
  </List>;

}

export default forwardRef(OptionList);