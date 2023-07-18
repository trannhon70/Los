import { Typography } from '@mui/material';
import { FC } from 'react';

const TitleSquare: FC<{ className?: string }> = ({ children, className }) => {

  return <Typography 
    variant="h5" 
    component="h5" 
    className={ className }
    sx={{
      fontSize: 'var(--mscb-fontsize)',
      fontWeight: 500,
      color: 'var(--mscb-primary)',
      textTransform: 'uppercase',
      pl: '13px',
      position: 'relative',

      '&::after': {
        content: '""',
        position: 'absolute',
        width: '7px',
        height: '7px',
        bgcolor: 'var(--mscb-primary)',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)'
      }
    }}
  >
    { children }
  </Typography>

}

export default TitleSquare;