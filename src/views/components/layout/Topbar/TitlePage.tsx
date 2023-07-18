import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getTitlePage } from 'features/app/store/slice';

const TitlePage: FC = () => {

  const { t } = useTranslation();
  const Title = useSelector(getTitlePage);

  return <div className="mscb-title-page text-upper text-primary font-bold">
    { Title ? t(Title) : '' }
  </div>

}

export default memo(TitlePage);