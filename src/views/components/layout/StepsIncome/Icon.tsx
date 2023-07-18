import { FC } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface IStepIconProps extends SvgIconProps<'svg', {}>{
  completed?: boolean;
  error?: boolean;
}

export interface IStepIconComponent extends FC<IStepIconProps>{}

const StepIcon: IStepIconComponent = props => {
  if (!props.completed) return null;
  return <CheckCircleIcon color="success" />
}

export default StepIcon;