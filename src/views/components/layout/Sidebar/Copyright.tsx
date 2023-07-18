import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export interface CopyrightProps{
  className?: string;
}

const Copyright: FC<CopyrightProps> = props => {

  const { className } = props;
  const { t } = useTranslation();

  return <div className={ clsx('flex-center w-full mscb-sidebar-copyright', className) }>
    &#169;{ t('App.Copyright') }
  </div>

}

export default Copyright;