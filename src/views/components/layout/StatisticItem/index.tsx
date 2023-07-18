import { FC, ReactNode } from 'react';
import { Paper } from '@mui/material';
import clsx from 'clsx';
import itemStyle from './style';
import MscbIcon from 'views/components/base/MscbIcon';

export interface StatisticItemProps{
  className?: string;
  variant?: 'outlined' | 'filled' | 'white';
  name: string;
  total: string;
  iconTotal?: string;
  count?: string;
  iconCount?: string;
  color?: string;
  singleLine?: boolean;
  useExtendIcon? : boolean;
  extIcon?: ReactNode;
}

export interface StatisticItemComponent extends FC<StatisticItemProps>{}

const StatisticItem: StatisticItemComponent = props => {

  const { 
    className, 
    variant = 'white', 
    total, 
    iconTotal, 
    name, 
    count, 
    iconCount,
    color,
    singleLine = false,
    useExtendIcon = false, 
    extIcon
  } = props;
  const classes = itemStyle();
  const boxClass = clsx(classes.StatisticItem, 'mscb-statistic-item justify-between', className, variant, singleLine ? 'flex-row' : 'flex-column');

  return <Paper 
    sx={{ 
      width: '100%', 
      maxWidth: '100%', 
      borderRadius: 0,
      padding: '14px 20px',
      ...(variant === 'filled' ? { backgroundColor: color, color: '#fff' } : {}),
      ...(variant === 'outlined' ? { border: `1px solid ${ color }` } : {}),
      ...(singleLine === true ? { boxShadow: 'none', height: '100%' } : {})
    }} 
    className={ boxClass }
  >
    <div className="flex w-full items-center justify-between">
      <div className={singleLine ? "singleline-statistic-name" : "mscb-statistic-name"}>{ name }</div>
      <div 
        className="flex items-center justify-end mscb-statistic-count"
        style={{
          ...(variant === 'white' || variant === 'outlined' ? { color } : {})
        }}
      >
        { !!iconCount && <MscbIcon className="mscb-statistic-count-icon" icon={ iconCount } /> }
        <span className="mscb-statistic-count-value">{ count }</span>
      </div>
    </div>
    <div 
      className={clsx("flex items-center w-full", singleLine ? "singleline-statistic-total" : "mscb-statistic-total")}
      style={{
        ...(variant === 'white' || variant === 'outlined' ? { color } : {})
      }}
    >
      { !!iconTotal && <MscbIcon icon={ iconTotal } className="mscb-statistic-total-icon" size="xl" /> }
      { useExtendIcon ? <div className="ext-statistic-total-icon">{extIcon}</div> : ''}
      <span className="mscb-statistic-total-value">{ total }</span>
    </div>
  </Paper>

}

export default StatisticItem;