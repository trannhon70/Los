import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import outsideStyle from './style';
import { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/system';

export interface CardOutsideProps{
  className?: string;
   extra?: ReactNode;
  extraClass?: string;
  id?: string;
  label?: ReactNode;
  sx?: SxProps<Theme>
}

const CardOutside: FC<CardOutsideProps> = props => {

  const classes = outsideStyle();
  const { children, className, extra, extraClass, id, label } = props;
  const cardClass = clsx(classes.root, 'mscb-outside-card relative', className);

  return <Box className={ cardClass } id={ id }>
    {
      !!label &&
      <div className={ clsx(classes.label, 'mscb-outside-card-label ellipsis bg-white text-upper text-primary') }>
        { label }
      </div>
    }

    {
      !!extra &&
      <div className={ clsx('mscb-outside-card-extra', extraClass) }>
        { extra }
      </div>
    }

    <div className={ clsx(classes.content, 'mscb-outside-card-content shadow bg-white') }>
      { children }
    </div>
  </Box>

}

export default CardOutside;