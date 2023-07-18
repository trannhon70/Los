import { FC } from 'react';
import clsx from 'clsx';

export interface HistoryGroupInfo{
  step: string;
  task: string;
  status: string;
  branch: string;
  full_name: string;
  department: string;
  start: string;
  end: string;
}

export interface HistoryGroupProps{
  date: string;
  info: HistoryGroupInfo[];
  className?: string;
}

const HistoryGroup: FC<HistoryGroupProps> = props => {

  const { className, info, date } = props;

  return <div className={ clsx('mscb-customer-history-group', className) }>
    <div className="font-medium mb-2">{ date }</div>
    {info.map((inf, index) => {
      return <div className="mscb-customer-history-item flex" key={ index }>
        <div className="mscb-customer-history-time pr-4 relative">
          <div className="text-info">{ inf.start }</div>
          <div className="text-danger">{ inf.end }</div>
        </div>
        <div className="mscb-customer-history-info relative pl-4 pb-4">
          <div>[{ inf.step }] - { inf.task }</div>
          <div>
            <em className="text-primary text-small">{ inf.status }</em>
            <span className="text-small"> - </span>
            <em className="text-secondary text-small">{ inf.branch }</em>
          </div>
          <div className="text-small underline">
            { inf.full_name } - { inf.department }
          </div>
        </div>
      </div>
    })}
    
  </div>

}

export default HistoryGroup;