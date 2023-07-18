import {
    ChangeEvent,
    forwardRef,
    ForwardRefRenderFunction,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import clsx from "clsx";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";

export interface TextAreaRef {
    getValue(): string;
    setValue(value: string): void;
}

export interface TextAreaProps {
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    label?: ReactNode;
    onChange?(): void;
    placeholder?: string;
    prefix?: ReactNode;
    required?: boolean;
    suffix?: ReactNode;
    value?: string;
    maxRows?: number | string;
    minRows?: number | string;
    message?: string;
}

export type TextAreaComponent = ForwardRefRenderFunction<
    TextAreaRef,
    TextAreaProps
>;

const TextInputComment: TextAreaComponent = (props, ref) => {
    // const classes = inputStyle()

    const {
        className,
        fullWidth = true,
        value,
        disabled,
        label,
        onChange,
        placeholder,
        required,
        message,
    } = props;

    // const classes = inputStyle();
    const [defaultValue, setDefaultValue] = useState<string>(value ?? "");

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const currentValue = useRef(value);

    useEffect(() => {
        if (defaultValue !== currentValue.current) {
            currentValue.current = defaultValue;
            onChange && onChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    useImperativeHandle(ref, () => ({
        getValue: () => defaultValue,
        setValue: (val) => val === defaultValue || setDefaultValue(val),
    }));

    const textAreaClass = clsx("mscb-input", className);

    const changeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDefaultValue(e.target.value);
    };

    return (
        <FormControl className={textAreaClass} fullWidth={fullWidth}>
            {!!label && (
                <InputLabel shrink required={required}>
                    {label}
                </InputLabel>
            )}

            <TextareaAutosize
                disabled={disabled}
                placeholder={placeholder}
                ref={textAreaRef}
                onChange={changeTextArea}
                value={defaultValue}
                style={{
                    maxWidth: "100%",
                    maxHeight: "250px",
                    minHeight: "100px",
                    marginBottom: "30px",
                }}
            />
            <FormHelperText>{message}</FormHelperText>
        </FormControl>
    );
};

export default forwardRef(TextInputComment);
