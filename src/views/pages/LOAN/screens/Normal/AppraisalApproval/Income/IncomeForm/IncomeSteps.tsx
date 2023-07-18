import clsx from 'clsx';
import { getLOANNormalIncomeDisbledByDeclare } from 'features/loan/normal/storageApproval/income/selector';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import Empty from 'views/components/layout/Empty';
import Steps from 'views/components/layout/Steps';
import { incomeSource, stageName } from 'views/pages/LOAN/utils';
import IncomeMainForm from './Form';
import stepStyleIncome from './style';

export interface IncomeStepsProps{
  disabled?: boolean;
  typeDeclare?:string;
}

const IncomeSteps: FC<IncomeStepsProps> = ({typeDeclare=''}) => {

  const classes = stepStyleIncome()
  const navigate = useNavigate();
  const params = useParams() as ILOANURLParams;
  const incomeType = params['*'];
  const current = incomeSource.indexOf(incomeType);
  const beforeChange = (_: number, next: number) => {
    const { id, declare, uuid } = params;
    const step = incomeSource[next];
    navigate(`/loan/normal/${stageName[1]}/${ id }/income/${ declare }/${ uuid }/` + step);
    return true;
  }
  const disabled  = useSelector(getLOANNormalIncomeDisbledByDeclare(params?.declare ?? "", params.uuid ?? ""))

  if(params.uuid === '-') return <Empty sx={{
    "& img": {
      width: "23%"
    },
    fontSize: '20px',
    fontWeight: 300,
    // fontStyle: 'italic',
  }}>
    Chưa có dữ liệu
  </Empty>

  return <Steps
    alternative
    sx={{
      '& .MuiTabs-flexContainer .MuiButtonBase-root':{
        lineHeight: 1.25
      }
    }}
    current={ !!~current ? current : 0 }
    onChange={ beforeChange }
    steps={[
      { label: 'Nguồn lương', node: '1', disabled: !disabled.salary },
      { label: 'Cho thuê tài sản', node: '2', disabled: !disabled.assetRent },
      { label: 'Hoạt động của hộ kinh doanh', node: '3', disabled: !disabled.business},
      { label: 'Doanh nghiệp do khách hàng làm chủ', node: '4', disabled: !disabled.company },
      { label: 'Cổ tức/Lợi nhuận', node: '5', disabled: !disabled.stock },
      { label: 'Lãi tiền gửi/Giấy tờ có giá', node: '6', disabled: !disabled.deposit },
      { label: 'Lương hưu trí', node: '7', disabled: !disabled.pension },
      { label: 'Nguồn thu khác', node: '8', disabled: !disabled.other },
    ]}
    className={clsx(classes.step,'step-scroll')}
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