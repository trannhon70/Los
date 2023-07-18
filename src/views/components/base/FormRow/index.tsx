import { FC } from 'react';
import clsx from 'clsx';

export interface FormRowProps{
  className?: string;
  onClick?(): void;
}

const FormRow: FC<FormRowProps> = props => {

  const { children, className, onClick } = props;

  return <div className={ clsx('mscb-form-row', className) } onClick={ onClick }>
    { children }
  </div>

}

export default FormRow;