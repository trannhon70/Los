import { FC } from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import clsx from 'clsx';
import loadingStyle from "./style";
import Box from "@mui/material/Box";

export interface LoadingProps{
  className?: string;
  size?: string | number;
  sx?: SxProps<Theme>;
}

const Loading: FC<LoadingProps> = props => {

  const { className, size = '40px', sx = {} } = props;
  const classes = loadingStyle();

  return (
    <Box className={ clsx(className, 'flex-center wh-full') } sx={ sx }>
      <span className={classes.root}></span>
      <span className={classes.logoImage}></span>
    </Box>
  );
};

export default Loading;
