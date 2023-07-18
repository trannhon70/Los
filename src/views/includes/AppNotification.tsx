// import { appMessage, getAppNotification, setAppNotification } from 'features/app/store/slice';
import { FC, memo } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import AlertMessage from 'views/components/layout/AlertMessage';

const AppNotification: FC = () => {

    // const dispatch = useDispatch();
    // const AppNotification = useSelector(getAppNotification);
    // const { t } = useTranslation();

    // if(!AppNotification.message) return null;

    // const onClose = () => dispatch(setAppNotification(appMessage('')));

    // return (
    //     <AlertMessage open={ !!AppNotification.message } onClose={ onClose } variant={AppNotification.variant}>
    //         { t(AppNotification.message, AppNotification.params) }
    //     </AlertMessage>
    // );
    return null;
}

export default memo(AppNotification);