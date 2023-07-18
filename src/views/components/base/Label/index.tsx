import { FC } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import clsx from 'clsx';
import FormLabel from '@mui/material/FormLabel';

export interface LabelProps{
  className?: string;
  bold?: boolean;
  required?: boolean;
  color?: string;
  sx?: SxProps<Theme>
}

const Label: FC<LabelProps> = props => {

  const { className, bold, required, children, color, sx = {} } = props;

  return <FormLabel
    sx={{
      color: color ? color : 'var(--mscb-secondary)',
      fontSize: 'var(--mscb-fontsize)',
      minHeight: '22px',
      lineHeight: '22px',
      display: 'inline-flex',
      alignItems: 'flex-start',
      '& .MuiFormLabel-asterisk': {
        color: 'transparent',
        fontSize: '3px',
        height: '22px',
        "&::after":{
          fontSize: '0.85rem',
          content: '"(*)"',
          color: 'var(--mscb-danger)'
        }
      },
      ...sx
    }} 
    required={ required }
    className={ clsx(className, { 'font-medium': bold }) }
  >{ children }</FormLabel>

}

export default Label;