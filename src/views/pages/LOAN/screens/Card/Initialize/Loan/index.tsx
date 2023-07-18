import { FC, Fragment } from 'react';
import Steps from 'views/components/layout/Steps';
import clsx from 'clsx';
import CardProductInfo from './CardProductInfo';
import loanStyle from "./style";
import CreditLimit from './CreditLimit';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { stepsLOANCard } from 'views/pages/LOAN/utils';
import LOANCardIssuancePlans from './CardInssuancePlans';
import { Divider } from '@mui/material';
import ButtonBar from 'views/components/layout/ButtonBar';

const Loan: FC = () => {
  const classes = loanStyle();
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const beforeChange = (_: number, next: number) => {
    navigate(`/loan/card/init/${ params.id }/loan-card/${ stepsLOANCard[next] }`);
    return true;
  }
  return (
    <Fragment>

    <Steps
      // active={CurrentValue.active === 'scb' ? 1 : 0}
      onChange={ beforeChange }
      className={clsx(classes.root)}
      attachLabel="tập tin"
      steps={[
        {
          node: "A",
          label: "Thông tin sản phẩm chương trình thẻ",
          hasSub: false
        },
        {
          node: "B",
          label: "Hạn mức thẻ theo nhóm đối tượng",
          hasSub: false
        },
        {
          node: "C",
          label: "Nhu cầu và phương án phát hành thẻ",
          hasSub: true,
          attachment: 6,
        },
      ]}
      >
      <Routes>
        <Route path="product" element={ <CardProductInfo /> } />
      </Routes>
      <Routes>
        <Route path="limit" element={ <CreditLimit /> } />
      </Routes>
      <Routes>
        <Route path="plans/*" element={ <LOANCardIssuancePlans /> } />
      </Routes>

    </Steps >
    <Divider className="my-6" />
      <ButtonBar
        disableBack
        disableExit
        className="mb-6"
        />
    </Fragment>
  )
}

export default Loan;