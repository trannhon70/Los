import { FC } from 'react';
import { Grid } from '@mui/material';
import { Box } from "@mui/system";
import Select from 'views/components/base/Select';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import clsx from "clsx";
import { useTranslation } from 'react-i18next';
import IndicatorsStyle from './style';
import SelectEducation from 'views/components/widgets/SelectEducation';
import SelectMarriageStatus from 'views/components/widgets/SelectMarriedStatus';
import SelectOwnerProperty from 'views/components/widgets/SelectOwnerProperty';


const Indicators: FC = () => {
    const classes = IndicatorsStyle();
    const { t } = useTranslation();

  return <Box className={`pt-5 ${clsx(classes.root)}`}>
    <span className="tittle-indicator">{`A. ${t('Bộ chỉ tiêu').toUpperCase()}`}</span>
        <CardInside
            title={`I. ${t('Thông tin chung')}`}
        >
            <Grid container columnSpacing='20' rowSpacing='20'>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <Select
                        label={`1. ${t('Năm sinh (Tuổi)')}`}
                        options={[]}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <SelectEducation
                        label={`2. ${t('Trình độ học vấn')}`}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <Input
                        label={`3. ${t('Số người phụ thuộc')}`}
                        type='number'
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <SelectMarriageStatus
                        label={`4. ${t('Tình trạng hôn nhân')}`}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <SelectOwnerProperty
                        label={`5. ${t('Tình trạng sở hữu')}`}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <Select
                        label={`6. ${t('Thời gian ở địa chỉ hiện tại')}`}
                        options={[]}
                    />
                </Grid>
                <Grid item xs={12} md={12} xl={6} className={classes.inputLabel}>
                    <Select
                        label={`7. ${t('Vị trí công việc')}`}
                        options={[]}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <Select
                        label={`8. ${t('Sử dụng dịch vụ thẻ tại SCB')}`}
                        options={[]}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <Select
                        label={`9. ${t('Nhận lương qua tài khoản')}`}
                        options={[]}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <Select
                        label={`10. ${t('Có QHTD với SCB và các NH khác ở thời điểm vay')}`}
                        options={[]}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <Select
                        label={`11. ${t('Uy tín trong quan hệ tín dụng (3 năm gần nhất)')}`}
                        options={[]}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <Input
                        label={`12. ${t('Thu nhập sau thuế bình quân tháng (VND)')}`}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={3} className={classes.inputLabel}>
                    <Input
                        label={`13. ${t('Chỉ tiêu hàng tháng (VND)')}`}
                    />
                </Grid>
            </Grid>
        </CardInside>
    </Box>
}

export default Indicators;