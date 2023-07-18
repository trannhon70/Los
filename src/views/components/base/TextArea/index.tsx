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
import clsx from "clsx";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from "@mui/material/FormControl";
import Label from "../Label";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
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
    onChange?(value: string): void;
    placeholder?: string;
    prefix?: ReactNode;
    required?: boolean;
    suffix?: ReactNode;
    value?: string;
    maxRows?: number | string;
    minRows?: number | string;
    maxlength?: number;
    labelColor?: string;
    sx?: SxProps<Theme>;
    timeout?: number;
    onDebounce?(value: string): void;
    message?: string;
}

export type TextAreaComponent = ForwardRefRenderFunction<TextAreaRef,TextAreaProps>;

const TextArea: TextAreaComponent = (props, ref) => {
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
        labelColor,
        sx = {},
        timeout = 800,
        onDebounce,
        message,
        maxlength
    } = props;

    // const classes = inputStyle();
    const [defaultValue, setDefaultValue] = useState<string | undefined>(value);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const currentValue = useRef<string | undefined>(value);
    const [ textAreaMessage, setMessage ] = useState(message);

    useEffect(() => {
        currentValue.current = value;
        setDefaultValue(value);
    }, [ value ]);

    useEffect(() => {
        message === textAreaMessage || setMessage(message);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ message ]);
    useEffect(() => {
        if (defaultValue!==undefined && defaultValue!== currentValue.current) {
            currentValue.current = defaultValue;
            if (timeout <= 0 || !onDebounce){
                onChange && onChange(defaultValue ?? '');
            }
            else{
                timer.current && clearTimeout(timer.current);
                timer.current = setTimeout(() => {
                    onDebounce && onDebounce(defaultValue ?? '');
                }, timeout);
            }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    useImperativeHandle(ref, () => ({
        getValue: () => defaultValue ?? '',
        setValue: (val) => val === defaultValue || setDefaultValue(val)
    }));

    const textAreaClass = clsx("mscb-input", className);

    const changeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDefaultValue(e.target.value??'');
    };

    return (
        <FormControl 
            className={textAreaClass} 
            fullWidth={ fullWidth }
            sx={{
                '& textarea': {
                    border: 'none',
                    backgroundColor: '#f2f3f9',
                    resize: 'none',
                    outline: 0,
                    padding: '8px 12px',
                    fontSize: 'var(--mscb-fontsize)',
                    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                    "&:disabled":{
                        color:"var(--mscb-secondary)",
                        fontWeight:500
                    }
                },
                ...sx
            }}
        >
            {!!label && (
                <Label required={ required } color={ labelColor }>{ label }</Label>
            )}

            <TextareaAutosize
                maxLength={maxlength}
                disabled={disabled}
                placeholder={placeholder}
                ref={textAreaRef}
                onChange={changeTextArea}
                value={defaultValue ?? ''}
                style={{ maxWidth: '100%', maxHeight: '250px', minHeight: '100px'}}
            />
            <FormHelperText>
                {message}
            </FormHelperText>
        </FormControl>
    );
}

export default forwardRef(TextArea);