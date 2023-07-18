import { Paper } from '@mui/material';
import { FC } from 'react';
import clsx from 'clsx';

export interface StatisticLabelProps{
  className?: string;
  variant?: 'filled' | 'outlined';
  color?: 'info' | 'danger';
}

const StatisticLabel: FC<StatisticLabelProps> = props => {

  const { className, variant = 'filled', color = 'info', children } = props;
  const _color = color === 'info' ? 'var(--mscb-primary)' : '#eb0029';

  return <Paper
    sx={{ 
      width: '100%',
      maxWidth: '100%', 
      borderRadius: 0,
      height: '40px',
      lineHeight: '38px',
      border: `1px solid ${ _color }`,
      padding: '0 12px',
      fontSize: '1.115rem',
      fontWeight: '500',
      ...(variant === 'outlined' ? { color: _color } : { backgroundColor: _color, color: '#fff' })
    }}
    className={ clsx('mscb-statistic-label overflow-ellipsis', className) }
  >{ children }</Paper>

}

export default StatisticLabel;