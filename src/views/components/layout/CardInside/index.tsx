import { FC, ReactNode } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import clsx from 'clsx';
import cardStyle from './style';
import Box from '@mui/material/Box';
export interface CardInsideProps{
  className?: string;
  classBody?: string;
  titleClass?: string;
  title?: ReactNode;
  shadow?: boolean;
  fieldsetClass?: string;
  sx?: SxProps<Theme>
}

const CardInside: FC<CardInsideProps> = props => {

  const { className, classBody, title, children, shadow, titleClass, fieldsetClass, sx = {} } = props;
  const classes = cardStyle();
  const cardClass = clsx(classes.CardInside, className, {
    'empty-title': !Boolean(title).valueOf()
  });
  const bodyClass = clsx(classBody, 'card-inside-body bg-white', { shadow });

  return <Box className={ cardClass } sx={{ ...sx }}>
    <div className={ bodyClass }>
      { children }
    </div>
    <fieldset className={ fieldsetClass }>
      {
        !!title &&
        <legend className={ titleClass }>{ title }</legend>
      }
    </fieldset>
  </Box>

}

export default CardInside;
