import { AppBar, Toolbar } from '@mui/material';
import { FC, memo } from 'react';
import topbarStyle from './style';
import clsx from 'clsx';

import ToggleSidebar from './ToggleSidebar';
import TopbarLeft from './Left';
import TopbarCenter from './Center';
import TopbarRight from './Right';

const Topbar: FC = () => {

  const classes = topbarStyle();
  const cls = clsx(classes.root, 'mscb-topbar');

  return <AppBar position="fixed" className={ cls }>
    <Toolbar className="mscb-topbar-toolbar">
      <ToggleSidebar />
      <div className="mscb-topbar-toolbar-box flex justify-left wh-full">
        <TopbarLeft />
        <TopbarCenter />
        <TopbarRight />
      </div>
    </Toolbar>
  </AppBar>

}

export default memo(Topbar);