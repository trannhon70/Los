import { FC } from 'react';
import clsx from 'clsx';
import sidebarStyle from './style';
import Scrollbar from '../Scrollbar';

import Brand from '../Brand';
import User from '../User';
import Navbar from './Navbar';
import Copyright from './Copyright';
import SidebarGlobal from './Global';

const Sidebar: FC = () => {

  const classes = sidebarStyle();
  const sidebarClass = clsx(classes.root, "mscb-sidebar fixed left top bottom");

  return <div className={ sidebarClass }>
    <div className="flex-column relative h-full">
      <Brand />
      <User />
      <div className={ clsx(classes.sidebar, 'mscb-sidebar-navbar') }>
        <Scrollbar 
          className={ clsx('relative', 'scrollX') } 
          style={{ 
            overflowX: 'hidden', 
            marginRight: 0 
          }}
        >
          <Navbar className={ classes.navigation } classPanel={ classes.panel } />
        </Scrollbar>
      </div>
      <Copyright className={ classes.copyright } />
    </div>
    <SidebarGlobal />
  </div>

}

export default Sidebar;