import { FC } from 'react';
import Logo from 'assets/images/logo/scb-topbar.png';

const TopbarCenter: FC = () => {

  return <div className="mscb-topbar-center absolute wh-full flex-center">
    <img src={ Logo } alt="SCB" />
  </div>

}

export default TopbarCenter;