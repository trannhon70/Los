import { FC } from 'react';
import CircleBox from 'views/components/base/CircleBox';

export interface IconNavProps{}

export interface IconNavComponent extends FC<IconNavProps>{}

const IconNav: IconNavComponent = props => {

  return <CircleBox className="sidebar-icon-nav">
    <span />
  </CircleBox>

}

export default IconNav;