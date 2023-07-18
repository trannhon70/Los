import { FC, ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import ObjectListCircle from "./Circle";
import ObjectListMenu, { ObjectListMenuItem } from "./Menu";
import folder from "assets/images/folder.svg";
import { Box } from '@mui/material';

export interface ObjectListBoxProps {
  active?: boolean;
  bgPrimary?: boolean;
  circle?: ReactNode;
  enableUser?: boolean;
  enableMenu?: boolean;
  onClick?(): void;
  onClickMenu?(m: ObjectListMenuItem): void;
  menuWidth?: string;
  menu?: ObjectListMenuItem[];
  attachLabel?: ReactNode;
  onAttach?(): void;
}

const ObjectListBox: FC<ObjectListBoxProps> = (props) => {
  const {
    active,
    bgPrimary,
    children,
    circle,
    enableUser,
    enableMenu,
    onClick,
    onClickMenu,
    menuWidth,
    menu,
    attachLabel,
    onAttach
  } = props;
  const [isActive, setIsActive] = useState(active ?? false);

  useEffect(() => {
    const is = !!active;
    is === isActive || setIsActive(is);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  const enableAttach = (attachLabel || attachLabel === 0);
  return (
    <Box className={clsx("object-list-box", { active })} sx={{
      paddingTop:enableAttach? "0px !important":"10px",
      justifyContent:enableAttach ? "start !important" : 'space-between'
    }} onClick={onClick}>
      <ObjectListCircle enableUser={enableUser} bgPrimary={bgPrimary}>
        {circle}
      </ObjectListCircle>
      <div className="object-list-box-name">{children}</div>
      <ObjectListMenu
        enable={enableMenu}
        onClick={onClickMenu}
        menuWidth={menuWidth}
        menu={menu}
      /> 
      {
        enableAttach ?
          <Box
            sx={{
              position:"absolute",
              bottom:0,
            }}
            className="attachBox"
            onClick={onAttach}
          >
            <img width="16px" height="10px" src={folder} alt="Attachment" />
            <Box  component="span" sx={{
              textDecoration:"underline",
              fontSize:"13px",
              color:"#747792",
              textTransform:"lowercase !important"
            }}>
            &nbsp;{attachLabel} tập tin
            </Box>
          </Box> : null
      }
    </Box>
  );
};

export default ObjectListBox;
