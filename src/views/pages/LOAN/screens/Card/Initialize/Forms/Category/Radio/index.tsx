import {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import clsx from "clsx";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
	InputLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export type RadioPosition = "top" | "start" | "bottom" | "end";

export interface RadioValue {
  value: string;
  label?: ReactNode;
}

export interface RadioOption {
  checked?: boolean;
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
  islabelIcon?: boolean;
  labelIcon?: ReactNode;
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
    islabelIcon,
    labelIcon,
  } = props;

	const getChecked = () => {
		return options.find(o => o.checked)?.value.toString() ?? value.toString();
	}

  const [selectedValue, setSelectedValue] = useState<string>(getChecked);
  const Selected = useRef<string>(getChecked());

  useEffect(() => {
    if (selectedValue !== undefined && selectedValue !== Selected.current) {
      Selected.current = selectedValue;
      onChange && onChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

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
    <FormControl className={radioClasses} fullWidth={ fullWidth }>
			{ 
				!!label &&
				<InputLabel required={ required }>{ label }</InputLabel>
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
                  className='radioChecked'
									disabled={radio.disabled}
									checked={radio.value === selectedValue}
									{...(variant === "checkbox"
										? {
												checkedIcon: <CheckCircleIcon />,
											}
										: {})
									}
								/>
							}
              {...(islabelIcon
                ? {
                  label: <>{[index + 1, '. ', labelIcon, radio.label]}</>,
                }
                : {
                  label: <>{`${index+1} . ${radio.label}`}</>
                })
              }
              
						/>
					);
				})}
			</RadioGroup>
    </FormControl>
  );
};

export default forwardRef(RadioBase);
