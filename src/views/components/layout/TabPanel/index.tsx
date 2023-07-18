import { FC } from 'react';
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { Box } from '@mui/material';
import clsx from 'clsx';

export interface TabPanelProps{
  className?: string;
  dir?: string;
  index: number;
  value: number;
  padding?: boolean;
  sx?: SxProps<Theme>;
}

export interface TabPanelComponent extends FC<TabPanelProps>{}

const TabPanel: TabPanelComponent = props => {

  const { children, className, dir, index, value, padding = true, sx } = props;
  const show = index === value;

  return <div
    role="tabpanel"
    hidden={ !show }
    dir={ dir }
    className={ className }
  >
    {
      show &&
      <Box className={ clsx({ 'p-3': padding }, 'h-full') } sx={ sx }>
        { children }
      </Box>
    }
  </div>

}

export default TabPanel;