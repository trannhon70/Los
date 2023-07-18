
import { FC } from 'react';
import { Grid } from '@mui/material';
import clsx from 'clsx';

export interface StatisticProps{
  className?: string;
}

const Statistic: FC<StatisticProps> = props => {

  const { className } = props;

  return <Grid container className={ clsx(className, 'bg-white shadow') }>
    <Grid item>
      Statistic
    </Grid>
  </Grid>

}

export default Statistic;
