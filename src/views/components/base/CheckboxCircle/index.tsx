import { CircleOutlined } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import clsx from "clsx";
import {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import Label from "../Label";

export type CheckboxVariant = 'primary' | 'secondary';
export type CheckboxPosition = 'top' | 'start' | 'bottom' | 'end';

export interface CheckboxValue{
  value: string | number;
  checked: boolean;
}

export interface CheckboxOption {
  checked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  position?: CheckboxPosition;
  value: string | number;
  variant?: CheckboxVariant;
  inputLable?:ReactNode;
}

export interface CheckboxProps extends Partial<CheckboxOption>{
  children?: ReactNode;
  className?: string;
  name?: string;
  onChange?(): void;
  options?: CheckboxOption[];
  required?: boolean;
  sx?: SxProps<Theme>;
  onChecked?:(checked:boolean)=>void;
  isIndeterminate?:boolean;
}

export interface CheckboxRef {
  getValue(): CheckboxValue[];
  setValue(value: (string | number | null)[]): void;
  getChecked(): boolean[];
  setCheckbox(options: CheckboxOption[]): void;
}

export interface CheckboxComponent
  extends ForwardRefRenderFunction<CheckboxRef, CheckboxProps> {}

const Checkbox: CheckboxComponent = (props, ref) => {

  const {
    checked,
    children,
    className,
    disabled,
    label,
    name,
    onChange,
    options = [],
    position = 'end',
    value = '',
    variant = 'primary',
    required = false,
    sx = {},
    inputLable,
    isIndeterminate=false,
    onChecked=()=>undefined,
  } = props;

  const getChecked = (opts: CheckboxOption[]) => opts.map(o => !!o.checked);
  const fixedOptions = () => {
    if(options.length) {
      return options;
    }
    return [{
      checked,
      disabled,
      label: label ?? children,
      position,
      value,
      variant
    }];
  }

  const [ CheckboxOptions, setCheckboxOptions ] = useState<CheckboxOption[]>(() => {
    return fixedOptions();
  });

  const [ CurrentChecked, setCurrentChecked ] = useState<boolean[]>(getChecked(fixedOptions()));
  const Checked = useRef<boolean[]>(getChecked(fixedOptions()));

  useEffect(() => {
    CheckboxOptions === undefined || setCurrentChecked(getChecked(CheckboxOptions));
  }, [ CheckboxOptions ]);

  useEffect(() => {
    const newOptions = fixedOptions();
    if(JSON.stringify(newOptions) !== JSON.stringify(CheckboxOptions)) {
      setCheckboxOptions(newOptions);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  useEffect(() => {
    if (CurrentChecked !== undefined && CurrentChecked.length){
      const changed = CurrentChecked.map((current, index) => {
        return Checked.current[index] === current;
      })

      if (changed.indexOf(false) > -1){
        Checked.current = [ ...CurrentChecked ];
        onChange && onChange();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentChecked ]);

  useImperativeHandle(ref, () => ({
    getValue(){
      return CheckboxOptions.map((option, index) => {
        return {
          value: option.value,
          checked: !!CurrentChecked[index]
        }
      })
    },
    setValue(values){
      let changed = false;

      const newOptions = CheckboxOptions.map((option, index) => {
        if (!values[index] || values[index] === null) return option;
        changed = true;
        return { ...option, value: values[index] } as CheckboxOption;
      });

      changed && setCheckboxOptions(newOptions);
    },
    getChecked(){
      return CurrentChecked;
    },
    setCheckbox(opts){
      setCheckboxOptions(opts);
    }
  }));

  const checkboxClass = clsx(className);

  const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>,checked:boolean) => {
    setCurrentChecked(
      CurrentChecked.map(
        (current, pos) => pos === index ? e.target.checked : current
      )
    );
    onChecked(checked);
  }

  return <FormGroup row className={ checkboxClass } sx={{
    '& .MuiTypography-root': {
      fontSize: 'var(--mscb-fontsize)',
    },
    ...sx 
  }}>
    {
      !!label &&
      <Label required={ required } className="font-medium">{ label }</Label>
    }
    <Box>
      {
        CheckboxOptions.map((option, index) => {
          if (!option.label){
            return <MuiCheckbox
              key={ index }
              checked={ CurrentChecked[index] }
              onChange={ handleChange(index) }
              color={ option.variant }
              disabled={ option.disabled }
              value={ option.value }
              name={ name }
              sx={{ 
                fontSize: 'var(--mscb-fontsize)',
                '& .MuiTypography-root': {
                  fontSize: 'var(--mscb-fontsize)',
                }  
              }}
            />
          }

          return <FormControlLabel
            disabled={disabled}
            key={ index }
            label={ <>{option.label}</> }
            labelPlacement={ option.position ?? 'end' }
            control={
            <MuiCheckbox
              checked={ CurrentChecked[index] ?? false }
              onChange={ handleChange(index) }
              color={ option.variant ?? 'primary' }
              disabled={ option.disabled }
              value={ option.value }
              name={ name }
              indeterminate={!checked&&isIndeterminate}
              icon={<CircleOutlined />}
              checkedIcon={<CheckCircleIcon />}
              sx={{
                fontSize: 'var(--mscb-fontsize)',
                '& .MuiTypography-root': {
                  fontSize: 'var(--mscb-fontsize)',
                }
              }}
            />}
          />
        })
      }
    </Box>
  </FormGroup>
};

export default forwardRef(Checkbox);
