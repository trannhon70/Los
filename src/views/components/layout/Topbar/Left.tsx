import { FC } from 'react';
import TitlePage from './TitlePage';

const TopbarLeft: FC = () => {

  return <div className="mscb-topbar-left absolute h-full top flex items-center">
    <TitlePage />
  </div>

}

export default TopbarLeft;