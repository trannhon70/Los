import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import CardInside from 'views/components/layout/CardInside';
import SelectFATCA from 'views/components/widgets/SelectFATCA';
import SelectCareer from 'views/components/widgets/SelectCareer';
import SelectIncome3Month from 'views/components/widgets/SelectIncome3Month';
import { setLegalOtherData } from 'features/loan/normal/storage/legal/actions';
import { ILOANNormalStorageLegalBorrowerOther } from 'types/models/loan/normal/storage/Legal';
import { getLoanLegalBasic } from 'features/loan/normal/storage/legal/selectors';
import useNormalLegalMessage from 'app/hooks/useNormalLegalMessage';
import { ELegalTypeScreen } from 'features/loan/normal/storage/legal/case';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

const BorrowerOther: FC = () => {
  const dispatch = useDispatch();
  const getMessage = useNormalLegalMessage();
  const SCREEN = ELegalTypeScreen.BORROWER;
  const ruleDisabled = useSelector(getRuleDisbled);

  const dataBasic = useSelector(getLoanLegalBasic(SCREEN));

  const handleFatcaChange = (
    value: string | number | null,
    key: keyof ILOANNormalStorageLegalBorrowerOther
  ) => {
    dispatch(setLegalOtherData(value, { declare: SCREEN, key: key }));
  };

  return (
    <CardInside
      title="II. Thông tin khác"
      classBody="h-full p-6"
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
      sx={{ height: 'calc(100% - 20px)' }}
    >
      <Grid container spacing={3}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectFATCA
            label="1. Thông tin FATCA"
            required
            onChange={(val) => handleFatcaChange(val, 'fatca')}
            value={dataBasic[0]?.other.fatca}
            message={getMessage(SCREEN, 'fatca')}
            disabled={ruleDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectCareer
            label="2. Nghề nghiệp"
            required
            onChange={(val) => handleFatcaChange(val, 'career')}
            value={dataBasic[0]?.other.career}
            message={getMessage(SCREEN, 'career')}
            disabled={ruleDisabled}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <SelectIncome3Month
            label="3. Thu nhập bình quân 3 tháng (VND)"
            required
            onChange={(val) => handleFatcaChange(val, 'income3Month')}
            value={dataBasic[0]?.other.income3Month}
            message={getMessage(SCREEN, 'income3Month')}
            disabled={ruleDisabled}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default BorrowerOther;
