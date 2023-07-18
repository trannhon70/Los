import { getShowSidebar } from 'features/app/store/slice';
import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

const SidebarGlobal: FC = () => {

  const show = useSelector(getShowSidebar);

  useEffect(() => {
    show 
      ? document.body.classList.remove('mscb-sidebar-collapsed')
      : document.body.classList.add('mscb-sidebar-collapsed');
  });

  return null;

}

export default memo(SidebarGlobal);