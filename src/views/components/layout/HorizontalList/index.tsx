import { forwardRef, ForwardRefRenderFunction } from 'react';
import ObjectList, { ObjectListProps } from '../ObjectList';
import clsx from 'clsx';
import listStyle from './style';

export interface HorizontalListRef{}

export interface HorizontalListProps extends ObjectListProps{}

export interface HorizontalListComponent 
  extends ForwardRefRenderFunction<HorizontalListRef, HorizontalListProps>{}

const HorizontalList: HorizontalListComponent = (props, ref) => {

  const { className, ...remain } = props;
  const classes = listStyle();

  return <ObjectList
    { ...remain }
    className={ clsx(classes.HorizontalList, className) }
    enableLength={ false }
  />

}

export default forwardRef(HorizontalList);