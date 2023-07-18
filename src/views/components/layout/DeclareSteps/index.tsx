import { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Steps, { StepItem } from '../Steps';
import Label from './Label';

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
}

export interface DeclareStepComponent extends ForwardRefRenderFunction<DeclareStepRef, DeclareStepProps>{}

const NodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const data = [
  {id: 'BORROWER', code: 'Income', name: 'Người vay'},
  {id: 'MARRIAGE', code: 'Income', name: 'Người hôn phối'},
  {id: 'CO_BRW', code: 'Income', name: 'Người đồng vay'},
  {id: 'CO_PAYER', code: 'Income', name: 'Người đồng trả nợ'},
]

const DeclareStep: DeclareStepComponent = (props, ref) => {

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
  } = props;

  const [ CurrentStep, setCurrentStep ] = useState(current);
//   const Declares = useSelector(getDeclareInfo);
//   const fetching = useSelector(isFetching);
//   const fetched = useSelector(isFetched);
  const Declares = [
    {id: 'MAIN', code: 'Legal', name: 'Chủ thẻ chính'.toUpperCase()},
    {id: 'SPOUSE', code: 'Legal', name: 'Người hôn phối'.toUpperCase()},
    {id: 'SUB', code: 'Legal', name: 'Chủ thẻ phụ'.toUpperCase()},
    {id: 'CONTACT', code: 'Legal', name: 'Người liên hệ'.toUpperCase()},
    {id: 'REF', code: 'Legal', name: 'Người giới thiệu'.toUpperCase()},
    {id: 'OTHER', code: 'Legal', name: 'Đối tượng khác'.toUpperCase()},
  ]
//   const dispatch = useDispatch();

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

export default forwardRef(DeclareStep);
