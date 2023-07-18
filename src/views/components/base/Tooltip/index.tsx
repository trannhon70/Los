
import { Tooltip, } from '@mui/material';
import { withStyles } from '@mui/styles';
import { SxProps, Theme } from '@mui/system';
interface ToolTipProps {
  arrow?: boolean;
  children: React.ReactElement;
  placement: 'top' | 'bottom';
  title: NonNullable<React.ReactNode>;
  sxTooltip?: SxProps<Theme>;
  sxArrow?: SxProps<Theme>;
  textSize?: string;
  typeText?: "string" | "number"
}

const TooltipBase: React.FunctionComponent<ToolTipProps> = (props) => {
  const { arrow, children, placement = 'top', title = '', sxArrow, sxTooltip, textSize, typeText = 'number' } = props;

  const SxA = { ...sxArrow };
  const SxT = { ...sxTooltip };

  const BaseTooltip = withStyles({
    tooltip: sxTooltip ? SxT : {
      fontSize: textSize ? textSize : (typeText === 'number' ? "20px !important" : "12px !important"),
      border: 'unset !important',
      color: "var(--mscb-secondary) !important",
      backgroundColor: "var(--mscb-white) !important",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2) !important",
      fontFamily: 'Roboto, Helvetica, Arial,sans-serif !important'
    },
    arrow: sxArrow ? SxA : {
      fontSize: typeText === 'string' ? "10px" : "20px",
      // transform: 'translate(20px, 0px) !important',
      color: "var(--mscb-white) !important",
      fontFamily: 'Roboto, Helvetica, Arial,sans-serif !important'
    }
  })(Tooltip);

  return <BaseTooltip title={title} placement={placement} arrow={arrow}>
    {children}
  </BaseTooltip>

}

export default TooltipBase