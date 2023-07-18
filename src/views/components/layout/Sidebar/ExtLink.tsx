import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IRoute } from 'types';
import { useTranslation } from 'react-i18next';
import ButtonBase from '@mui/material/ButtonBase';
import Icon from './Icon';

export interface ExtLinkProps{
  item: IRoute;
}

const ExtLink: FC<ExtLinkProps> = props => {

  const { item } = props;
  const { t } = useTranslation();

  return <Link 
    to={ item.path ?? '' }
    className="flex justify-between overflow-hidden"
    rel="noopener noreferrer"
    target="_blank"
  >
    <ButtonBase key={ item.name ? t(item.name) as string : '' } name="child" className="w-full">
      <Icon item={ item } />

      <span className="align-middle">
        { item.name ? t(item.name) as string : '' }
      </span>

      <div className="mx-auto"></div>

      {Boolean(item.badge) && (
        <div className={`rounded px-1 py-1px bg-${ item.badge?.color }`}>
          { item.badge?.value }
        </div>
      )}

    </ButtonBase>
  </Link>

}

export default ExtLink;