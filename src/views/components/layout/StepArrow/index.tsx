import { forwardRef, ForwardRefRenderFunction, ReactNode, useImperativeHandle, useRef } from 'react';
import stepArrowStyle from './style';
import clsx from 'clsx';
import Tabs, { TabsProps, TabsRef } from '../Tabs';
import StepItem from './StepItem';

export interface StepArrowRef{
  getCurrent(): number;
}

export interface StepArrowProps extends TabsProps{
  circle?: ReactNode[];
}

export interface StepArrowComponent extends ForwardRefRenderFunction<StepArrowRef, StepArrowProps>{}

const StepArrow: StepArrowComponent = (props, ref) => {

  const { children, className, circle = [], tabs = [], ...remain } = props;
  const classes = stepArrowStyle();
  const tabRef = useRef<TabsRef>(null);

  useImperativeHandle(ref, () => ({
    getCurrent: () => tabRef.current?.getValue() ?? 0
  }))

    return <Tabs className={ clsx(className, classes.StepArrow) } { ...remain } ref={ tabRef } tabs={
      tabs.map((tab, index) => <StepItem circle={ circle[index] } key={ index }>{ tab }</StepItem>)
    }>
      { children }
    </Tabs>

}

export default forwardRef(StepArrow);