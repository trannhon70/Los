// import { fetchDeclareInfo, getDeclareInfo, isFetched, isFetching } from 'features/declare-info/store/slice';
import { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useMemo, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Steps, { StepItem } from '../Steps';
import Label from './Label';
// import { getCICCurrentValueLatest } from 'features/cic/store/slice';

export interface DeclareStepRef{}

export interface DeclareStepProps{
  alternative?: boolean;
  children?: ReactNode;
  className?: string;
  enableFirst?: boolean;
  enableLast?: boolean;
  requiredLast?: boolean;
  isSub?: boolean;
  nodeNumber?: boolean;
  beforeChange?(current: number, next: number): boolean;
  current?: number;
  nodeChars?: ReactNode[];
  hasSub?: boolean[];
  target?: string[];
  parentTarget?: string;
  tabs?: "STEP6" | "STEP4",
  fileSub?: string;
  classNameIncome?: string;
  isIncome?: boolean;
  valueIncome?: string;
  inputIncomeDisabled?: boolean;
  onDebounceIncome?(): void;
  isCIC?: string;
}
// const CICStepsDeclare = ['borrower', 'marriage', 'co_brw', 'co_payer'];
export interface DeclareStepComponent extends ForwardRefRenderFunction<DeclareStepRef, DeclareStepProps>{}

const NodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const data = [
    {id: 'MAIN', code: 'CIC', name: 'Chủ thẻ chính'},
    {id: 'REF', code: 'CIC', name: 'Người giới thiệu'},
    {id: 'OTHER', code: 'CIC', name: 'Đối tượng khác'},
]

const DeclareStepCIC: DeclareStepComponent = (props, ref) => {

  const {
    alternative,
    enableFirst = true,
    enableLast = true,
    children,
    className,
    nodeNumber,
    isSub,
    beforeChange,
    current = 0,
    nodeChars,
    hasSub = [],
    target = [],
    parentTarget,
    tabs,
    // classNameIncome,
    // isIncome,
    // valueIncome,
    // inputIncomeDisabled,
    // onDebounceIncome,
    // isCIC,
  } = props;

//   const Declares = useSelector(getDeclareInfo);
//   const fetching = useSelector(isFetching);
//   const fetched = useSelector(isFetched);
//   const dispatch = useDispatch();
//   const CurrentValueCIC = useSelector(getCICCurrentValueLatest);
//   const currentDeclareStep = CICStepsDeclare.indexOf(CurrentValueCIC[isCIC ?? 'other'].active);
  const [ CurrentStep, setCurrentStep ] = useState(current);

  const Declares = [
    {id: 'MAIN', code: 'CIC', name: 'Chủ thẻ chính'},
    {id: 'REF', code: 'CIC', name: 'Người giới thiệu'},
    {id: 'OTHER', code: 'CIC', name: 'Đối tượng khác'},
  ]

//   useEffect(() => {
//     !Declares.length
//     && !fetched
//     && !fetching
//     && dispatch(fetchDeclareInfo());
//   });

  useEffect(() => {
    current !== undefined && current !== CurrentStep && setCurrentStep(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ current ]);

  const StepItems: StepItem[] = useMemo(() => {
    return Declares.map((d, i) => {
      if (i === 0 && !enableFirst) return null;
      if (i === Declares.length && !enableLast) return null;
      return {
        node: nodeNumber ? i + 1 : nodeChars?.length ? nodeChars[i] : NodeChars[i],
        label: <Label name={ d.name } />,
        hasSub: !!hasSub[i],
        target: target[i]
      };
    }).filter(d => d !== null) as StepItem[];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ Declares ]);

  const StepData: StepItem[] = useMemo(() => {
    return data.map((d, i) => {
      if (i === 0 && !enableFirst) return null;
      if (i === data.length && !enableLast) return null;
      if (d.code === 'LOAN_OTHER') return null;
      return {
        node: nodeNumber ? i + 1 : nodeChars?.length ? nodeChars[i] : NodeChars[i],
        label: <Label name={ d.name } fileSub={d.code} />,
        hasSub: !!hasSub[i],
        target: target[i]
      };
    }).filter(d => d !== null) as StepItem[];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data ]);

  return <Steps
    alternative={ alternative }
    current={CurrentStep}
    className={ clsx('justify-center', className) }
    onChange={ beforeChange }
    steps={ tabs === "STEP6" ? StepItems : StepData }
  >
    { children }
  </Steps>;

}

export default forwardRef(DeclareStepCIC);
