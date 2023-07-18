import { Step, StepLabel, Stepper } from "@mui/material";
import {
  Children,
  ForwardRefRenderFunction,
  forwardRef,
  Fragment,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle
} from "react";
import SwipeableViews from "react-swipeable-views";
import StepIcon from "./Icon";
import stepIncomeStyle from "./style";
import clsx from "clsx";
import TabPanel from "../TabPanel";

export interface StepItem {
  label: ReactNode;
  node?: ReactNode;
  hasSub?: boolean;
  target?: string;
}

export interface StepsRef {
  getChildRect(position: number): DOMRect | null;
  getParentRect(position: number): DOMRect | null;
  
}

export interface StepsProps {
  active?: number;
  className?: string;
  alternative?: boolean;
  isSub?: boolean;
  items?: StepItem[];
  beforeChange?(current: number, prev: number): boolean;
  onChange?(current: number): void;
  target?: string;
  children?: ReactNode;
  classNameIncome?: string;
}

const Steps: ForwardRefRenderFunction<StepsRef, StepsProps> = (props, ref) => {
  const classes = stepIncomeStyle();

  const {
    active = 0,
    children,
    className,
    alternative,
    isSub,
    items = [],
    beforeChange,
    onChange,
    target,
    // classNameIncome,
  } = props;

  const [CurrentStep, setCurrentStep] = useState<number>(active);
  const ActiveStep = useRef<number>(active);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const stepperRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getChildRect: (position) => {
      return stepRefs.current[position].getBoundingClientRect() ?? null;
    },
    getParentRect: () => {
      return stepperRef.current?.getBoundingClientRect() ?? null;
    }
  }))

  useEffect(() => {
    if (CurrentStep !== undefined && CurrentStep !== ActiveStep.current) {
      ActiveStep.current = CurrentStep;
      onChange && onChange(CurrentStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentStep]);

  useEffect(() => {
    if (
      active !== CurrentStep &&
      (!beforeChange || beforeChange(CurrentStep, active))
    ) {
      setCurrentStep(active);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const childs = useMemo(() => {
    if (!children) return [];
    return Children.toArray(children);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabPanel = () => {};

  const handleStep = (index: number) => () => {
    if (!beforeChange || beforeChange(CurrentStep, index)) {
      setCurrentStep(index);
    }
  };

  const stepClass = clsx(className, classes.root, { subSteps: isSub });

  return (
    <Fragment>
      <Stepper
        step-target={target}
        activeStep={CurrentStep}
        alternativeLabel={alternative}
        className={stepClass}
        ref={stepperRef}
      >
        {items.map((item, index) => {
          const completed = index < CurrentStep;
          return (
            <Step
              parent-target={item.target}
              key={index}
              completed={completed}
              onClick={handleStep(index)}
              className={clsx({
                hasSub: item.hasSub,
                active: index === CurrentStep,
              })}
              ref={(e: HTMLDivElement) => stepRefs.current.push(e)}
            >
              <StepLabel
                error={false}
                StepIconComponent={completed ? StepIcon : undefined}
                StepIconProps={{ color: "success", icon: item.node }}
              >
                {item.label}
              </StepLabel>
              {/* {
                item.label === 'Nguồn thu nhập chủ thẻ chính'
                ?
                <InputDebounce
                  className={classNameIncome}
                  disabled
                />
                : <></>
              } */}
            </Step>
          );
        })}
      </Stepper>

      {(() => {
        if (!childs.length) return null;

        return (
          <SwipeableViews
          disabled
            index={CurrentStep}
            onChangeIndex={handleTabPanel}
          >
            {childs.map((child, index) => {
              return (
                <TabPanel
                  value={CurrentStep}
                  index={index}
                  key={index}
                  padding={false}
                >
                  {child}
                </TabPanel>
              );
            })}
          </SwipeableViews>
        );
      })()}
    </Fragment>
  );
};

export default forwardRef(Steps);
