import { FunctionComponent, memo, ReactNode } from 'react';
import { SxProps, Theme } from "@mui/system";
import { Box, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FaCalendarAlt } from 'react-icons/fa';
import { SxBaseApp } from 'types/app';
import { formatNumber } from 'utils';

export type TLabelViewType =
  | "text"
  | "selector"
  | "date"

export interface ILabelView{
  value?: string;
  label?: string;
  format?: boolean;
  sx?: SxProps<Theme>;
  className?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  type?: TLabelViewType;
  icon?: ReactNode;
  isClickIcon?: boolean;
  onClickIcon?: () => void;
}

const LabelViewStyle: SxBaseApp = {
  "& .label-view-value":{
    height: '36px!important',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
  }
}

const LabelView: FunctionComponent<ILabelView> = (props) => {

  const {
    sx,
    value = "", 
    label = "", 
    format, 
    placeholder = "",
    type = "text",
    icon,
    isClickIcon = false,
    required = false, 
    disabled = false,
    onClickIcon
  } = props;

  const handleClickIcon = () => {
    onClickIcon && onClickIcon()
  }

  const generateIcon = () => {
    if (type === "selector"){
      return (
        <span className="label-view-icon text-10 text-primary flex-center">
          <KeyboardArrowDownIcon />
        </span>
      )
    }
    else if (type === "date"){
      return (
        <span className="label-view-icon text-16 text-primary flex-center">
          <FaCalendarAlt />
        </span>
      )
    }
    else{
      if(icon){
        return isClickIcon ? <IconButton onClick={handleClickIcon} className="label-view-icon-click">{icon}</IconButton> : icon
      }
      else{
        return null
      }
    }
  }

  const generateValue = () => {
    if(value && value.length > 0){
      return format ? formatNumber(value) : value
    }
    else{
      if(type === "date"){
        return "dd/mm/yyyy"
      }
      return placeholder
    }
  }

  return(
    
    <Box className='flex-column w-full label-view' sx={{...LabelViewStyle, ...sx}}>
      {console.log("render ", value)}
      <Box className='w-full mb-2'>
        {
          label || label.length > 0 ?
            <span className='font-medium text-secondary mb-2 text-14 label-view-name'>
              { label }
            </span>
            :
            null
        }

        {
          required ? 
            <span className='text-14 text-danger label-view-required font-medium'>
              &nbsp;(*)
            </span>
            :
            null
        }
        
      </Box>

      <span 
        className={`
          label-view-value text-14 pl-3 pr-3 pt-2 pb-2 w-full flex items-center overflow-ellipsis
          ${value.length === 0 && placeholder.length === 0 && type !== "date" ? "justify-end" : "justify-between"}
          ${!value && "text-placeholder"}
          ${disabled ? "bg-input-disabled" : "bg-input"} 
        `}
      > 
        <span className="ellipsis">{ generateValue() }</span>
        { generateIcon() }
      </span>
    </Box>
  )
}

export default memo(LabelView);