import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  FormControl, FormControlLabel, Radio, RadioGroup, Theme
} from "@mui/material";
import { SxProps } from "@mui/system";
import clsx from 'clsx';
import {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode, useEffect, useImperativeHandle, useRef, useState
} from "react";
import Label from "../Label";

export type RadioPosition = "top" | "start" | "bottom" | "end";

export interface RadioValue {
  value: string;
  label?: ReactNode;
}

export interface RadioOption {
  checked?: boolean | null;
  disabled?: boolean;
  label?: ReactNode;
  position?: RadioPosition;
  value: string;
}

export interface RadioProps extends Partial<RadioOption> {
  className?: string;
	fullWidth?: boolean;
  name?: string;
  onChange?(): void;
  options?: RadioOption[];
	required?: boolean;
  variant?: "radio" | "checkbox";
  row?: boolean;
  sx?: SxProps<Theme>;
  itemPosition?: 'top' | 'center';
}

export interface RadioRef {
  getValue(): RadioValue;
  setValue(value: string): void;
  // getChecked(): boolean[];
}

export interface RadioComponent
  extends ForwardRefRenderFunction<RadioRef, RadioProps> {}

const RadioBase: RadioComponent = (props, ref) => {
  const {
    className,
    disabled,
		fullWidth = true,
    label,
    name,
    onChange,
    options = [],
    position = "end",
		required,
    value = "",
    variant = "radio",
    row = true,
    sx = {},
    itemPosition = 'center'
  } = props;

	const getChecked = () => {
		return options.find(o => o.checked)?.value.toString() ?? value.toString();
	}

  const [selectedValue, setSelectedValue] = useState<string>(getChecked());
  const Selected = useRef<string>(getChecked());
  
  useEffect(() => {
    if (selectedValue !== undefined && selectedValue !== Selected.current) {
      Selected.current = selectedValue;
      onChange && onChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  useEffect(()=>{
    const cheed  =getChecked();
    setSelectedValue(cheed);
  },[options]);

  useImperativeHandle(ref, () => ({
    getValue() {
      return {
        value: selectedValue,
      };
    },
    setValue(values) {
      setSelectedValue(values);
    },
  }));

  const radioClasses = clsx("mscb-radio-base", className);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };
  
  return (
    <FormControl className={radioClasses} fullWidth={ fullWidth } sx={{ ...sx,"& .MuiFormControlLabel-label.Mui-disabled":{
      color:"var(--mscb-secondary) !important",
      fontWeight:500
    }, }}>
			{ 
				!!label &&
        <Label required={ required } bold>{ label }</Label>
			}
			<RadioGroup name={name} value={value} onChange={handleChange} row={row}>
				{options.map((radio, index) => {
          
					return (
						<FormControlLabel
							checked={selectedValue === radio.value}
							labelPlacement={position ?? "end"}
							key={index}
							value={radio.value}
							disabled={disabled}
              
							control={
								<Radio
									disabled={radio.disabled}
									checked={radio.value === selectedValue}
                  sx={{
                    ...(
                      itemPosition === 'top'
                      ? { mt: '-9px' }
                      : {}
                    )
                  }}
									{...(variant === "checkbox"
										? {
												checkedIcon: <CheckCircleIcon />,
											}
										: {})
									}
								/>
							}
							label={<>{radio.label}</>}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: 'var(--mscb-fontsize)'
                },
                ...(
                  itemPosition === 'top'
                  ? { alignItems: 'flex-start' }
                  : {}
                )
              }}
						/>
					);
				})}
			</RadioGroup>
    </FormControl>
  );
};

export default forwardRef(RadioBase);
