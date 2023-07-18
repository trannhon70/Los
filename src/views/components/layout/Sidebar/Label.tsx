import { FC } from 'react';

export interface LabelProps{
  label: string;
}

const Label: FC<LabelProps> = props => {

  const { label } = props;

  return <p className="sidebar-navbar-label text-upper">
    { label }
  </p>

}

export default Label;