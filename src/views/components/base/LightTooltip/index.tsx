
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "#353535",
      boxShadow: '0 3px 6px 0 rgb(0 0 0 / 16%)',
      fontSize: 13,
      maxWidth: 300,
      textAlign: "center",
      fontFamily: "Roboto",
      zIndex:10000
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
      border: '1px'
    },
  }));

export default LightTooltip