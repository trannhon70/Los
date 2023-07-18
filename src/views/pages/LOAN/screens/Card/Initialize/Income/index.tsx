import { FC, Fragment } from 'react';
import clsx from 'clsx';
import IncomeExpenseBalance from './IncomeExpenseBalance';
import AbilityRepaying from './AbilityRepaying';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { incomeCard } from 'views/pages/LOAN/utils';
import Steps from 'views/components/layout/Steps';
import IncomeCardHolder from './IncomeCardHolder';
import incomeStyle from './style';
import ButtonBar from 'views/components/layout/ButtonBar';
import { Divider } from '@mui/material';

const Income: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const stepName = params['*'].split('/')[0];

  const current = incomeCard.indexOf(stepName);
  const classes = incomeStyle();
  const beforeChange = (_: number, next: number) => {
    const name = incomeCard[next];
    navigate(`/loan/card/init/${params.id}/income-card/${name}`);
    return true;
  }
  return (
    <Fragment>

    <Steps
      className={clsx(classes.root)}
      current={!!~current ? current : 0}
      onChange={beforeChange}
      steps={[
        {
          node: "A",
          label: "Nguồn thu nhập chủ thẻ chính",
          hasSub: true
        },
        {
          node: "B",
          label: "Cân đối thu nhập - chi phí",
          hasSub: false
        },
        {
          node: "C",
          label: "Khả năng trả nợ gốc lãi",
          hasSub: false
        },
      ]}
    >
      <Routes>
        <Route path="income/*" element={<IncomeCardHolder />} />
      </Routes>
      <Routes>
        <Route path="balance" element={<IncomeExpenseBalance />} />
      </Routes>
      <Routes>
        <Route path="ability-repay" element={<AbilityRepaying />} />
      </Routes>
    </Steps >
    <Divider className="my-6" />
    <ButtonBar
      className="pb-6"
      // onSave={ onSave }
      // onContinue={ onContinue }
      // onBack={ onBack }
      // onExit={ onExit }
    />
    </Fragment>
  )
}

export default Income;