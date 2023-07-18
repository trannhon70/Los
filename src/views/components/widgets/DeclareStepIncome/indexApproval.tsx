import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/system/Box';
import useMasterData from 'app/hooks/useMasterData';
import clsx from 'clsx';
import { getCustomerTotal, getLOANNormalIncomeDeclareCompleted, getLOANNormalLegalData } from 'features/loan/normal/storageApproval/income/selector';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatNumber } from 'utils';
import Label from 'views/components/base/Label';
import Loading from 'views/components/base/Loading';
import Steps, { StepItem } from 'views/components/layout/StepsClone';

export interface DeclareStepProps {
  alternative?: boolean;
  className?: string;
  current?: number;
  beforeChange?(current: number, next: number): boolean;
  isSub?: boolean;
  sx?: SxProps<Theme>;
  nodeNumber?: boolean;
  nodeRoman?: boolean; // cic
  nodeChars?: string;
  hasSub?: boolean[];
  uppercase?: boolean;
  exclude?: string[];
  type?: string;
  incomeStepsTotal?: boolean;
}

export interface DeclareStepComponent extends FC<DeclareStepProps> { }

const NodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NodeRomanList = ['I', 'II', 'III', 'IV', 'V', 'VI']

const DeclareStepIncome: DeclareStepComponent = props => {

  const {
    beforeChange,
    className,
    current = 0,
    isSub,
    children,
    sx = {},
    nodeNumber,
    nodeChars,
    hasSub = [],
    alternative,
    nodeRoman = false,
    uppercase,
    exclude = [],
    type,
    incomeStepsTotal
  } = props;
  const [CurrentStep, setCurrentStep] = useState<number>(current);
  const { PersonalRep, getStatus, register } = useMasterData();
  const IncomeDeclareCompleted = useSelector(getLOANNormalIncomeDeclareCompleted);
  const legalData = useSelector(getLOANNormalLegalData);
  useEffect(() => {
    setCurrentStep(current);
  }, [current]);

  useEffect(() => {
    register('personalRep', type)
  })

  const TotalData = useSelector(getCustomerTotal());
  // console.log("TotalData, ", TotalData);

  const checkStatusPersonInLegal = (typeDeclare: string): { exist: boolean, completed: boolean } => {
    switch (typeDeclare) {
      case 'BORROWER': return { exist: !!(legalData.borrower?.customer_uuid), completed: IncomeDeclareCompleted.borrower };
      case 'MARRIAGE': return { exist: !!(legalData.marriage?.customer_uuid), completed: IncomeDeclareCompleted.marriage };
      case 'CO_BRW': return { exist: !!legalData.coBorrower && legalData.coBorrower?.some(item => !!item.customer_uuid), completed: IncomeDeclareCompleted.coBorrower };
      case 'CO_PAYER': return { exist: !!legalData.coPayer && legalData.coPayer?.some(item => !!item.customer_uuid), completed: IncomeDeclareCompleted.coPayer };
      default: return {exist:false,completed:false}
    }
  }

  const Items: StepItem[] = useMemo(() => {
    return PersonalRep.filter(p => !~exclude.indexOf(p.id))
      .map((person, i) => {
        const { exist, completed } = checkStatusPersonInLegal(person.id);
        return {
          node: nodeNumber ? i + 1 : nodeChars?.length ? nodeChars[i] : nodeRoman ? NodeRomanList[i] : NodeChars[i],
          label: <Label>{person.name}</Label>,
          hasSub: !!hasSub[i],
          extra: formatNumber((TotalData[i] || 0).toString()),////totalIncomes[i],
          disabled: !exist,
          completed: exist && completed,
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TotalData, PersonalRep]);

  const status = getStatus('personalRep');

  if (!status?.fetched && status?.fetching) {
    return <Box sx={{ minHeight: '400px' }} style={{ backgroundColor: '#330a0a0a' }}>
      <Loading className="wh-full" />
    </Box>
  }

  return <Box>
    <Steps
      alternative={alternative}
      current={CurrentStep}
      className={clsx(className)}
      onChange={beforeChange}
      steps={Items}
      incomeStepsTotal={incomeStepsTotal}
    // sx={SxSteps}
    >
      {children}
    </Steps>
  </Box>


}

export default DeclareStepIncome;