import { FC } from 'react';
import { Grid } from '@mui/material';

export interface RowProps{
  className?: string;
  spacing?: number;
}

const Row: FC<RowProps> = props => {

  const { children, className, spacing } = props;

  return <Grid container spacing={ spacing } className={ className }>
    { children }
  </Grid>

}

export default Row;