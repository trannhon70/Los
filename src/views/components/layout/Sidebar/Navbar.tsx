import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IRoute } from 'types';
import SidebarRoutes from 'app/navigations/sidebar';
import ExtLink from './ExtLink';
import Label from './Label';
import Nav from './Nav';
import Panel from './Panel';
import { useSelector } from 'react-redux';
import { getMenuList } from 'features/auth/store/slice';

export interface NavbarProps{
  className: string;
  classPanel?: string;
}

const Navbar: FC<NavbarProps> = props => {

  const menuList = useSelector(getMenuList)

  const checkActiveMenuItem = (code: string) => {
    for (const item of menuList) {
      if(item.menu_code === code) {
        return item.is_activated
      }
    }
    for (const item of menuList) {
      if(item.child_list.length > 0){
        for (const child of item.child_list) {
          if(child.menu_code === code) return child.is_activated
        }
      }
    }
    return false
  }

  const { className, classPanel } = props;
  const { t } = useTranslation();

  const renderLevels = (data: IRoute[], prefix = '') => {
    return data.map((item, index) => {
      if (item.isRoute || !checkActiveMenuItem(item.code ?? "")) return null;
      
      if (item.type === 'label'){
        return <Label key={ index } label={ item.label ? t(item.label) : '' } />
      }

      if (item.children?.length){
        return <Panel key={ index } item={ item } classPanel={ classPanel } prefix={ prefix }>
          { renderLevels(item.children,  (prefix + '/' + (item.path ?? '')).replace(/\/\/+/g, '/')) }
        </Panel>
      }

      if (item.type === 'extLink'){
        return <ExtLink key={ index } item={ item } />
      }

      return <Nav key={ index } item={ item } prefix={ prefix } />

    });
  }

  return <div className={ className }>
    { renderLevels(SidebarRoutes) }
  </div>

}

export default Navbar;