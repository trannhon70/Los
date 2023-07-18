import  { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LightTooltip from "views/components/base/LightTooltip";
import { SxProps, Theme } from '@mui/system';
export type SxApp = SxProps<Theme>;
export interface BaseProps{
  className?: string;
  sx?: SxApp;
}
export interface TextTooltipProps extends BaseProps{}

const BoxStyled = styled(Box)(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));




const TextTooltip: FC<PropsWithChildren<TextTooltipProps>>=(props) => {

  const { children, className, sx } = props;

  const [ enableTooltip, setEnableTooptip ] = useState(false);
  const [ openTooltip, setOpenTooltip ] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);

  const checkEnable = () => {
    boxRef.current 
      && setEnableTooptip(boxRef.current.clientWidth < boxRef.current.scrollWidth);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() =>   {
    checkEnable();
    window.addEventListener("resize", checkEnable);

    return () => {
      window.removeEventListener("resize", checkEnable);
    }
  });
  const onOpenTooltipBranch = () => setOpenTooltip(true);
  const onCloseTooltipBranch = () => setOpenTooltip(false);

  return (
    <LightTooltip 
      title={ <>{ children }</> }
      arrow
      placement="top"
      open={ enableTooltip && openTooltip }
      disableFocusListener
      disableInteractive
      onClose={ onCloseTooltipBranch }
      onOpen={ onOpenTooltipBranch }
    >
      <BoxStyled className={ className } sx={ sx } ref={ boxRef }>
        { children }
      </BoxStyled>
    </LightTooltip>
  );
}

export default TextTooltip;
