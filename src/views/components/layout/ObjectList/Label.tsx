import { FC, ReactNode } from 'react';
import clsx from 'clsx';

export interface ObjectListLabelProps {
  className?: string;
  label?: ReactNode;
  number?: number;
}

const ObjectListLabel: FC<ObjectListLabelProps> = props => {

  const { className, label, number } = props;

  return <div className={ clsx('object-list-label-container', className) }>
    <div className="object-list-label">
      {label}
    </div>
    {number === undefined || <div className="object-list-number">{ number }</div>}
  </div>

}

export default ObjectListLabel;