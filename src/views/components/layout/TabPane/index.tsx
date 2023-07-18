import { FC, useEffect, useState } from "react";
import { SxProps, Theme } from "@mui/system";
import clsx from "clsx";
import Box from "@mui/material/Box";

export interface TabPaneProps {
  className?: string;
  sx?: SxProps<Theme>;
  dir?: string;
  index: number;
  value: number;
}

const TabPane: FC<TabPaneProps> = (props) => {
  const { className, sx, dir, index, value, children } = props;
  const [CurrentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    value === CurrentValue || setCurrentValue(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Box
      className={clsx("mscb-tabpane-container", className)}
      sx={sx}
      role="tabpanel"
      dir={dir}
    >
      {index === CurrentValue && (
        <Box className="mscb-tabpane-content">{children}</Box>
      )}
    </Box>
  );
};

export default TabPane;