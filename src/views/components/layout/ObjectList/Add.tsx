import { FC } from 'react';
import clsx from 'clsx';
import AddIcon from '@mui/icons-material/Add';
import ObjectListBox from './Box';

export interface ObjectListAddProps{
  className?: string;
  onClick?(): void;
}

const ObjectListAdd: FC<ObjectListAddProps> = props => {

  const { className, onClick } = props;

  return <div className={ clsx(className, 'object-list-add') }>
    <ObjectListBox active bgPrimary onClick={ onClick } circle={ <AddIcon /> } />
  </div>

}

export default ObjectListAdd;