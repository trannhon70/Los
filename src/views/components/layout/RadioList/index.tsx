import { Checkbox, List, ListItem, ListItemButton, ListItemText, RadioGroup } from '@mui/material';
import { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import listStyle from './style';
import clsx from 'clsx';

export interface RadioListItem{
  value: string | number;
  label?: ReactNode;
}

export interface RadioListRef{
  getChecked(): RadioListItem | undefined;
}

export interface RadioListProps{
  className?: string;
  value?: string | number;
  items?: RadioListItem[];
  onChange?(): void;
  name: string;
  disabled?: boolean;
}

const RadioList: ForwardRefRenderFunction<RadioListRef, RadioListProps> = (props, ref) => {

  const classes = listStyle();

  const { className, onChange, items = [], value, name, disabled } = props;
  const [ CurrentValue, setCurrentValue ] = useState<string | number>(value ?? '');
  const Value = useRef<string | number>(value ?? '');

  useEffect(() => {
    value !== undefined && value !== CurrentValue && setCurrentValue(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);

  useEffect(() => {
    if (CurrentValue !== undefined && CurrentValue !== Value.current){
      Value.current = CurrentValue;
      onChange && onChange();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentValue ]);

  useImperativeHandle(ref, () => ({
    getChecked: () => items.find(i => i.value === CurrentValue)
  }));

  const handleToggle = (item: RadioListItem) => () => {
    disabled || setCurrentValue(item.value);
  };

  return <RadioGroup name={ name } className={ clsx(classes.root, className) }>
    <List>

      {items.map((item, index) => {
        return <ListItem
          key={index}
          disablePadding
          className={ clsx({ active: item.value === CurrentValue }) }
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={ handleToggle(item) }
              checked={ item.value === CurrentValue }
              icon={ <></> }
              checkedIcon={ <CheckIcon /> }
            />
          }
        >
          <ListItemButton role={undefined} onClick={ handleToggle(item) } dense>
            <ListItemText id={ name+index } primary={ item.label } />
          </ListItemButton>
        </ListItem>
      })}
    
    </List>
  </RadioGroup>

}

export default forwardRef(RadioList);