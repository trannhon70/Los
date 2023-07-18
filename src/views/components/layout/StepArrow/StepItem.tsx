import { FC, ReactNode } from 'react';
import CircleBox from 'views/components/base/CircleBox';

export interface StepItemProps{
  circle?: ReactNode;
}

export interface StepItemComponent extends FC<StepItemProps>{}

const StepItem: StepItemComponent = props => {

  const { circle, children } = props;

  return <div className="step-arrow-item">
    <div className="flex">
      { !!circle && <CircleBox className="bg-white">{ circle }</CircleBox> }
      <div className="steps-arrow-label text-16 font-normal">{ children }</div>
    </div>
  </div>

}

export default StepItem;