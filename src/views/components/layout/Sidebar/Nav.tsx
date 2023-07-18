import { FC, MouseEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IRoute } from 'types';
import { useTranslation } from 'react-i18next';
import ButtonBase from '@mui/material/ButtonBase';
import Icon from './Icon';

export interface NavProps{
  item: IRoute;
  prefix?: string;
}

const Nav: FC<NavProps> = props => {

  const { item, prefix = '' } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const url = (prefix + '/' + item.path).replace(/\/\/+/g, '/');

  const clickNavLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(url);
  }

  return <div>
    <NavLink 
      to={ url }
      className="mscb-sidebar-item flex justify-start overflow-hidden"
      onClick={clickNavLink  }
    >
      <ButtonBase key={ item.name ? t(item.name) as string : '' } name="child" className="w-full">
        
        <Icon item={ item } />

        <span className="align-middle text-left text-upper mscb-sidebar-navbar-name">
          { item.name ? t(item.name) : '' }
        </span>

        <div className="mx-auto"></div>

        {Boolean(item.badge) && (
          <div className={`rounded px-1 py-1px bg-${ item.badge?.color }`}>
            { item.badge?.value }
          </div>
        )}

      </ButtonBase>
    </NavLink>
  </div>

}

export default Nav;