import { FormControl, InputLabel } from '@mui/material';
import useBackdrop from 'app/hooks/useBackdrop';
import clsx from 'clsx';
import { fetchLOANNormalFormsData, setActiveTemplateFile } from 'features/loan/normal/storage/forms/actions';
import { IQueryParamsFormData } from 'features/loan/normal/storage/forms/api';
import { getLOANNormalActiveTemplateFile } from 'features/loan/normal/storage/forms/selectors';
import { getLOANNormalLOSuuid } from 'features/loan/normal/storage/selectors';
import { ChangeEvent, forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

export type RadioPosition = "top" | "start" | "bottom" | "end";
export interface RadioValue {
  value: string;
  label?: ReactNode;
}
export interface RadioOption {
  checked?: boolean;
  key: string;
  disabled?: boolean;
  label?: ReactNode;
  position?: RadioPosition;
  value: string;
  version: number | null,
  template_uuid: string,
  actived_flag: boolean,
  approved_flag: boolean
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
}
export interface RadioComponent extends ForwardRefRenderFunction<RadioRef, RadioProps> { }

const RadioBase: RadioComponent = (props, ref) => {
  const {
    className,
    fullWidth = true,
    label,
    onChange,
    options = [],
    required,
    value = "",
    labelIcon,
  } = props;

  const activeFile = useSelector(getLOANNormalActiveTemplateFile)
  // const getChecked = () => {
  //   return options.find(o => o.checked)?.value.toString() ?? value.toString();
  // }

  // const [selectedValue, setSelectedValue] = useState<string>(getChecked);
  // const Selected = useRef<string>(getChecked());
  
  const dispatch = useDispatch()
  const los_uuid = useSelector(getLOANNormalLOSuuid)
  const { showBackdrop } = useBackdrop()

  // useEffect(() => {
  //   if (selectedValue !== undefined && selectedValue !== Selected.current) {
  //     Selected.current = selectedValue;
  //     onChange && onChange();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedValue]);

  // useImperativeHandle(ref, () => ({
  //   getValue() {
  //     return {
  //       value: selectedValue,
  //     };
  //   },
  //   setValue(values) {
  //     setSelectedValue(values);
  //   },
  // }));

  const radioClasses = clsx("mscb-radio-base", className);

  const handleSelect = ( 
    value: string,
    key: string,
    flag: boolean | undefined,
    version: number | null,
    template_uuid: string,
    actived_flag: boolean,
    approved_flag: boolean
      ) => {
    if (!flag) {
      dispatch(setActiveTemplateFile(key as string))
      dispatch(fetchLOANNormalFormsData({
        los_uuid: los_uuid,
        template_type: value,
        fill_data_history_id: version,
        template_uuid,
        actived_flag,
        approved_flag
      } as IQueryParamsFormData));
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setSelectedValue(e.target.value);
  };

  const handleCheckbox = (value:string) =>{
   
  }

  return (
    <FormControl className={radioClasses}  fullWidth={fullWidth}>
      {
        !!label &&
        <InputLabel required={required}>{label}</InputLabel>
      }
        {options.map((radio, index) => {
          return (
            <div key={radio.key} className='label-checkbox'>
            <label style={{flexGrow:'1', display:'flex'}} onClick={() => 
              handleSelect(
                radio.value, 
                radio.key, 
                radio.disabled, 
                radio.version, 
                radio.template_uuid, 
                radio.actived_flag, 
                radio.approved_flag)}>
               {index + 1}.
              <div style={activeFile === radio.key ? { color: "var(--mscb-primary)", fontWeight: 500 , display: 'flex', flexGrow:'1' } 
                                                : {color: "var(--mscb-secondary)", fontWeight: 400 , display: 'flex',flexGrow:'1'}}>
              <div>{labelIcon}</div>
              <div >{radio.label}</div>
              </div> 
              <div style={{display: 'flex', alignItems:'center', padding: '10px'}}>
              {radio.disabled ? <IoClose fontSize={25} fontWeight={500} color={"var(--mscb-danger)"} />:<BsCheckLg color="var(--mscb-success)" />}
                </div>
            </label>
            <input 
              type="checkbox" 
              disabled={radio.disabled} 
              onClick={()=>handleCheckbox(radio.key)} 
              name={index.toString()} 
              value={radio.value}/><br/>
            </div>
          );
        })}
    </FormControl>
  )
}
export default forwardRef(RadioBase);