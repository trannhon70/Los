import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Logo from 'assets/images/logo/scb-sidebar.png';
import PAGE_URL from 'app/PageURL';
import brandStyle from './style';

const Brand: FC = () => {

  const classes = brandStyle();
  const { t } = useTranslation();

  const className = clsx(classes.root, "flex items-center justify-between mscb-sidebar-brand");

  return <div className={ className }>
    <Link to={ PAGE_URL.Dashboard } className="flex items-center">
      <img src={ Logo } alt={ t('App.Name') } />
    </Link>
  </div>

}

export default Brand;