import React, { ReactNode } from 'react';
import clsx from 'clsx';
import statisticTwoLineStyle from './style';

export interface IStatisticTwoLineProps {
    color?: string;
    className?: string;
    icon?: ReactNode;
    label?: string;
    labelBehind?: boolean;
    outlined?: boolean
    value?: string | number;
}

const StatisticTwoLine: React.FC<IStatisticTwoLineProps> = (props) => {
    const {
        color,
        className,
        icon,
        label,
        labelBehind,
        outlined,
        value,
    } = props;
    const classes = statisticTwoLineStyle();

    return (<>
        <div className={clsx(classes.root, outlined && 'outlined', className)} style={{
            border: outlined ? '1px solid '+color : undefined
        }}>
            <div className='icon-box' style={{
                fontSize: '30px',
                color: outlined ? 'white' : color,  
                backgroundColor: outlined ? color : undefined,
            }}>
                {icon ? icon : <span>icon</span>}
            </div>
            {labelBehind ? (
                // Label bên dưới
                <div className='content-box'>
                    <span className='value' style={{ color: color }}>
                        {value ? value : 'statistic.value'}
                    </span>
                    <span className='label'>{label ? label : 'statistic.label'}</span>
                </div>
            ) : (
                // Label bên trên
                <div className='content-box'>
                    <span className='label'>{label ? label : 'statistic.label'}</span>
                    <span className='value' style={{ color: color }}>
                        {value ? value : 'statistic.value'}
                    </span>
                </div>
            )}
        </div>
    </>);
};

export default StatisticTwoLine;
