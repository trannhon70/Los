import { FC, useEffect, useMemo, useState } from 'react';
import { SxProps, Theme } from '@mui/system';
import clsx from 'clsx';
import Steps, { StepItem } from 'views/components/layout/Steps';
import Box from '@mui/system/Box';
import Loading from 'views/components/base/Loading';
import Label from 'views/components/base/Label';
import useMasterData from 'app/hooks/useMasterData';

export interface DeclareStepProps {
  alternative?: boolean;
  className?: string;
  current?: number;
  onChange?(next: number, current: number): boolean;
  sx?: SxProps<Theme>;
  nodeNumber?: boolean;
  nodeRoman?: boolean; // cic
  nodeChars?: string;
  hasSub?: boolean[];
  exclude?: string[];
  type: string;
  attach?: string[];
}

export interface DeclareStepComponent extends FC<DeclareStepProps> { }

const NodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NodeRomanList = ['I', 'II', 'III', 'IV', 'V', 'VI']

const DeclareStep: DeclareStepComponent = props => {

  const {
    onChange,
    className,
    current = 0,
    children,
    sx = {},
    nodeNumber,
    nodeChars,
    hasSub = [],
    alternative,
    nodeRoman = false,
    exclude = [],
    type,
    attach = []
  } = props;
  const [CurrentStep, setCurrentStep] = useState<number>(current);
  const { PersonalRep, getStatus, register } = useMasterData();

  useEffect(() => {
    register('personalRep', type)
  })

  useEffect(() => {
    setCurrentStep(current);
  }, [current]);

  const Items: StepItem[] = useMemo(() => {
    return PersonalRep.filter(p => !~exclude.indexOf(p.id))
      .map((person, i) => {
        return {
          node: nodeNumber ? i + 1 : nodeChars?.length ? nodeChars[i] : nodeRoman ? NodeRomanList[i] : NodeChars[i],
          label: <Label required={ person.id === 'RELATED' }>{person.name}</Label>,
          hasSub: !!hasSub[i],
          attachment: attach.indexOf(person.id) > -1 ? 0 : undefined
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PersonalRep]);

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
      className={clsx('justify-center', className)}
      onChange={onChange}
      steps={Items}
      sx={ sx }
      attachLabel="tập tin"
    >
      {children}
    </Steps>
  </Box>


}

export default DeclareStep;