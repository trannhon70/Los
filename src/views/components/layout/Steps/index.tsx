import {
  FC,
  Children,
  MouseEvent,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState
} from "react";
import { diffArray } from "utils";
import { SxProps, Theme } from "@mui/system";
import { SxSteps, SxNode, SxItem, SxAttach, SxTab } from "./style";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CheckIcon from "@mui/icons-material/Check";
import SwipeableViews from "react-swipeable-views";
import folder from "assets/images/folder.svg";
import TabPane from "../TabPane";
import Tooltip from "@mui/material/Tooltip";

export interface StepItem {
  label?: ReactNode;
  node?: ReactNode;
  disabled?: boolean;
  attachment?: number;
  value?: string | number;
  hasSub?: boolean;
  extra?: ReactNode;
  completed?: boolean;
  isRequiredStepLabel?:boolean;
  isTooltip?: boolean;
}

export interface StepsProps {
  current?: number;
  steps?: StepItem[];
  attachLabel?: ReactNode;
  completed?: ReactNode;
  alternative?: boolean;
  className?: string;
  incomeStepsTotal?:boolean;
  classStep?: string;
  sx?: SxProps<Theme>;
  onAttach?(step: StepItem): void;
  onChange?(next: number, current: number): any;
  isTooltipLabel?: boolean;
}

const Steps: FC<StepsProps> = (props) => {
  const {
    current = 0,
    steps = [],
    attachLabel,
    onAttach,
    classStep,
    className,
    sx,
    alternative,
    onChange,
    completed,
    incomeStepsTotal,
    children
  } = props;

  const [CurrentSteps, setCurrentSteps] = useState<StepItem[]>(steps);
  const [CurrentStep, setCurrentStep] = useState(current);

  useEffect(() => {
    diffArray(steps, CurrentSteps) && setCurrentSteps(steps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  useEffect(() => {
    current === CurrentStep || setCurrentStep(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const changeTab = (_: SyntheticEvent, newValue: number) => {
    if (onChange) {
      const result = onChange(CurrentStep, newValue); ///nhanlnt fix onChange parameter
      if (result !== false) {
        setCurrentStep(newValue);
      }
    } else {
      setCurrentStep(newValue);
    }
  };

  const clickAttach = (step: StepItem) => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAttach && onAttach(step);
  };

  const handleTabPanel = (index: number) =>
    index === CurrentStep || setCurrentStep(index);

  return (
    <Box
      className={clsx(
        "mscb-steps",
        { "mscb-steps-alternative": alternative },
        className
      )}
      sx={SxSteps(sx)}
    >
      <Tabs value={CurrentStep} variant="scrollable" onChange={changeTab}>
        {CurrentSteps.map((step, index) => {
          return (
            <Tab
              key={index}
              sx={SxTab}
              className={clsx(classStep, {
                completed: CurrentStep !== index && step.completed,
                "has-sub": step.hasSub,
                "has-extra": alternative && step.extra !== undefined,   
              })}
              label={
                <>
                <Box className="mscb-step-item" sx={SxItem}>
                  <Box className="mscb-step-node" sx={SxNode}>
                    {(() => {
                      if (
                        step.disabled ||
                        !step.completed ||
                        CurrentStep === index
                      ) {
                        return step.node;
                      } else if (completed === undefined) {
                        return <CheckIcon />;
                      } else {
                        return completed;
                      }
                    })()}
                  </Box>
                  <Box className="mscb-step-label">{
                    step.isRequiredStepLabel ? 
                    <Box className="mscb-step-text">{step.label} <span style={{color:"red"}}>(*)</span></Box> :
                    (step?.isTooltip ? 
                      <Tooltip title={step.label ?? ''} arrow>
                        <Box className="mscb-step-text">{step.label}</Box>
                      </Tooltip> : 
                      <Box className="mscb-step-text">{step.label}</Box>
                    )
                  }
                    {typeof step.attachment === "number" && (
                      <Box
                        className="mscb-step-attach"
                        sx={SxAttach}
                        onClick={clickAttach(step)}
                      >
                        <img src={folder} alt="Attachment" />
                        <Box component="span">
                          {step.attachment} {attachLabel}
                        </Box>
                      </Box>
                    )}
                  </Box>
                  {incomeStepsTotal === false ? 
                    alternative && step.extra !== undefined && (
                      <Box className="mscb-step-extra">{step.extra}</Box>
                    ) : null }
                </Box>
                {incomeStepsTotal === true ? 
                <Box className="step-income-extra">
                    {alternative && step.extra !== undefined && (
                      <Box className="mscb-step-extra">{step.extra}</Box>
                    )}
               </Box> : null }
                </>
              }
              disabled={step.disabled}
            />
          );
        })}
      </Tabs>

      {(() => {
        const childs = children ? Children.toArray(children) : [];
        if (!childs.length) return null;

        return (
          <Box className="mscb-steps-panes">
            <SwipeableViews
              disabled
              index={CurrentStep}
              onChangeIndex={handleTabPanel}
              className="mscb-steps-panes-swiper"
            >
              {childs.map((child, index) => {
                return (
                  <TabPane value={CurrentStep} index={index} key={index}>
                    {child}
                  </TabPane>
                );
              })}
            </SwipeableViews>
          </Box>
        );
      })()}
    </Box>
  );
};

export default Steps;
// DEMO: https://codesandbox.io/s/mui-steps-d60id