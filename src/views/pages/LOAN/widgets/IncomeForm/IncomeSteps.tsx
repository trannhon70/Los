import { FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import Steps from 'views/components/layout/Steps';
import { incomeSource } from '../../utils';
import IncomeMainForm from './Form';
import clsx from 'clsx';
import stepStyleIncome from './style';
import { useSelector } from 'react-redux';
import { getLOANNormalIncomeCompletedByDeclare } from 'features/loan/normal/storage/income/selector';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

export interface IncomeStepsProps {
  disabled?: boolean;
  typeDeclare?: string;
}

const IncomeSteps: FC<IncomeStepsProps> = ({ typeDeclare = '' }) => {

  const classes = stepStyleIncome()
  const navigate = useNavigate();
  const params = useParams() as ILOANURLParams;
  const incomeType = params['*'];
  const current = incomeSource.indexOf(incomeType);

  const incomeCompletedData = useSelector(getLOANNormalIncomeCompletedByDeclare(typeDeclare));
  
  const ruleDisabled = useSelector(getRuleDisbled)

  const beforeChange = (_: number, next: number) => {
    const { id, declare, uuid } = params;
    const step = incomeSource[next];
    navigate(`/loan/normal/init/${id}/income/${declare}/${uuid}/` + step);
    return true;
  }


  return <Steps
    alternative
    current={!!~current ? current : 0}
    onChange={beforeChange}
    steps={[
      { label: 'Nguồn lương', node: '1', completed: incomeCompletedData.salary, disabled: ruleDisabled && !incomeCompletedData.salary },
      { label: 'Cho thuê tài sản', node: '2', completed: incomeCompletedData.assetRent, disabled: ruleDisabled && !incomeCompletedData.assetRent },
      { label: 'Hoạt động của hộ kinh doanh', node: '3', completed: incomeCompletedData.business,disabled: ruleDisabled && !incomeCompletedData.business },
      { label: 'Doanh nghiệp do khách hàng làm chủ', node: '4', completed: incomeCompletedData.company,disabled: ruleDisabled && !incomeCompletedData.company },
      { label: 'Cổ tức/Lợi nhuận', node: '5', completed: incomeCompletedData.stock,disabled: ruleDisabled && !incomeCompletedData.stock },
      { label: 'Lãi tiền gửi/Giấy tờ có giá', node: '6', completed: incomeCompletedData.deposit, disabled: ruleDisabled && !incomeCompletedData.deposit},
      { label: 'Lương hưu trí', node: '7', completed: incomeCompletedData.pension,disabled: ruleDisabled && !incomeCompletedData.pension },
      { label: 'Nguồn thu khác', node: '8', completed: incomeCompletedData.other, disabled: ruleDisabled && !incomeCompletedData.other},
    ]}
    className={clsx(classes.step, 'step-scroll')}
  >
    <IncomeMainForm />
    <IncomeMainForm />
    <IncomeMainForm />
    <IncomeMainForm />
    <IncomeMainForm />
    <IncomeMainForm />
    <IncomeMainForm />
    <IncomeMainForm />
  </Steps>

}

export default IncomeSteps;